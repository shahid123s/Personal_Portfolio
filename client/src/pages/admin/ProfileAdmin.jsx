import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const ProfileAdmin = () => {
  const [formData, setFormData] = useState({
    name: '', tagline: '', bio: '', email: '', location: '', github: '', linkedin: '', resume: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get('/profile');
      if (data) setFormData(data);
    } catch (error) {
      toast.error('Failed to fetch profile');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/profile', formData);
      toast.success('Profile updated');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-h2 mb-6">Manage Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-surface-container p-6 max-w-2xl">
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Name</label>
          <input type="text" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 bg-surface text-on-surface" />
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Tagline</label>
          <textarea value={formData.tagline || ''} onChange={e => setFormData({...formData, tagline: e.target.value})} className="w-full p-2 bg-surface text-on-surface" rows="2" />
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Bio</label>
          <textarea value={formData.bio || ''} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full p-2 bg-surface text-on-surface" rows="4" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Email</label>
            <input type="email" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-2 bg-surface text-on-surface" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Location</label>
            <input type="text" value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full p-2 bg-surface text-on-surface" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">GitHub URL</label>
            <input type="url" value={formData.github || ''} onChange={e => setFormData({...formData, github: e.target.value})} className="w-full p-2 bg-surface text-on-surface" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">LinkedIn URL</label>
            <input type="url" value={formData.linkedin || ''} onChange={e => setFormData({...formData, linkedin: e.target.value})} className="w-full p-2 bg-surface text-on-surface" />
          </div>
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Resume URL</label>
          <input type="url" value={formData.resume || ''} onChange={e => setFormData({...formData, resume: e.target.value})} className="w-full p-2 bg-surface text-on-surface" />
        </div>
        
        <button type="submit" className="px-6 py-2 bg-indigo-500 text-white mt-4">Save Profile</button>
      </form>
    </div>
  );
};

export default ProfileAdmin;
