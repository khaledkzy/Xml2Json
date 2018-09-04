const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/cfDB");
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
