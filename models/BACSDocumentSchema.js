const mongoose = require('mongoose');
const { Schema } = mongoose;

var XMLschema = new Schema({}, {strict: false});
var BACSDocument = mongoose.model("xml", XMLschema);
module.exports = BACSDocument;
