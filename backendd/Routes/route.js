const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const UserSchema = require("../schema/user");
const personalInformation = require("../schema/personal-info");
const guardianInformation = require("../schema/guardian-info");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
const { registration, login } = require("../validation/validation");
require("dotenv").config(); // Load environment variables from .env file

// Configure multer for file uploads as middleware
const storage = multer.diskStorage({
  destination: "../backendd/Images",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadForm1 = multer({ storage: storage });

const uploadForm2 = multer({ storage: storage });

// Secret key for JWT (keep this secret and do not hardcode it)
const secretKey = process.env.JWT_SECRET_KEY;

router.post("/register", async (req, res) => {
  const { fullname, email, password } = req.body;

  const { error } = registration(req.body);

  if (error) {
    return res.status(401).json(error.details[0].message);
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const checkIfEmailAlreadyExists = await UserSchema.findOne({ email: email });

  if (checkIfEmailAlreadyExists) {
    return res.status(401).json({ message: "email already exist" });
  }

  try {
    const usersRegistrationData = await UserSchema.create({
      fullname: fullname,
      email: email,
      password: hashedPassword,
    });
    return res.status(201).json({ myUserData: usersRegistrationData });
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/login", async (req, res) => {
  const { email } = req.body;

  const { error } = login(req.body);

  if (error) {
    return res.status(401).send(error.details[0].message);
  }

  const user = await UserSchema.findOne({ email: email });

  if (!user) {
    return res.status(400).send({ message: "User doesn't exist!" });
  }

  if (user !== null && user.password !== undefined) {
    let password = user.password;

    // Use bcrypt to compare the provided password with the hashed password in the database
    const passwordComparison = await bcrypt.compare(
      req.body.password,
      password
    );

    if (passwordComparison) {
      // Issue a JWT token upon successful login
      const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "1h" }); // Token expires in 1 hour
      console.log("token");
      return res.status(200).json(user);
    } else {
      return res.status(401).json({ message: "Wrong password provided" });
    }

    // Do something with the password
  } else {
    // Handle the case when user is null or user.password is undefined
    return res
      .status(400)
      .send({
        message: "User object is null or password property is undefined.",
      });
  }
});

router.post(
  "/personal-information",
  uploadForm1.single("picture"),
  async (req, res) => {
  

    try {
      const {
        firstName,
        lastName,
        otherName,
        email,
        phone,
        gender,
        address,
        dob,
        select,
      } = req.body;
  

      const picturePath = req.file ? req.file.path : null;

      const newData = {
        firstName,
        lastName,
        otherName,
        email,
        phone,
        gender,
        address,
        dob,
        select,
        picture: picturePath,
    };

   
    const savedData = await personalInformation.create(newData);
    res.status(201).json(savedData);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
);

router.post(
  "/guardian-information",
  async (req, res) => {
  

    try {
      const {
        guardianFirstName,
        guardianLastName,
        relationship,
        guardianEmail,
        guardianPhone,
        nationality,
        guardianAddress,
        occupation,
      } = req.body;
  


      const newData = {
        guardianFirstName,
        guardianLastName,
        relationship,
        guardianEmail,
        guardianPhone,
        nationality,
        guardianAddress,
        occupation,
    };

   
    const savedData = await guardianInformation.create(newData);
    res.status(201).json(savedData);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
)

module.exports = router;
