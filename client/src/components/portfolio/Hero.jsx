import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ profile }) => {
  return (
    <section className="min-h-screen flex flex-col justify-center px-8 max-w-7xl mx-auto" id="work">
      <div className="grid grid-cols-12 gap-8 items-end">
        <motion.div 
          className="col-span-12 md:col-span-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-h1 text-h1 text-on-surface mb-12 max-w-4xl" dangerouslySetInnerHTML={{ __html: profile?.tagline || 'Building digital architectures with <span class="text-indigo-500 italic">mathematical precision</span> and editorial intent.' }} />
        </motion.div>
      </div>
      
      <div className="grid grid-cols-12 gap-8 border-t border-surface-container-high pt-16">
        <motion.div 
          className="col-span-12 md:col-start-4 md:col-span-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12">
            {profile?.bio || 'Software Engineer specializing in full-stack orchestration and minimalist design systems. I translate complex business requirements into elegant, high-performance codebases.'}
          </p>
          <div className="flex gap-8 items-center">
            <a className="font-ui-element text-ui-element uppercase tracking-widest text-indigo-500 border-b border-indigo-500 pb-1 hover:text-indigo-400 hover:border-indigo-400 transition-colors" href={profile?.github || '#'} target="_blank" rel="noreferrer">
              View GitHub
            </a>
            <a className="font-ui-element text-ui-element uppercase tracking-widest text-on-surface border-b border-on-surface pb-1 hover:text-indigo-400 hover:border-indigo-400 transition-colors" href="#projects">
              Latest Projects
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          className="hidden md:block col-start-11 col-span-2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="w-full aspect-[3/4] bg-surface-container-high overflow-hidden border border-surface-container-highest rounded-2xl">
            <img 
              className="w-full h-full object-cover grayscale opacity-60" 
              alt="Profile" 
              src={profile?.photo ? `http://localhost:5000${profile.photo}` : 'https://lh3.googleusercontent.com/aida-public/AB6AXuCt8NwfjPlzfNG6yyFBvvAIdHqXbQ74VpZeT7d_ob_kpRnk0hxWR6_rx2KGLgvKjnSZhzK3WAhdnHemW5mLG8-mJszgC3o9i_zhVf5_8lvYyv6rQUOIDxm_sxRtd6cHcQMKOEdMhJi7PYz0RpVixEqTaGLFx7dsDrLNYpPk1HurFzWRpMEDKyb-WoPUjcboWqi1bRHFCdRHbENDuTsj69XWVVTO8x2Z5zKcTwcLyNLUdvef_HrJLp_-3NM5K6os4_AoZi44BmcN1g'} 
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
