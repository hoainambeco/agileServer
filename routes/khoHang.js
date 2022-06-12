var express = require('express');
var router = express.Router();
var khohang = require('../models/khoHang.models');
var khohangController = require('../controlers/khoHang.controlers');

router.get('/', khohangController.getKhoHang);
router.get('/:id', khohangController.getKhoHangById);
router.post('/add', khohangController.postKhoHang);
router.post('/edit/:id', khohangController.editKhoHang);
router.post('/delete/:id', khohangController.deleteKhoHang);
module.exports = router;
