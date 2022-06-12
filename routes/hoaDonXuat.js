var express = require('express');
var router = express.Router();
var hoaDonXuatController = require('../controlers/hoaDonXuat.controlers');

router.get('/', hoaDonXuatController.getHDX);
router.post('/add', hoaDonXuatController.postHDX);
router.post('/edit/:id', hoaDonXuatController.editHDX);
router.post('/delete/:id', hoaDonXuatController.deleteHDX);
module.exports = router;
