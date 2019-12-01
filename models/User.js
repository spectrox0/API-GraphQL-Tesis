const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
     email : { 
         type: String,
         required:true
     },
     name: {
        type: String,
        required:true 
     },
     password: {
         type: String, 
         required: true
     } , 
     username: {
         type:String, 
         required:true 
     },
     urlImg: {
         type:String, 
         required:true
     },
    active: {
        type:Boolean, 
        required:true, 
        default:true
    }

})

module.exports = mongoose.model('User', userSchema);