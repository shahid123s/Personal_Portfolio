import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import api from '../services/api';
import Navbar from '../components/portfolio/Navbar';
import Hero from '../components/portfolio/Hero';
import Experience from '../components/portfolio/Experience';
import Projects from '../components/portfolio/Projects';
import Contact from '../components/portfolio/Contact';
import Footer from '../components/portfolio/Footer';

const Portfolio = () => {
  const [data, setData] = useState({
    profile: null,
    experiences: [],
    projects: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, expRes, projRes] = await Promise.all([
          api.get('/profile'),
          api.get('/experience'),
          api.get('/projects')
        ]);
        
        setData({
          profile: profileRes.data,
          experiences: expRes.data,
          projects: projRes.data
        });
      } catch (error) {
        console.error('Error fetching portfolio data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-indigo-500">Loading Portfolio...</div>;
  }

  return (
    <div className="pt-20">
      <Helmet>
        <title>{data.profile?.name ? `${data.profile.name} - Portfolio` : 'Portfolio'}</title>
        <meta name="description" content={data.profile?.bio || 'Professional Portfolio'} />
        <meta name="keywords" content="portfolio, developer, software engineer, web development" />
        <meta property="og:title" content={data.profile?.name ? `${data.profile.name} - Portfolio` : 'Portfolio'} />
        <meta property="og:description" content={data.profile?.bio || 'Professional Portfolio'} />
        <meta property="og:type" content="website" />
        {data.profile?.photo && <meta property="og:image" content={data.profile.photo.startsWith('http') ? data.profile.photo : `http://localhost:5001${data.profile.photo}`} />}
      </Helmet>
      <Navbar profile={data.profile} />
      <main>
        <Hero profile={data.profile} />
        <Experience experiences={data.experiences} />
        <Projects projects={data.projects} />
        <Contact profile={data.profile} />
      </main>
      <Footer profile={data.profile} />
    </div>
  );
};

export default Portfolio;
