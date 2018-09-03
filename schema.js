const mongoose = require('mongoose');
const { Schema } = mongoose;

const XMLschema = new Schema({}, {strict: false })

const fetchedData = mongoose.model('BACSDocument', XMLschema);

module.exports = fetchedData;