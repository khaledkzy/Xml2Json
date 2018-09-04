const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI ||"mongodb://localhost:27017/financialclouds");
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
