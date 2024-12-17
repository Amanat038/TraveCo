
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },

  email:{
    type:String,
    required:true,
  },
  phoneNumber:{
    type:String,
    required:true,
  },
  numberOfTravelers:{
    type:Number,
    required:true,
  },
  specialRequests:{
    type:String,
  },
  packageId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'TourPackage',
    required:true
  },
  totalPrice:{
    type:Number,
    required:true
  }
},{timestamps:true});



const Booking = mongoose.model('Booking',bookingSchema);
module.exports = Booking;