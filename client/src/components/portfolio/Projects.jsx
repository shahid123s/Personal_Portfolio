import React from 'react';
import { motion } from 'framer-motion';

const Projects = ({ projects }) => {
  const featuredProject = projects?.find(p => p.featured);
  const otherProjects = projects?.filter(p => !p.featured) || [];

  return (
    <section className="py-section-gap bg-surface-container-lowest" id="projects">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div 
          className="grid grid-cols-12 gap-8 mb-24 items-end"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="col-span-12 md:col-span-6">
            <span className="font-code-label text-code-label text-indigo-500 uppercase tracking-widest">02. Selected Work</span>
            <h2 className="font-h2 text-h2 text-on-surface mt-8">Featured Case Study</h2>
          </div>
        </motion.div>

        {/* Featured Project */}
        {featuredProject && (
          <motion.div 
            className="grid grid-cols-12 gap-0 border border-surface-container-high mb-section-gap group overflow-hidden rounded-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="col-span-12 md:col-span-7 bg-surface-container h-[500px] overflow-hidden relative">
              <img 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                alt={featuredProject.title} 
                src={featuredProject.image ? `http://localhost:5000${featuredProject.image}` : 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkDk-PJVOYZou13bYcNPkSJhIw1CmhrI6NY7t-H6GAoGJa2vG7ZDCFYPGo3DZTr8ZRRU08xuIwSxlK1dCWyAOt0AduRjimSl4YAypnUGtnBomHlUvAjADUCGj-SyZQB5z8J4WDIyw-226crD8_-7cyiI1xlZjGVBFkBHj_Y5M1sUtB5guj3Dsnp7wWIgOIkHh1l18Lpsoch1h2BLPiqF0u2XcDmczaM1UOPA9A9lQ77D7WCdG-muMsb6Ocbh2pnP7oqO6JmV-b4w'} 
              />
            </div>
            
            <div className="col-span-12 md:col-span-5 p-12 flex flex-col justify-center">
              <div className="flex gap-2 mb-8 flex-wrap">
                {featuredProject.techStack?.map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-surface-container-high text-on-surface font-code-label text-[10px] uppercase">
                    {tech}
                  </span>
                ))}
              </div>
              
              <h3 className="font-h3 text-h3 text-on-surface mb-6">{featuredProject.title}</h3>
              
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-10">
                {featuredProject.description}
              </p>
              
              <a className="flex items-center gap-4 text-indigo-500 font-ui-element uppercase tracking-widest text-xs group/link" href={featuredProject.liveUrl || featuredProject.githubUrl || '#'} target="_blank" rel="noreferrer">
                Case Study 
                <span className="material-symbols-outlined group-hover/link:translate-x-2 transition-transform">arrow_forward</span>
              </a>
            </div>
          </motion.div>
        )}

        {/* Small Projects Grid */}
        <div className="grid grid-cols-12 gap-8">
          {otherProjects.map((project, index) => (
            <motion.div 
              key={project._id || index} 
              className="col-span-12 md:col-span-4 p-10 border border-surface-container-high bg-surface-container-low hover:border-indigo-500 transition-colors relative flex flex-col h-full rounded-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <span className="material-symbols-outlined text-indigo-500 mb-8 text-4xl" data-weight="fill">
                {project.icon || 'terminal'}
              </span>
              
              <h4 className="font-h3 text-h3 text-[24px] text-on-surface mb-4">
                <a href={project.liveUrl || project.githubUrl || '#'} target="_blank" rel="noreferrer" className="before:absolute before:inset-0">
                  {project.title}
                </a>
              </h4>
              
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-8 flex-grow">
                {project.description}
              </p>
              
              <div className="text-[10px] font-code-label text-zinc-500 uppercase tracking-widest mt-auto">
                {project.techStack?.join(' / ')}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
