const express = require('express');
const contactController = require('./contact.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

const router = express.Router();

// Public: submit a message from the contact form
router.post('/', contactController.submitMessage);

// Admin protected routes
router.get('/', authMiddleware, contactController.getAllMessages);
router.patch('/:id/read', authMiddleware, contactController.markAsRead);
router.delete('/:id', authMiddleware, contactController.deleteMessage);

module.exports = router;
