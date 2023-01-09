const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();


const middleware = (req, res, next) => {
  console.log(`Middleware executed ...`);
  next();
}

router.get("/", middleware,(req, res) => {
  res.send(`Router side server rendering.`);
});

require('../db/conn');
const Reg = require('../model/userSchema');
// router.get("/about", (req, res) => {
//   res.send(`About page`);
// });
// router.get("/contact", (req, res) => {
//   res.send(`Contact Page`);
// });
// router.get("/signin", (req, res) => {
//   res.send(`Signin Page`);
// });
// router.get("/signup", (req, res) => {
//   res.send(`Signup Page`);
// });

router.post("/register", async (req, res) => {
  //async function
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error : "plz fill the form properly."});
  }
  
  try {
    const userExist = await Reg.findOne({email: email});

    if (userExist) {
      return res.status(422).json({ error: "email already exists."});
    } else if (password != cpassword) {
      return res.status(422).json({ error: "password not matched."});
    } else {
      const user = new Reg({name, email, phone, work, password, cpassword});

      await user.save();
       
      res.status(201).json({ message: "user registered successfully"});
    }

    const user = new Reg({name, email, phone, work, password, cpassword});

   await user.save();
    
   res.status(201).json({ message: "user registered successfully"});
    

  } catch (error) {
    console.log(error);
  }

});

router.post('/signin', async(req, res) => {
  try {

    const {email, password} = req.body;

    if( !email || !password) {
      return res.status(400).json({error: "Please check data correctly."});
    }

    const userLogin = await Reg.findOne({ email : email});
    //console.log(userLogin);
    if(userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      
      const token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly:true
      });

      if(!isMatch) {
        return res.status(400).json({error: 'invalid cred'});
      }
      else {
        return res.json({message: 'login successful.'})
      }
    }
    else{
      res.status(400).json({error: 'invalid Credential.'});
    }

    // if(!userLogin){
    //   res.status(400).json({ message : "user error."});
    // } else {
    //   res.json({message: "logged in"});
    // }
    
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;