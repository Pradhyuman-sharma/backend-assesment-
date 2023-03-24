const express = require("express");
const router = express.Router();
const  Users  = require("../models/users");


const { createTokens} = require("./JWT");

router.use(express.json());



router.post("/login", async (req, res) => {
  try{
  const { name, password } = req.body;

  const user =  Users.map(user=>{
    if(name == user.name){
        
        return user
    }
  });
  if (!user[0]) res.status(400).json({ error: "User Doesn't Exist" });

  
  if(password == user[0].password){
    const accessToken = createTokens(user);

      res.cookie("access-token", accessToken, {
        maxAge: 60 * 60 * 24 * 30 * 1000,
        httpOnly: true,
      });

      res.json("LOGGED IN");
  }
  else{
    res.status(400).json({ error: "Wrong Username and Password Combination!" });
  } 
  
}catch(err){
  res.status(401).json("Something went wrong");
}
});

module.exports =  router