const mongoose = require('mongoose') ; 


const plm = require('passport-local-mongoose');

const solarschema = new mongoose.Schema({
    name : String , 
    username : String , 
    email : String , 
    password : String 
}, { 
    timestamps : true 
})

solarschema.plugin(plm)


const solar = mongoose.model('data' , solarschema ) ; 
module.exports = solar ; 