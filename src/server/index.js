const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Holahmola!1",
  database: "akademia",
  // waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM register_db";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
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
    return res.status(500).json({ error: "Error processing request." });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
try{
 
  const sqlSelect =
    "SELECT * FROM register_db WHERE email = ?";
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

 return res.send({ message: "logged in successfully" });
}
catch (error) {
  console.error(error);
  return res.status(500).json({ error: "Error processing request." });
}
});

app.listen(8080, () => {
  console.log("server is running on port 8080");
});
