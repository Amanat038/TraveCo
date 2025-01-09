
const mongoose = require('mongoose');

const hotelBookingSchema = new mongoose.Schema({
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
  numberOfRooms:{
    type:Number,
    required:true,
  },
 
  hotelId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Hotels',
    required:true
  },
  totalPrice:{
    type:Number,
    required:true
  }
},{timestamps:true});



const HotelBooking = mongoose.model('HotelBooking',hotelBookingSchema);
module.exports = HotelBooking;