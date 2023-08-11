const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const UserSchema = require("../schema/user");


router.post("/register", async(req,res)=>{
    const {fullname,email, password} = req.body;

    if (!fullname || !email || !password) {
        return res
          .status(400)
          .json({ error: "Please provide all required fields." });
      }
    
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
        

      try {
        const usersRegistrationData = await UserSchema.create({
            fullname:fullname,
            email:email,
            password:hashedPassword,
        })
        res.status(201).json({myUserData: usersRegistrationData})
      } catch (error) {
         res.status(400).json(error);
      }
     
    
})


module.exports = router