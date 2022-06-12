const positionWarehousesModel = require('../models/positions.model');
const khoHangModel = require('../models/khoHang.models');

exports.getPositionWarehouses = async (req, res) => {
    const positionWarehousesList = await positionWarehousesModel.find({}).sort('namePosition');
    res.json(positionWarehousesList);
}
exports.getPositionWarehouse = async (req, res) => {
    const listPositions = await positionWarehousesModel.find({idWarehouse: req.params.idWarehouse}).sort('namePosition');
    res.json(listPositions);
}
exports.postPositionWarehouses = async (req, res) => {
    try {
        const warehouse = await khoHangModel.findOne({_id: req.params.idWarehouse});
        const listPositions = await positionWarehousesModel.find({idWarehouse: req.params.idWarehouse});
        if (listPositions.length > 0) {
            return res.json({'status': 'Kho hàng đã có vị trí'});
        }
        for (let i = 1; i <= warehouse.floors; i++) {
            for (let j = 1; j <= warehouse.row; j++) {
                for (let k = 1; k <= warehouse.position; k++) {
                    const objpositionWarehouses = new positionWarehousesModel({
                        idWarehouse: req.params.idWarehouse,
                        namePosition: `F${i}-R${j}-C${k}`,
                        status: 'false',
                    });
                    await objpositionWarehouses.save(function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            }
        }
        res.json({'status':'Thêm thành công'});
    }
    catch (err) {
        res.json({'status': err});
    }
}

exports.editPositionWarehouses = async (req, res) => {
    const position = await positionWarehousesModel.findOne({_id: req.params.id});
    console.log(position);
    if(position == null){
        return res.json({'status': 'Không tìm thấy vị trí'});
    }
    const objpositionWarehouses = {
        idWarehouse: req.body.idWarehouse || position.idWarehouse,
        namePosition: req.body.namePosition || position.namePosition,
        status: req.body.status || 'false',
    };
    positionWarehousesModel.updateOne({_id: req.params.id}, objpositionWarehouses, function (err) {
        if (err) {
            return res.json({'status': err});
        } else {
            console.log('Sửa thành công');
            res.json(objpositionWarehouses);
        }
    });
}

exports.deletePositionWarehouses = (req, res) => {
    positionWarehousesModel.deleteMany({idWarehouse: req.params.idWarehouse}, function (err) {
        if (err) {
            return res.json({'status': err});
        } else {
            console.log('Xóa thành công');
            return res.json({'status': 'Xóa thành công'});
        }
    });
}
