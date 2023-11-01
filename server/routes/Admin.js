const express = require('express');
const router = express.Router();
const adminController = require('../controllers/Admin/adminController');
const adminAuthController = require('../controllers/Admin/authController');
const adminVerifyToken = require('../middlewares/adminVerifyToken');

// Admin authentication routes
router.post('/register', adminAuthController.register);
router.post('/login', adminAuthController.login);

// Admin protected routes
router.get('/getAllUser', adminVerifyToken, adminController.getAllUser);
router.put('/handleBlock/:id', adminVerifyToken, adminController.handleBlock);
router.put('/accept/:id', adminController.handleAccept);
router.delete('/reject/:id', adminVerifyToken, adminController.handleReject);
router.get('/getUserVerification',adminVerifyToken,adminController.getUserVerification)
router.get('/getTotRides',adminController.getTotRides)
router.post('/addplace',adminController.addplace)
module.exports = router;
