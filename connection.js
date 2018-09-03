

const mongoose = require('mongoose')
const BacsDocument = require('../models/bacsDocumentSchema');
mongoose.Promise = global.Promise;


var promise = mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fcDB');

const saveBacsDocument = async (data) => {
    try {
        const XMLdata = new BacsDocument(data);
        await XMLdata.save();
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

module.exports = {
    saveBacsDocument
}