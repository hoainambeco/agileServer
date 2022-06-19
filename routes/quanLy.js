var express = require('express');
var router = express.Router();
var quanLyController = require('../controlers/quanLy.controlers');
router.get('/', quanLyController.thongke);
router.post('/month', quanLyController.thongke);
router.get('/All', quanLyController.thongKeTong);
router.post('/All', quanLyController.thongKeTong);
module.exports = router;
