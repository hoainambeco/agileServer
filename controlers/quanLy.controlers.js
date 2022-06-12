const warehouseModel = require('../models/warehouses.models');
const hoaDonXuatModel = require("../models/HoaDonXuat");

exports.thongKeTong = async function (req, res) {
    const HDXList = await hoaDonXuatModel.find({});
    const HDNList = await warehouseModel.find({});

    let tongTienNhap = 0;
    let tongTienXuat = 0;

    HDNList.forEach(element => {
        tongTienNhap += element.DonGia * element.SoLuong;
    });
    HDXList.forEach(element => {
        tongTienXuat += element.ThanhTien;
    });
    res.json({
            tongtienNhap: tongTienNhap,
            tongtienXuat: tongTienXuat,
    });
}

async function HDXMonthly(gte, lte) {
    try {
        const HDXList = await hoaDonXuatModel.find({
            NgayXuat: {
                $gte: new Date(gte),
                $lte: new Date(lte)
            }
        }).sort('NgayNhap');
        let tongXuat = 0;
        console.log(HDXList);
        HDXList.forEach(element => {
            tongXuat += element.ThanhTien;
        });
        const HDNList = await warehouseModel.find({
            NgayNhap: {
                $gte: new Date(gte),
                $lte: new Date(lte)
            }
        }).sort('NgayNhap');
        let tongNhap = 0;
        HDNList.forEach(element => {
            tongNhap += element.DonGia * element.SoLuong;
        });
        return {
                tongNhap: tongNhap,
                tongXuat: tongXuat,
        };
    } catch (err) {
        console.log(err);
        return err;
    }
}

exports.thongke = async function (req, res) {
    res.json(await HDXMonthly(req.body.gte, req.body.lte));
}
