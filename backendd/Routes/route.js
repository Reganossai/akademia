const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const UserSchema = require("../schema/user");

const { registration, login } = require("../validation/validation");

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

  const user = await UserSchema.findOne({email:email});


  if (!user) {
   return res.status(400).send({ message: "Wrong email/password combination" });
  }

  
  if (user !== null && user.password !== undefined) {
    
    let password = user.password;
    
  // Use bcrypt to compare the provided password with the hashed password in the database
  const passwordComparison = await bcrypt.compare(req.body.password, password);

  
  if(passwordComparison){
   return res.status(200).json(user)
  }
  else{
   return res.status(401).json({message: "Wrong email/password combo"});
  }

    // Do something with the password
  } else {
    // Handle the case when user is null or user.password is undefined
  return  res.status(400).send({message:"User object is null or password property is undefined."});
  }
});

module.exports = router;
