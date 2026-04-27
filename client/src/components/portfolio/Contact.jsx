import React from 'react';
import { motion } from 'framer-motion';

const Contact = ({ profile }) => {
  return (
    <section className="py-section-gap px-8 max-w-7xl mx-auto border-t border-surface-container-high" id="contact">
      <div className="grid grid-cols-12 gap-8">
        <motion.div 
          className="col-span-12 md:col-span-5"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-code-label text-code-label text-indigo-500 uppercase tracking-widest">03. Contact</span>
          <h2 className="font-h2 text-h2 text-on-surface mt-8 mb-12">Let's build something substantial.</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12">
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
          <form className="space-y-12" onSubmit={(e) => { e.preventDefault(); alert('Contact form implementation pending. You can send an email directly!'); }}>
            <div className="group border-b border-surface-container-high focus-within:border-indigo-500 transition-colors py-4">
              <label className="block font-code-label text-[10px] uppercase text-zinc-500 mb-2">Your Name</label>
              <input className="w-full bg-transparent border-none p-0 focus:ring-0 font-body-lg text-on-surface outline-none placeholder:text-zinc-800" placeholder="Alexander Hamilton" type="text" required />
            </div>
            
            <div className="group border-b border-surface-container-high focus-within:border-indigo-500 transition-colors py-4">
              <label className="block font-code-label text-[10px] uppercase text-zinc-500 mb-2">Email Address</label>
              <input className="w-full bg-transparent border-none p-0 focus:ring-0 font-body-lg text-on-surface outline-none placeholder:text-zinc-800" placeholder="alex@company.com" type="email" required />
            </div>
            
            <div className="group border-b border-surface-container-high focus-within:border-indigo-500 transition-colors py-4">
              <label className="block font-code-label text-[10px] uppercase text-zinc-500 mb-2">Message</label>
              <textarea className="w-full bg-transparent border-none p-0 focus:ring-0 font-body-lg text-on-surface outline-none placeholder:text-zinc-800" placeholder="How can I help you?" rows="4" required></textarea>
            </div>
            
            <button className="w-full py-6 bg-indigo-500 text-white font-ui-element uppercase tracking-widest hover:bg-indigo-600 transition-colors rounded-2xl" type="submit">
              Send Inquiry
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
