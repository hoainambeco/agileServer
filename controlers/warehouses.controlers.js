const warehousesModel = require('../models/warehouses.models');

exports.getWarehouses = async (req, res) => {
    const warehousesList = await warehousesModel.find({});
    res.send(warehousesList);
};
exports.getWarehousesByPositon = async (req, res) => {
    const warehousesList = await warehousesModel.find({ViTri: req.params.position});
    res.send(warehousesList);
}
exports.postWarehouses = async (req, res) => {
    console.log(req.body);
    const objwarehouses = new warehousesModel({
        MaHoaDonNhap: req.body.MaHoaDonNhap,
        LoaiSP: req.body.LoaiSP,
        ViTri: req.body.ViTri,
        TenSP: req.body.TenSP,
        DonGia: req.body.DonGia,
        SoLuong: req.body.SoLuong,
        NgayNhap: req.body.NgayNhap,
        moTa: req.body.moTa,

    });
    console.log(objwarehouses);
    if (isNaN(objwarehouses.DonGia) || isNaN(objwarehouses.SoLuong)) {
        res.json({
            'status': 'Số lượng hoặc đơn giá không hợp lệ'
        });
    } else {
        await objwarehouses.save(function (err) {
            if (err) {
                console.log(err);
            }
            console.log('Thêm thành công');
            res.send(objwarehouses);
        });
    }
};
exports.editWarehouses = async (req, res) => {
    const objwarehouses = {
        MaHoaDonNhap: req.body.MaHoaDonNhap,
        LoaiSP: req.body.LoaiSP,
        ViTri: req.body.ViTri,
        TenSP: req.body.TenSP,
        DonGia: req.body.DonGia,
        SoLuong: req.body.SoLuong,
        NgayNhap: req.body.NgayNhap,
        moTa: req.body.moTa,
    };
    warehousesModel.updateOne({_id: req.params.id}, objwarehouses, function (err) {
        if (isNaN(objwarehouses.DonGia) || isNaN(objwarehouses.SoLuong)) {
            return res.json({
                'status': 'Số lượng hoặc đơn giá không hợp lệ'
            });
        } else if (err) {
            return res.json({'status': err});
        } else {
            console.log('Sửa thành công');
            res.send(objwarehouses);
        }
    });
};

exports.deleteWarehouses = async (req, res) => {
    warehousesModel.deleteOne({_id: req.params.id}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log('Xóa thành công');
    });
    return res.send("Xóa thành công");
};
