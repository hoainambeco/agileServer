var express = require('express');
var router = express.Router();
var Warehouse = require('../models/warehouses.models');
var WarehouseController = require('../controlers/warehouses.controlers');

router.get('/', WarehouseController.getWarehouses);
router.post('/:position', WarehouseController.getWarehousesByPositon);
router.post('/add', WarehouseController.postWarehouses);
router.post('/edit/:id', WarehouseController.editWarehouses);
router.post('/delete/:id', WarehouseController.deleteWarehouses);
module.exports = router;
