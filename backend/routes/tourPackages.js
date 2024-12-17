const express = require("express");
const router = express.Router();
const TourPackage = require("../model/TourPackage");
const Booking = require("../model/BookingSchema");
const User = require("../model/userSchema");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const { verifyAdmin } = require("../middleware/auth");

router.post("/register", async (req, res) => {
   const { name, email, password, role } = req.body;

   if (!name || !email || !password) {
      return res.status(400).json({ message: "all fields required" });
   }

   const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

   try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
         name,
         email,
         password: hashedPassword,
         role: role || "user",
      });

      await newUser.save();

      res.status(201).json({ message: "user registered successfully" });
   } catch (error) {
      res.status(500).json({ message: "error creating user", error });
   }
});

router.post("/login", async (req, res) => {
   const { email, password } = req.body;

   if (!email || !password) {
      return res
         .status(400)
         .json({ message: "Email and password are required" });
   }

   try {
      const user = await User.findOne({ email });

      if (!user) {
         return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
         return res.status(400).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
         { id: user._id, role: user.role },
         process.env.JWT_SECRET,
         { expiresIn: "1h" }
      );

      res.status(200).json({
         message: "Login successful",
         token,
         user: { id: user._id, name: user.name, role: user.role },
      });
   } catch (error) {
      res.status(500).json({ message: "Error logging in", error });
   }
});

router.get("/packages", async (req, res) => {
   try {
      const tourPackages = await TourPackage.find();
      res.status(200).json(tourPackages);
   } catch (err) {
      res.status(500).json({ message: "Error", err });
   }
});

router.post("/admin/packages", async (req, res) => {
   const { title, description, price, availableDates, image } = req.body;

   if (!title || !description || !price || !availableDates || !image) {
      return res.status(400).json({ message: "all fields are required" });
   }

   try {
      const newTourPackage = new TourPackage({
         title,
         description,
         price,
         availableDates,
         image,
      });

      const saveTourPackage = await newTourPackage.save();
      res.status(200).json(saveTourPackage);
   } catch (error) {
      res.status(500).json({ message: "error creating tour package", error });
   }
});

router.post("/bookings", async (req, res) => {
   const {
      name,
      email,
      phoneNumber,
      numberOfTravelers,
      specialRequests,
      packageId,
   } = req.body;

   try {
      const tourPackage = await TourPackage.findById(packageId);
      if (!tourPackage) {
         return res.status(404).json({ message: "Tour package not found" });
      }

      // total price

      const totalPrice = tourPackage.price * numberOfTravelers;

      // create a new booking
      const newBooking = new Booking({
         name,
         email,
         phoneNumber,
         numberOfTravelers,
         specialRequests,
         packageId,
         totalPrice,
      });

      const saveBooking = await newBooking.save();

      const invoice = {
         customer: {
            name: saveBooking.name,
            email: saveBooking.email,
            phoneNumber: saveBooking.phoneNumber,
         },
         package: {
            title: tourPackage.title,
            pricePerPerson: tourPackage.price,
         },
         bookingDetails: {
            numberOfTravelers: saveBooking.numberOfTravelers,
            totalPrice: saveBooking.totalPrice,
         },
      };
      res.status(200).json({
         message: "booking successfully",
         booking: saveBooking,
         invoice,
      });
   } catch (error) {
      res.status(500).json({ message: "error in booking", error: error });
   }
});

router.put("/admin/packages:id", verifyAdmin, async (req, res) => {
   const { id } = req.params;
   const { title, description, price, availableDates, image } = req.body;

   if (!title && !description && !price && !availableDates && !image) {
      return res
         .status(404)
         .json({ message: "At least one file is required for update" });
   }

   try {
      const updatePackage = await TourPackage.findByIdAndUpdate(
         id,
         { $set: { title, description, price, availableDates, image } },
         { new: true }
      );

      if (!updatePackage) {
         return res.status(404).json({ message: "Tour package not found" });
      }
      res.status(200).json(updatePackage);
   } catch (error) {
      res.status(500).json({ message: "Error updating package", error });
   }
});

router.delete("/admin/packages/:id", verifyAdmin, async (req, res) => {
   const { id } = req.params;

   try {
      const deletePackage = await TourPackage.findByIdAndDelete(id);

      if (!deletePackage) {
         return res.status(404).json({ message: "Tour package not found" });
      }

      res.status(200).json({ message: "Tour package deleted successfully" });
   } catch (error) {
      res.status(500).json({ message: "Error deleting package", error });
   }
});

router.get("/admin/packages", verifyAdmin, async (req, res) => {
   try {
      const packages = await TourPackage.find();
      res.status(200).json(packages);
   } catch (error) {
      res.status(500).json({ message: "error fetching packages" });
   }
});

router.get("/admin/bookings", async (req, res) => {
   try {
      const bookings = await Booking.find().populate("packageId");
      res.status(200).json(bookings);
   } catch (error) {
      res.status(500).json({ message: "error fetching bookings" });
   }
});

router.delete("/booking/:id", async (req, res) => {
   const { id } = req.params;

   try {
      const deleteBooking = await Booking.findByIdAndDelete(id);

      if (!deleteBooking) {
         return res.status(404).json({ message: "error deleting bookings" });
      }

      res.status(200).json({ message: "Booking deleted successfully" });
   } catch (error) {
      res.status(500).json({ message: "error deleting bookings", error });
   }
});

router.get("/package/:id", async (req, res) => {
  const {id} = req.params

  try{
   const package = await TourPackage.findById(id);

   if(!package) {
      return res.status(404).json({ message: "Package not found" });
   }


   res.status(200).json(package);
  }catch(err){
   console.error(err);
   res.status(500).json({ message:"server error "})
  }
});

module.exports = router;
