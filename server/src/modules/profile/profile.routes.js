const express = require('express');
const profileController = require('./profile.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const createUploadMiddleware = require('../../middlewares/upload.middleware');

const router = express.Router();
const upload = createUploadMiddleware('portfolio/profile');

router.get('/', profileController.getProfile);
router.put('/', authMiddleware, upload.single('photo'), profileController.updateProfile);

module.exports = router;
