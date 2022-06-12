const mongoose = require('mongoose');
const positionSchema = new mongoose.Schema({
    idWarehouse: String,
    namePosition: String,
    status: String,
});
const positionWarehouse = mongoose.model('positionWarehouses', positionSchema);
module.exports = positionWarehouse;
