const hoaDonXuatModel = require('../models/HoaDonXuat');

exports.getHDX = async (req, res) => {
    const warehousesList = await hoaDonXuatModel.find({});
    res.send(warehousesList);
};
exports.postHDX = async (req, res) => {
    console.log(req.body);
    const objHDX = new hoaDonXuatModel({
        MaHDX: req.body.MaHDX,
        MaHDN: req.body.MaHDN,
        NgayNhap: req.body.NgayNhap,
        NgayXuat: req.body.NgayXuat,
        ThanhTien: req.body.ThanhTien,
        TrangThai: req.body.TrangThai,
        moTa: req.body.moTa,
    });
    console.log(objHDX);
    if (isNaN(objHDX.ThanhTien)) {
        return res.json({
            'status': 'Số tiền không hợp lệ'
        });
    } else {
        await objHDX.save(function (err) {
            if (err) {
                console.log(err);
            }
            console.log('Thêm thành công');
            res.send(objHDX);
        });
    }
};
exports.editHDX = async (req, res) => {
    const objHDX = {
        MaHDX: req.body.MaHDX,
        MaHDN: req.body.MaHDN,
        NgayNhap: req.body.NgayNhap,
        NgayXuat: req.body.NgayXuat,
        ThanhTien: req.body.ThanhTien,
        TrangThai: req.body.TrangThai,
        moTa: req.body.moTa,
    }
    hoaDonXuatModel.updateOne({_id: req.params.id}, objHDX, function (err) {
        if (isNaN(objHDX.ThanhTien)) {
            return res.json({
                'status': 'Số tiền không hợp lệ'
            });
        } else if (err) {
            return res.json({'status': err});
        } else {
            console.log('Sửa thành công');
            res.send(objHDX);
        }
    });
};

exports.deleteHDX = async (req, res) => {
    hoaDonXuatModel.deleteOne({_id: req.params.id}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log('Xóa thành công');
    });
    return res.send("Xóa thành công");
};
