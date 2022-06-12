const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    MaHoaDonNhap: String,
    LoaiSP: String,
    ViTri: String,
    TenSP: String,
    DonGia: Number,
    SoLuong: Number,
    NgayNhap: Date,
    moTa: String,
});
const warehouses = mongoose.model('warehouses', Schema);
module.exports = warehouses;
