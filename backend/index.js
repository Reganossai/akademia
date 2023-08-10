const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
require("dotenv").config(); // Load environment variables from .env file

const db = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

// Secret key for JWT (keep this secret and do not hardcode it)
const secretKey = process.env.JWT_SECRET_KEY;

app.use(cors({origin: 'https://localhost:3001', credentials: true}))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure multer for file uploads as middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Choose the appropriate destination based on the form
    const formName =
      req.path === "/personal-information"
        ? "personal-information"
        : "previous-education";
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadForm1 = multer({ storage: storage });

const uploadForm2 = multer({ storage: storage });

app.get("/api/get", async (req, res) => {
  try {
    const sqlGet = "SELECT * FROM register_db";
    const [rows] = await db.query(sqlGet);
    res.status(200).send({
      message: "data fetched",
      data: rows,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post("/register", async (req, res) => {
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields." });
  }

  try {
    // Check if the email is already registered
    const [rows] = await db.query("SELECT * FROM register_db WHERE email = ?", [
      email,
    ]);

    if (rows[0]) {
      return res.send({ message: "User Already Exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // Email is not registered, proceed with user registration
    await db.query(
      "INSERT INTO register_db (fullname, email, password) VALUES (?, ?, ?)",
      [fullname, email, hashedPassword]
    );

    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const sqlSelect = "SELECT * FROM register_db WHERE email = ?";
    const [row] = await db.query(sqlSelect, [email]);

    const user = row[0];

    if (row.length === 0) {
      return res.send({ message: "User Doesn't exist" });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.send({ message: "Invalid password" });
    }

    // Issue a JWT token upon successful login
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" }); // Token expires in 1 hour

    return res.send({ message: "logged in successfully", token, user });
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
});

app.post(
  "/personal-information",
  uploadForm1.single("picture"),
  async (req, res) => {
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

    try {
      const sqlInsert =
        "INSERT INTO personal_information(first_name, last_name, other_name, email, phone, gender, address, dob, `select`, picture_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? )"; //I used back tick on select asin `select` to remove sql error because "select" is an sql statement
      await db.query(sqlInsert, [
        firstName,
        lastName,
        otherName,
        email,
        phone,
        gender,
        address,
        dob,
        select,
        picturePath,
      ]);

      return res
        .status(201)
        .json({ message: "Form data submitted successfully." });
    } catch (error) {
      console.error(error);
      return res.status(400).json(error);
    }
  }
);

app.post("/guardian-information", async (req, res) => {
  const {
    guardianFirstName,
    guardianLastName,
    relationship,
    guardianEmail,
    guardianPhone,
    dob,
    nationality,
    guardianAddress,
    occupation,
  } = req.body;

  try {
    const sqlInsert =
      "INSERT INTO guardian_information(guardian_firstname, guardian_lastname, relationship, email, phone, dob, nationality, guardian_address, occupation) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)";
    await db.query(sqlInsert, [
      guardianFirstName,
      guardianLastName,
      relationship,
      guardianEmail,
      guardianPhone,
      dob,
      nationality,
      guardianAddress,
      occupation,
    ]);

    return res
      .status(201)
      .json({ message: "Form data submitted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
});

app.post(
  "/previous-education",
  uploadForm2.single("previousResult"),
  async (req, res) => {
    const { name, selectClass } = req.body;

    const picturePath = req.file ? req.file.path : null;

    try {
      const sqlInsert =
        "INSERT INTO previous_education(name,select_class, picture_path) VALUES (?, ?, ?)";
      await db.query(sqlInsert, [name, selectClass, picturePath]);

      return res
        .status(201)
        .json({ message: "Form data submitted successfully." });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
);

app.listen(8080, () => {
  console.log("server is running on port 8080");
});
