const express = require('express');
const router = express.Router();
const userAuthController = require('../controllers/User/authController');
const driverController = require('../controllers/User/driverController')
const userController = require('../controllers/User/userController')
const riderController = require('../controllers/User/riderController')
const chatController = require('../controllers/User/chatController')
const userVerifyToken = require('../middlewares/userVerifyToken');
 const multer = require('multer')
 // multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        console.log(req.body , "///////");
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const upload = multer({
    storage: storage
  })

// User authentication routes
router.put('/profile', upload.single('displayPic'), userController.profile);
router.post('/register', userAuthController.register);
router.post('/googleAuth', userAuthController.googleAuth);
router.post('/login', userAuthController.login);
router.post('/ride',userVerifyToken ,driverController.ride);
router.get('/getrides',riderController.getrides)
router.get('/getVehicles/:id', driverController.getVehicles);
router.get('/getsinglerides/:id', riderController.getsinglerides);
router.post('/makeConnection',riderController.makeConnection)
router.post('/vehicle', upload.fields([ { name: 'selectedImage', maxCount: 1}, { name: 'selectedRC', maxCount: 1 }, { name: 'selectedInsurance', maxCount: 1 },]), driverController.vehicle);
router.get('/checkUser/:id', userAuthController.checkUser);
router.put('/profile/:id', upload.single('displayPic'), userController.profile);
router.put('/changeName/:id', userController.changeName);
router.put('/changeWallpapper/:id', userController.changeWallpapper);
router.put('/changeEmail/:id', userController.changeEmail);
router.put('/changeNumber/:id', userController.changeNumber);
router.get('/getProfile/:id',userVerifyToken, userController.getProfile);
router.get('/getconnections/:id', driverController.getconnections);
router.get('/getActiveConnections/:id', chatController.getActiveConnections);
router.get('/getallChat/:id', chatController.getallChat);
router.get('/getChatId', chatController.getChatId);
router.post('/message', chatController.message);
router.post('/submitReview', userController.submitReview);
router.get('/getmessage/:id', chatController.getmessage);
router.put('/acceptconnection/:id', driverController.acceptconnection);
router.put('/rejectionconnection/:id', driverController.rejectionconnection);
router.put('/blockUserbyUser', chatController.blockUserbyUser);
router.put('/comformRide', userController.comformRide);
router.get('/getreviews/:id',userController.getreviews)
router.get('/getWallet/:id',userVerifyToken,userController.getWallet)
router.get('/myrideinfo/:id',riderController.myrideinfo)
router.post('/create-checkout-session',userController.checkout)

// User protected routes
//router.get('/profile', userVerifyToken, userAuthController.getProfile);
// Add more user-related routes here

module.exports = router;
