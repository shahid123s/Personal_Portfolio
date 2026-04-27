require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Project = require('./models/Project');
const Experience = require('./models/Experience');
const Profile = require('./models/Profile');

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  // Seed Admin
  const existingAdmin = await Admin.findOne({ email: 'admin@portfolio.com' });
  if (!existingAdmin) {
    await Admin.create({ email: 'admin@portfolio.com', password: 'Admin@123', name: 'Admin' });
    console.log('✅ Admin created → email: admin@portfolio.com | password: Admin@123');
  } else {
    console.log('ℹ️  Admin already exists, skipping.');
  }

  // Seed Profile
  const existingProfile = await Profile.findOne();
  if (!existingProfile) {
    await Profile.create({
      name: 'Your Name',
      tagline: 'Building digital architectures with mathematical precision and editorial intent.',
      bio: 'Software Engineer specializing in full-stack orchestration and minimalist design systems. I translate complex business requirements into elegant, high-performance codebases.',
      email: 'hello@yourportfolio.dev',
      location: 'Remote',
    });
    console.log('✅ Profile created');
  }

  // Seed Experience
  const expCount = await Experience.countDocuments();
  if (expCount === 0) {
    await Experience.insertMany([
      { period: '2022 — Present', role: 'Senior Systems Architect', company: 'Monolith Digital', description: 'Leading the development of distributed systems for high-traffic commerce platforms. Implementing architectural patterns that reduced latency by 40%.', order: 0 },
      { period: '2020 — 2022', role: 'Frontend Engineer', company: 'Nexus Creative Agency', description: 'Crafted immersive digital experiences for luxury brands using React and GSAP. Focused on typography-driven UI and pixel-perfect responsiveness.', order: 1 },
      { period: '2018 — 2020', role: 'B.Sc. Computer Science', company: 'University of Design & Tech', description: 'Focused on algorithm complexity and structural software design. Graduated with honors in Computational Theory.', order: 2 },
    ]);
    console.log('✅ Experience seeded');
  }

  // Seed Projects
  const projCount = await Project.countDocuments();
  if (projCount === 0) {
    await Project.insertMany([
      { title: 'Aether OS', description: 'A browser-based workstation environment designed for extreme productivity. Built with a focus on low-latency terminal interactions and modular window management.', techStack: ['React', 'Node.js'], featured: true, order: 0, icon: 'computer' },
      { title: 'CLI Forge', description: 'A custom Rust-based toolchain for rapid scaffolding of microservices.', techStack: ['Rust', 'WebAssembly'], featured: false, order: 1, icon: 'terminal' },
      { title: 'Hexa Protocol', description: 'Decentralized identity management system with Zero Knowledge Proofs.', techStack: ['Solidity', 'Ethers.js'], featured: false, order: 2, icon: 'token' },
      { title: 'Vortex UI', description: 'A physics-based animation library for high-end web experiences.', techStack: ['TypeScript', 'Three.js'], featured: false, order: 3, icon: 'polyline' },
    ]);
    console.log('✅ Projects seeded');
  }

  console.log('\n🎉 Seeding complete!');
  console.log('   Admin Login → email: admin@portfolio.com | password: Admin@123');
  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seed error:', err.message);
  process.exit(1);
});
