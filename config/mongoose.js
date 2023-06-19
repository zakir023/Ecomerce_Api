const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');
const db = mongoose.connection;

db.on('err',console.error.bind(console,'Error in connecting to DB'));

db.once('open',function(){
    console.log("Server is Connected to MongoDB DataBase");
})

module.exports = db;