import React from 'react';

const Footer = ({ profile }) => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 w-full py-16">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-8 max-w-7xl mx-auto">
        <div className="font-serif text-[10px] tracking-[0.2em] uppercase text-zinc-500">
          © {new Date().getFullYear()} {profile?.name || "Shahid Noushad"} • Built with precision
        </div>

        <div className="flex gap-12">
          <a className="font-serif text-[10px] tracking-[0.2em] uppercase text-zinc-500 hover:text-indigo-500 transition-colors opacity-80 hover:opacity-100" href={profile?.github || '#'} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="font-serif text-[10px] tracking-[0.2em] uppercase text-zinc-500 hover:text-indigo-500 transition-colors opacity-80 hover:opacity-100" href={profile?.linkedin || '#'} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
