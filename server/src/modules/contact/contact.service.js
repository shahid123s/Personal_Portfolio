const Message = require('./contact.model');
const Profile = require('../profile/profile.model');
const sendNotificationEmail = require('../../utils/sendEmail');
const AppError = require('../../utils/AppError');

exports.submitMessage = async ({ name, email, message }) => {
  if (!name || !email || !message) {
    throw new AppError('Name, email, and message are required.', 400);
  }

  // Save to DB
  const newMessage = await Message.create({ name, email, message });

  // Get the portfolio owner's email from the profile
  const profile = await Profile.findOne();
  const ownerEmail = profile?.email;

  if (ownerEmail) {
    const adminUrl = `${process.env.CLIENT_URL}/admin/messages`;
    try {
      await sendNotificationEmail({
        to: ownerEmail,
        senderName: name,
        senderEmail: email,
        adminUrl,
      });
    } catch (emailErr) {
      // Email failure should not break the API response
      console.warn('⚠️  Email notification failed:', emailErr.message);
    }
  }

  return newMessage;
};

exports.getAllMessages = async () => {
  return await Message.find().sort({ createdAt: -1 });
};

exports.markAsRead = async (id) => {
  const msg = await Message.findByIdAndUpdate(id, { isRead: true }, { new: true });
  if (!msg) throw new AppError('Message not found', 404);
  return msg;
};

exports.deleteMessage = async (id) => {
  const msg = await Message.findByIdAndDelete(id);
  if (!msg) throw new AppError('Message not found', 404);
  return true;
};
