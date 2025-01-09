const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const tourPackagesRoute = require('./routes/tourPackages')
const bodyParser = require("body-parser");

dotenv.config();
const app = express()

const PORT = process.env.port|| 4600 ;


// middleware 
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));



// mongodb string
const db = "mongodb+srv://amanatsingh872001:8Ke1MgTcFNwX19vM@cluster0.fr6e7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


// connection data base
const connectionDB = async () => {
  try {
     await mongoose.connect(db);
     console.log("Connected to MongoDB");
  } catch (err) {
     console.log("Error connecting to Mongo",err);
  }
};






// Routes
app.use('/',tourPackagesRoute)






















app.listen(PORT, () => {
  connectionDB();
  console.log(`Port listen ${PORT}`)
  
})