var express = require('express');
var router = express.Router();
const userController = require('../controlers/users.controlers')
router.get('/', userController.getAllUsers);
router.post('/api-reg', userController.postReg)
router.post('/api-login', userController.posLogin)
router.get('/api-profile/:id', userController.getProfile)
router.post('/api-delete-user/:id', userController.postDeleteUser)
router.get('/api-delete-user/:id', userController.postDeleteUser)
router.post('/api-edti-user/:id', userController.postEditUser)
router.post('/api-edti-password/:id', userController.postEditPassword)
module.exports = router;

