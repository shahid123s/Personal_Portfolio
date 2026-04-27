import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Logged in successfully');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md p-8 border border-surface-container-high bg-surface-container-low">
        <h2 className="font-h2 text-h2 mb-8 text-on-surface">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group border-b border-surface-container-high focus-within:border-indigo-500 py-2">
            <label className="block font-code-label text-[10px] uppercase text-zinc-500 mb-1">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-none p-0 focus:ring-0 text-on-surface outline-none" 
              required 
            />
          </div>
          <div className="group border-b border-surface-container-high focus-within:border-indigo-500 py-2">
            <label className="block font-code-label text-[10px] uppercase text-zinc-500 mb-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-none p-0 focus:ring-0 text-on-surface outline-none" 
              required 
            />
          </div>
          <button type="submit" className="w-full py-4 mt-4 bg-indigo-500 text-white font-ui-element uppercase tracking-widest hover:bg-indigo-600">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
