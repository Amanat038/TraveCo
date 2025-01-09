
const mongoose = require('mongoose');

const foreignTourPackageSchema = new mongoose.Schema({
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

const ForeignTourPackage = mongoose.model('ForeignTourPackage', foreignTourPackageSchema);

module.exports= ForeignTourPackage;