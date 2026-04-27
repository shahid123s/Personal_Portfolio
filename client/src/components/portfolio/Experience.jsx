import React from 'react';
import { motion } from 'framer-motion';

const Experience = ({ experiences }) => {
  return (
    <section className="py-section-gap px-8 max-w-7xl mx-auto border-t border-surface-container-high" id="experience">
      <motion.div 
        className="grid grid-cols-12 gap-8 mb-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="col-span-12 md:col-span-3">
          <span className="font-code-label text-code-label text-indigo-500 uppercase tracking-widest">01. Experience</span>
        </div>
        
        <div className="col-span-12 md:col-span-8">
          <h2 className="font-h2 text-h2 text-on-surface mb-16">The Professional Timeline</h2>
          
          <div className="space-y-16">
            {experiences?.map((exp, index) => (
              <motion.div 
                key={exp._id || index} 
                className={`grid grid-cols-8 gap-4 ${index !== experiences.length - 1 ? 'border-b border-surface-container-high pb-12' : 'pb-12'}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="col-span-2 font-code-label text-code-label text-on-surface-variant uppercase">{exp.period}</div>
                <div className="col-span-6">
                  <h3 className="font-h3 text-h3 text-on-surface mb-2">{exp.role}</h3>
                  <div className="font-ui-element text-ui-element text-indigo-500 uppercase mb-6">{exp.company}</div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant max-w-lg">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
