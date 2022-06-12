const khoHangModel = require('../models/khoHang.models');

exports.getKhoHang = async (req, res) => {
    const KhoHangList = await khoHangModel.find({});
    res.send(KhoHangList);
};
exports.getKhoHangById = async (req, res) => {
    const KhoHang = await khoHangModel.findById(req.params.id);
    res.send(KhoHang);
}
exports.postKhoHang = async (req, res) => {
    console.log(req.body);
    try {
        const objKhohang = new khoHangModel({
            name: req.body.name,
            row: req.body.row,
            floors: req.body.floors,
            position: req.body.position,
            description: req.body.description,
        });
        console.log(objKhohang);
        await objKhohang.save(function (err) {
            if (err) {
                return res.json(err);
            }
        });
        res.json({
            'status': 'Thêm thành công'
        });
    }
    catch (err) {
        res.json(err);
    }
};
exports.editKhoHang = async (req, res) => {
    try {
        khoHangModel.updateOne({_id: req.params.id}, {
            name: req.body.name,
            row: req.body.row,
            floors: req.body.floors,
            position: req.body.position,
            description: req.body.description,
        }, function (err) {
            if (err) {
               return res.json(err);
            }
        });
        return res.json("Sửa thành công");
    }
    catch (err) {
        res.json(err);
    }
};
exports.deleteKhoHang = async (req, res) => {
    khoHangModel.deleteOne({_id: req.params.id}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log('Xóa thành công');
    });
    return res.send("Xóa thành công");
};
