
const mongoose = require('mongoose');

const hotels = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  policy:{
    type:String,
    required:true
  },
  rating:{
    type:Number,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
 
  food:{
    type:String,
    required:true
  },
  image:{
    type:[String],
    default: []
  },

  
},{timestamps:true});

const Hotels = mongoose.model('Hotels', hotels);

module.exports= Hotels;