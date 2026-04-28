const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Developer' },
    tagline: { type: String, default: 'Building digital architectures with mathematical precision and editorial intent.' },
    bio: { type: String, default: 'Software Engineer specializing in full-stack orchestration and minimalist design systems. I translate complex business requirements into elegant, high-performance codebases.' },
    email: { type: String, default: 'hello@developer.dev' },
    location: { type: String, default: 'Remote' },
    photo: { type: String, default: '' },
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    resume: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);
