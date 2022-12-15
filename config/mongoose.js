const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codeial_Dev');

const db =mongoose.connection;
db.on('error',console.error.bind(console,"error connecting to mongo db"));

db.once('open',function(){
    console.log('Connected to MongoDB');
})

module.exports=db;