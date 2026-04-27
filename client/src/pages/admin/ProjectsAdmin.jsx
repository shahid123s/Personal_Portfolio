import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '', description: '', techStack: '', githubUrl: '', liveUrl: '', featured: false, order: 0, icon: 'code', image: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/projects');
      setProjects(data);
    } catch (error) {
      toast.error('Failed to fetch projects');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'techStack') {
          data.append(key, JSON.stringify(formData.techStack.split(',').map(s => s.trim())));
        } else {
          data.append(key, formData[key]);
        }
      });
      
      if (imageFile) {
        data.append('image', imageFile);
      }

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };

      if (editingId) {
        await api.put(`/projects/${editingId}`, data, config);
        toast.success('Project updated');
      } else {
        await api.post('/projects', data, config);
        toast.success('Project created');
      }
      
      setFormData({ title: '', description: '', techStack: '', githubUrl: '', liveUrl: '', featured: false, order: 0, icon: 'code', image: '' });
      setImageFile(null);
      setEditingId(null);
      fetchProjects();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving project');
    }
  };

  const handleEdit = (p) => {
    setFormData({ ...p, techStack: p.techStack ? p.techStack.join(', ') : '' });
    setImageFile(null);
    setEditingId(p._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await api.delete(`/projects/${id}`);
      toast.success('Project deleted');
      fetchProjects();
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-h2 mb-6">Manage Projects</h2>
      <form onSubmit={handleSubmit} className="mb-12 space-y-4 bg-surface-container p-6">
        <input type="text" placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 bg-surface text-on-surface" required />
        <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 bg-surface text-on-surface" required />
        <input type="text" placeholder="Tech Stack (comma separated)" value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} className="w-full p-2 bg-surface text-on-surface" />
        <div className="flex gap-4">
          <input type="text" placeholder="GitHub URL" value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} className="flex-1 p-2 bg-surface text-on-surface" />
          <input type="text" placeholder="Live URL" value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})} className="flex-1 p-2 bg-surface text-on-surface" />
        </div>
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} />
            Featured
          </label>
          <input type="number" placeholder="Order" value={formData.order} onChange={e => setFormData({...formData, order: e.target.value})} className="w-24 p-2 bg-surface text-on-surface" />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm text-zinc-400 mb-1">Project Image</label>
            <input type="file" onChange={e => setImageFile(e.target.files[0])} className="w-full p-2 bg-surface text-on-surface" accept="image/*" />
            {formData.image && !imageFile && (
              <img src={formData.image.startsWith('http') ? formData.image : `http://localhost:5001${formData.image}`} alt="Preview" className="mt-2 h-16 w-32 object-cover rounded" />
            )}
          </div>
          <div className="flex-1">
            <label className="block text-sm text-zinc-400 mb-1">Icon (Material Symbols)</label>
            <input type="text" placeholder="e.g. computer" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} className="w-full p-2 bg-surface text-on-surface" />
          </div>
        </div>
        <button type="submit" className="px-6 py-2 bg-indigo-500 text-white">{editingId ? 'Update' : 'Create'} Project</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({ title: '', description: '', techStack: '', githubUrl: '', liveUrl: '', featured: false, order: 0, icon: 'code', image: '' }); setImageFile(null); }} className="ml-4 text-zinc-400">Cancel</button>}
      </form>

      <div className="space-y-4">
        {projects.map(p => (
          <div key={p._id} className="p-4 border border-surface-container-high flex justify-between items-center">
            <div>
              <h3 className="text-xl">{p.title} {p.featured && <span className="text-indigo-500 text-sm ml-2">(Featured)</span>}</h3>
              <p className="text-zinc-400 text-sm">{p.techStack?.join(', ')}</p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => handleEdit(p)} className="text-indigo-400">Edit</button>
              <button onClick={() => handleDelete(p._id)} className="text-error">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsAdmin;
