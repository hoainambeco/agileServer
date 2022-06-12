const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    MaHDX: String,
    MaHDN: String,
    NgayNhap: Date,
    NgayXuat: Date,
    ThanhTien: Number,
    TrangThai: String,
    moTa: String,
});
const HoaDonXuat = mongoose.model('HoaDonXuat', Schema);
module.exports = HoaDonXuat;
