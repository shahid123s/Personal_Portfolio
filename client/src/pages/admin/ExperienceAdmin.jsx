import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const ExperienceAdmin = () => {
  const [experiences, setExperiences] = useState([]);
  const [formData, setFormData] = useState({ period: '', role: '', company: '', description: '', order: 0 });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const { data } = await api.get('/experience');
      setExperiences(data);
    } catch (error) {
      toast.error('Failed to fetch experiences');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/experience/${editingId}`, formData);
        toast.success('Experience updated');
      } else {
        await api.post('/experience', formData);
        toast.success('Experience created');
      }
      setFormData({ period: '', role: '', company: '', description: '', order: 0 });
      setEditingId(null);
      fetchExperiences();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving experience');
    }
  };

  const handleEdit = (exp) => {
    setFormData(exp);
    setEditingId(exp._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await api.delete(`/experience/${id}`);
      toast.success('Experience deleted');
      fetchExperiences();
    } catch (error) {
      toast.error('Failed to delete experience');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-h2 mb-6">Manage Experience</h2>
      <form onSubmit={handleSubmit} className="mb-12 space-y-4 bg-surface-container p-6">
        <div className="flex gap-4">
          <input type="text" placeholder="Period (e.g. 2022 - Present)" value={formData.period} onChange={e => setFormData({...formData, period: e.target.value})} className="flex-1 p-2 bg-surface text-on-surface" required />
          <input type="number" placeholder="Order" value={formData.order} onChange={e => setFormData({...formData, order: e.target.value})} className="w-24 p-2 bg-surface text-on-surface" />
        </div>
        <input type="text" placeholder="Role" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full p-2 bg-surface text-on-surface" required />
        <input type="text" placeholder="Company" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full p-2 bg-surface text-on-surface" required />
        <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 bg-surface text-on-surface" required />
        
        <button type="submit" className="px-6 py-2 bg-indigo-500 text-white">{editingId ? 'Update' : 'Add'} Experience</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({ period: '', role: '', company: '', description: '', order: 0 }) }} className="ml-4 text-zinc-400">Cancel</button>}
      </form>

      <div className="space-y-4">
        {experiences.map(exp => (
          <div key={exp._id} className="p-4 border border-surface-container-high flex justify-between items-center">
            <div>
              <h3 className="text-xl">{exp.role} @ {exp.company}</h3>
              <p className="text-zinc-400 text-sm">{exp.period}</p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => handleEdit(exp)} className="text-indigo-400">Edit</button>
              <button onClick={() => handleDelete(exp._id)} className="text-error">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceAdmin;
