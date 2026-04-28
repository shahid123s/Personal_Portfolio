import { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import toast from 'react-hot-toast';

const Contact = ({ profile }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/contact', formData);
      toast.success('Message sent! I will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-section-gap px-6 md:px-8 max-w-7xl mx-auto border-t border-surface-container-high" id="contact">
      <div className="grid grid-cols-12 gap-6 md:gap-8">
        <motion.div 
          className="col-span-12 md:col-span-5"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-code-label text-code-label text-indigo-500 uppercase tracking-widest">03. Contact</span>
          <h2 className="font-h2 text-[28px] md:text-[48px] leading-tight text-on-surface mt-6 md:mt-8 mb-6 md:mb-12">Let's build something substantial.</h2>
          <p className="font-body-lg text-[15px] md:text-[18px] text-on-surface-variant mb-8 md:mb-12">
            I am currently available for specialized contract work and architectural consulting.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-indigo-500">alternate_email</span>
              <span className="font-ui-element text-on-surface">{profile?.email || 'hello@monolith.dev'}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-indigo-500">near_me</span>
              <span className="font-ui-element text-on-surface">{profile?.location || 'New York City, GMT-5'}</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="col-span-12 md:col-start-7 md:col-span-6"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form className="space-y-8 md:space-y-12" onSubmit={handleSubmit}>
            <div className="group border-b border-surface-container-high focus-within:border-indigo-500 transition-colors py-4">
              <label className="block font-code-label text-[10px] uppercase text-zinc-500 mb-2">Your Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border-none p-0 focus:ring-0 font-body-lg text-on-surface outline-none placeholder:text-zinc-800"
                placeholder="Alexander Hamilton"
                type="text"
                required
              />
            </div>
            
            <div className="group border-b border-surface-container-high focus-within:border-indigo-500 transition-colors py-4">
              <label className="block font-code-label text-[10px] uppercase text-zinc-500 mb-2">Email Address</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-none p-0 focus:ring-0 font-body-lg text-on-surface outline-none placeholder:text-zinc-800"
                placeholder="alex@company.com"
                type="email"
                required
              />
            </div>
            
            <div className="group border-b border-surface-container-high focus-within:border-indigo-500 transition-colors py-4">
              <label className="block font-code-label text-[10px] uppercase text-zinc-500 mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-transparent border-none p-0 focus:ring-0 font-body-lg text-on-surface outline-none placeholder:text-zinc-800"
                placeholder="How can I help you?"
                rows="4"
                required
              ></textarea>
            </div>
            
            <button
              className="w-full py-6 bg-indigo-500 text-white font-ui-element uppercase tracking-widest hover:bg-indigo-600 transition-colors rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Inquiry'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
