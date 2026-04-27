import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Portfolio from './pages/Portfolio';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/*" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
