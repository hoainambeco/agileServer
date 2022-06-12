var express = require('express');
var router = express.Router();
const positionController = require('../controlers/positionWarehouses.controller');

router.get('/', positionController.getPositionWarehouses);
router.get('/:idWarehouse', positionController.getPositionWarehouse);
router.post('/add', positionController.postPositionWarehouses);
router.post('/edit/:id', positionController.editPositionWarehouses);
router.post('/delete/:idWarehouse', positionController.deletePositionWarehouses);
module.exports = router;
//#endregion
