import React, { useContext } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import ProjectsAdmin from './ProjectsAdmin';
import ExperienceAdmin from './ExperienceAdmin';
import ProfileAdmin from './ProfileAdmin';

const Dashboard = () => {
  const { admin, loading, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (loading) return <div className="text-white">Loading admin...</div>;
  if (!admin) return <Navigate to="/admin/login" />;

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-surface-container-high p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-8 text-indigo-500">Admin Panel</h2>
        <nav className="flex-1 space-y-4 font-ui-element tracking-wider">
          <Link to="/admin/dashboard" className="block hover:text-indigo-400">Overview</Link>
          <Link to="/admin/projects" className="block hover:text-indigo-400">Projects</Link>
          <Link to="/admin/experience" className="block hover:text-indigo-400">Experience</Link>
          <Link to="/admin/profile" className="block hover:text-indigo-400">Profile</Link>
        </nav>
        <button onClick={handleLogout} className="mt-auto text-left text-error hover:text-red-400">Logout</button>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <Routes>
          <Route path="dashboard" element={
            <div>
              <h1 className="text-3xl font-h2 mb-4">Welcome, {admin.name}</h1>
              <p className="text-on-surface-variant">Manage your portfolio content from the sidebar.</p>
            </div>
          } />
          <Route path="projects" element={<ProjectsAdmin />} />
          <Route path="experience" element={<ExperienceAdmin />} />
          <Route path="profile" element={<ProfileAdmin />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
