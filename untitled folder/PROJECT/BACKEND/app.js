const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const User = require("./userinfo");
const BookingHall = require("./Bookinghallsinfo");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected Sucessfully");
  })
  .catch((e) => {
    console.log("MongoDB connection error:", e);
  });

app.get("/", (req, res) => {
  res.send({ status: "started" });
});

app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    user = new User({
      username,
      email,
      password,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (
      username === process.env.Admin_username &&
      password === process.env.Admin_password
    ) {
      return res
        .status(200)
        .json({ message: "Admin login successful", redirectUrl: "AdminHome" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    if (!(user.password == password)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res
      .status(200)
      .json({ message: "Login successful", redirectUrl: "UserHome" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});
app.get("/bookings", async (req, res) => {
  try {
    const bookings = await BookingHall.find({ isBooked: false });
    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/add-booking", async (req, res) => {
  const { hallName, hallDescription, imageUri } = req.body;

  try {
    const newBooking = new BookingHall({
      hallName,
      hallDescription,
      imageUri,
    });

    await newBooking.save();

    res.status(201).json({ message: "Booking added successfully!" });
  } catch (err) {
    console.error("Error saving booking:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});
app.post("/check-username", async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "Username not found." });
    }

    res.status(200).json({ message: user.username });
  } catch (err) {
    console.error("Error checking username:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});
app.post("/book-hall", async (req, res) => {
  const { username, hallName, hallDescription } = req.body;

  try {
    // Step 1: Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "Username not found." });
    }

    // Step 2: Find the hall by its name and description
    const hall = await BookingHall.findOne({ hallName, hallDescription });

    if (!hall) {
      return res.status(404).json({ message: "Hall not found." });
    }

    // Step 3: Add the user ID to the existing hall booking
    hall.users = user._id;
    if (!hall.isBooked) {
      hall.isBooked = true;
    }

    // Step 4: Save the updated hall booking
    await hall.save();

    // Respond with success
    res.status(201).json({ message: "Hall booked successfully!" });
  } catch (err) {
    console.error("Error booking hall:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});
app.get("/user-bookings/:username", async (req, res) => {
  const { username } = req.params;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "Username not found." });
    }

    // Find all halls booked by this user
    const bookings = await BookingHall.find({ users: user._id});

    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user." });
    }

    // Return the list of booked halls
    res.status(200).json({
      message: "Past bookings retrieved successfully!",
      bookings: bookings,
    });
  } catch (err) {
    console.error("Error retrieving bookings:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});
app.get("/allbookings", async (req, res) => {
  try {
    const bookings = await BookingHall.find();
    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});
// Unbook a hall route
app.post("/unbook-hall/:hallId", async (req, res) => {
  const { hallId } = req.params;

  try {
    // Find the hall by its ID and set isBooked to false
    const updatedHall = await BookingHall.findByIdAndUpdate(
      hallId,
      { isBooked: false },
      { new: true } 
    );

    if (updatedHall) {
      res.status(200).json({ message: "Hall successfully unbooked", updatedHall });
    } else {
      res.status(404).json({ message: "Hall not found" });
    }
  } catch (err) {
    console.error("Error unbooking hall:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
