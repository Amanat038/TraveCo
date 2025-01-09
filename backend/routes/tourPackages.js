const express = require("express");
const router = express.Router();
const TourPackage = require("../model/TourPackage");
const Booking = require("../model/BookingSchema");
const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const Razorpay = require("razorpay");
const { verifyAdmin } = require("../middleware/auth");
const UpComingPackage = require("../model/UpComingPackage");
const ForeignTourPackage = require("../model/ForeignTour");
const Hotels = require("../model/Hotel");
const getDataUri = require("../utils/datauri");
// const path = require("path");
const upload = require("../middleware/multer");
const cloudinary = require("../utils/cloudinary");
const HotelBooking = require("../model/HotelBookingSchema");

router.post("/register",async (req, res) => {
   const { name, email, password, role } = req.body;

   if (!name || !email || !password) {
      return res.status(400).json({ message: "all fields required" });
   }

   const existingUser = await User.findOne({ email });
   if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
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

router.post("/hotelBookings", async (req, res) => {
   const { name, email, phoneNumber, numberOfRooms, HotelId } = req.body;

   try {
      const hotel = await Hotels.findById(packageId);
      if (!hotel) {
         return res.status(404).json({ message: "Tour package not found" });
      }

      // total price

      const totalPrice = hotel.price * numberOfRooms;

      // create a new booking
      const newBooking = new HotelBooking({
         name,
         email,
         phoneNumber,
         numberOfRooms,
         HotelId,
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
            title: hotel.title,
            pricePerPerson: hotel.price,
         },
         bookingDetails: {
            numberOfRooms: saveBooking.numberOfRooms,
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

router.post("/create-order", async (req, res) => {
   try {
      const { amount } = req.body;

      const options = {
         amount: amount * 100, // Razorpay expects the amount in paise
         currency: "INR",
         receipt: "receipt#1",
         payment_capture: 1, // 1 for automatic capture
      };

      const order = await razorpay.orders.create(options);
      res.json({ order });
   } catch (error) {
      res.status(500).json({ error: "Error creating Razorpay order" });
   }
});

// Admin Post
router.post("/admin/foreignPackages",verifyAdmin,  async (req, res) => {
   const { title, description, price, availableFates, image } = req.body;

   if (!title || !description || !price || !availableFates || !image) {
      return res.status(400).json({ message: "all fields are required" });
   }

   try {
      const newForeignTourPackages = new ForeignTourPackage({
         title,
         description,
         price,
         availableFates,
         image,
      });

      const saveForeignTourPackages = await newForeignTourPackages.save();
      res.status(200).json(saveForeignTourPackages);
   } catch (error) {
      res.status(500).json({ message: "error creating tour package", error });
   }
});
router.post("/admin/packages",verifyAdmin,  upload.single("image"), async (req, res) => {
   try {
      const { title, description, price, availableFates } = req.body;

      if (!title || !description || !price || !availableFates || !req.file) {
         return res.status(400).json({ message: "all fields are required" });
      }

      const fileUri = getDataUri(req.file); // Convert file to Data URI
      const result = await cloudinary.uploader.upload(fileUri, {
         folder: "uploads",
      });

      const newTourPackage = new TourPackage({
         title,
         description,
         price,
         availableFates,
         image: result.secure_url,
      });

      const saveTourPackage = await newTourPackage.save();
      res.status(200).json(saveTourPackage);
   } catch (error) {
      res.status(500).json({ message: "error creating tour package", error });
   }
});

router.post("/admin/hotels",verifyAdmin,  upload.single("image"), async (req, res) => {
   try {
      const {
         title,
         description,
         price,

         policy,
         food,
         rating,
      } = req.body;

      if (
         !title ||
         !description ||
         !price ||
         !policy ||
         !food ||
         !rating ||
         !req.file
      ) {
         return res.status(400).json({ message: "All fields are required" });
      }

      const fileUri = getDataUri(req.file); // Convert file to Data URI
      const result = await cloudinary.uploader.upload(fileUri, {
         folder: "uploads",
      });
      const newHotels = new Hotels({
         title,
         description,
         price,

         image: result.secure_url,
         policy,
         food,
         rating,
      });

      const hotels = await newHotels.save();
      res.status(200).json(hotels);
   } catch (error) {
      res.status(500).json({ message: "error creating tour package", error });
   }
});

router.post("/admin/UpComingPackages",verifyAdmin,  async (req, res) => {
   const { title, description, price, availableFates, image } = req.body;

   if (!title || !description || !price || !availableFates || !image) {
      return res.status(400).json({ message: "all fields are required" });
   }

   try {
      const newUpComingPackage = new UpComingPackage({
         title,
         description,
         price,
         availableFates,
         image,
      });

      const saveUpcomingPackage = await newUpComingPackage.save();
      res.status(200).json(saveUpcomingPackage);
   } catch (error) {
      res.status(500).json({ message: "error creating tour package", error });
   }
});

// Admin get

router.get("/admin/packages",verifyAdmin,  async (req, res) => {
   try {
      const packages = await TourPackage.find();
      res.status(200).json(packages);
   } catch (error) {
      res.status(500).json({ message: "error fetching packages" });
   }
});

router.get("/admin/bookings",verifyAdmin,  async (req, res) => {
   try {
      const bookings = await Booking.find().populate("packageId");
      res.status(200).json(bookings);
   } catch (error) {
      res.status(500).json({ message: "error fetching bookings" });
   }
});

// get
router.get("/search", async (req, res) => {
   const { query } = req.query;
   try {
      const results = await TourPackage.find({
         title: { $regex: query, $options: "i" },
      });

      res.status(200).json(results);
   } catch (error) {
      console.error("Error fetching search results:", error);
      res.status(500).json({ message: "Server error" });
   }
});

router.get("/packages", async (req, res) => {
   try {
      const limit = parseInt(req.query.limit) || 0;
      const tourPackages = await TourPackage.find().limit(limit);
      res.status(200).json(tourPackages);
   } catch (err) {
      res.status(500).json({ message: "Error", err });
   }
});
router.get("/package/:id", async (req, res) => {
   const { id } = req.params;

   try {
      const package = await TourPackage.findById(id);

      if (!package) {
         return res.status(404).json({ message: "Package not found" });
      }

      res.status(200).json(package);
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: "server error " });
   }
});

router.get("/upcomingPackage", async (req, res) => {
   try {
      const limit = parseInt(req.query.limit) || 0;
      const UpcomingTourPackages = await UpComingPackage.find().limit(limit);
      res.status(200).json(UpcomingTourPackages);
   } catch (err) {
      res.status(500).json({ message: "Error", err });
   }
});

router.get("/foreignPackages", async (req, res) => {
   try {
      const limit = parseInt(req.query.limit) || 0;
      const UpcomingTourPackages = await ForeignTourPackage.find().limit(limit);
      res.status(200).json(UpcomingTourPackages);
   } catch (err) {
      res.status(500).json({ message: "Error", err });
   }
});

router.get("/hotels", async (req, res) => {
   try {
      const limit = parseInt(req.query.limit) || 0;
      const Hotel = await Hotels.find().limit(limit);
      res.status(200).json(Hotel);
   } catch (err) {
      res.status(500).json({ message: "Error", err });
   }
});

router.get("/hotelView/:id", async (req, res) => {
   const { id } = req.params;

   try {
      const package = await Hotels.findById(id);

      if (!package) {
         return res.status(404).json({ message: "Package not found" });
      }

      res.status(200).json(package);
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: "server error " });
   }
});

// Admin update

router.put("/admin/hotelsImg/:id",verifyAdmin,  upload.single("image"), async (req, res) => {
   const { id } = req.params;
   console.log(id);

   try {
      if (!req.file) {
         return res.status(400).json({ message: "All fields are required" });
      }

      const hotel = await Hotels.findById(id);
      if (!hotel) {
         return res.status(404).json({ message: "Hotel not found" });
      }

      const fileUri = getDataUri(req.file);
      const result = await cloudinary.uploader.upload(fileUri, {
         folder: "uploads",
      });

      hotel.image.push(result.secure_url);
      console.log(result.secure_url);

      await hotel.save();
      res.status(200).json({
         message: "Image added successfully",
         hotel,
      });
   } catch (error) {
      res.status(500).json({ message: "error creating tour package", error });
   }
});

router.put("/admin/packages:id",verifyAdmin,  async (req, res) => {
   const { id } = req.params;
   const { title, description, price, availableFates, image } = req.body;

   if (!title && !description && !price && !availableFates && !image) {
      return res
         .status(404)
         .json({ message: "At least one file is required for update" });
   }

   try {
      const updatePackage = await TourPackage.findByIdAndUpdate(
         id,
         { $set: { title, description, price, availableFates, image } },
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

// delete

router.delete("/admin/packages/:id",verifyAdmin,  async (req, res) => {
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

module.exports = router;
