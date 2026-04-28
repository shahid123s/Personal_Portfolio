const contactService = require('./contact.service');
const catchAsync = require('../../utils/catchAsync');

exports.submitMessage = catchAsync(async (req, res) => {
  const { name, email, message } = req.body;
  const newMessage = await contactService.submitMessage({ name, email, message });
  res.status(201).json({ success: true, data: newMessage });
});

exports.getAllMessages = catchAsync(async (req, res) => {
  const messages = await contactService.getAllMessages();
  res.status(200).json(messages);
});

exports.markAsRead = catchAsync(async (req, res) => {
  const msg = await contactService.markAsRead(req.params.id);
  res.status(200).json(msg);
});

exports.deleteMessage = catchAsync(async (req, res) => {
  await contactService.deleteMessage(req.params.id);
  res.status(200).json({ message: 'Message deleted successfully' });
});
