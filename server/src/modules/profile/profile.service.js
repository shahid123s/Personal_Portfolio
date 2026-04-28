const Profile = require('./profile.model');

exports.getProfile = async () => {
  let profile = await Profile.findOne();
  if (!profile) {
    profile = new Profile();
    await profile.save();
  }
  return profile;
};

exports.updateProfile = async (bodyData, file) => {
  let profile = await Profile.findOne();
  if (!profile) profile = new Profile();

  const { name, tagline, bio, email, location, github, linkedin, resume } = bodyData;
  if (name) profile.name = name;
  if (tagline) profile.tagline = tagline;
  if (bio) profile.bio = bio;
  if (email) profile.email = email;
  if (location) profile.location = location;
  if (github !== undefined) profile.github = github;
  if (linkedin !== undefined) profile.linkedin = linkedin;
  if (resume !== undefined) profile.resume = resume;

  if (file) {
    if (profile.photo && profile.photo.includes('cloudinary')) {
      // Optional: Extract public_id and delete old image from Cloudinary here
    }
    profile.photo = file.path;
  }

  await profile.save();
  return profile;
};
