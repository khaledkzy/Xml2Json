const mongoose = require('mongoose');
const { Schema } = mongoose;

var debitItem = new Schema({}, {
    strict: false
});
var DEBITITEM = mongoose.model("debitItem", debitItem);

module.exports = DEBITITEM;