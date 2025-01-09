
const mongoose = require('mongoose');

const upComingPackageSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  availableFates:{
    type:[Date],
    required:true
  },
  image:{
    type:String,
    required:true
  },
  
},{timestamps:true});

const UpComingPackage = mongoose.model('UpComingPackage', upComingPackageSchema);

module.exports= UpComingPackage;