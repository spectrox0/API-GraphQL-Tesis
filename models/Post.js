const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
     title : { 
         type: String,
         required:true
     },
      creator: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
     },
     date: {
         type: Date , 
         required:true, 
         default: Date().now()
     },
     urlImg: {
         type:String, 
         required:true
     },
     users: [ {
        type: Schema.Types.ObjectId, 
        ref: 'User'
     }],
    active: {
        type:Boolean, 
        required:true, 
        default:true
    }

})

module.exports = mongoose.model('Post', postSchema);