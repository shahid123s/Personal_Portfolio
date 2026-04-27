import React, { useState, useEffect } from 'react';

const Navbar = ({ profile }) => {
  const [activeSection, setActiveSection] = useState('work');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['work', 'experience', 'projects', 'contact'];
      let current = 'work';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section is near the top of the viewport (with some threshold)
          if (rect.top <= 150) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'work', label: 'Work' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-zinc-950/90 backdrop-blur-sm border-b border-zinc-800">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-8 h-20">
        <div className="text-xl font-serif font-black text-white tracking-tighter">
          {profile?.name ? profile.name.toUpperCase() : 'DEVELOPER'}
        </div>
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map(link => {
            const isActive = activeSection === link.id;
            return (
              <a 
                key={link.id}
                className={`font-serif tracking-widest uppercase text-xs transition-colors duration-300 relative
                  ${isActive ? 'text-indigo-500' : 'text-zinc-400 hover:text-indigo-400'}
                  ${isActive ? "after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-indigo-500 after:rounded-full" : ''}
                `} 
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {link.label}
              </a>
            );
          })}
        </div>
        <a className="px-6 py-2 bg-indigo-500 text-white font-ui-element text-ui-element rounded-2xl scale-95 active:scale-100 transition-transform" href={profile?.resume || '#'} target="_blank" rel="noreferrer">
          Resume
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
