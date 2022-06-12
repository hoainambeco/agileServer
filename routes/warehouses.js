var express = require('express');
var router = express.Router();
var WarehouseController = require('../controlers/warehouses.controlers');

router.get('/', WarehouseController.getWarehouses);
router.post('/:position', WarehouseController.getWarehousesByPositon);
router.post('/edit/:id', WarehouseController.editWarehouses);
router.post('/delete/:id', WarehouseController.deleteWarehouses);
router.post('/add/ware', WarehouseController.postWarehouses);
module.exports = router;
