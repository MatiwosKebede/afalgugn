const express = require("express")
const router = express.Router()

router.post("/profile",(req,res)=>{
  const {name , email , password} = req.body;
  const query = "insert into users_table (name , email , password) values (?,?,?)"
  db.query(query,[name,email,password],(err , dawit)=>{
    if (err){
      console.log("error occurred")
      return res.status(500).json({err:"error occured when registering the user "})
    }
    else{
      return res.status(200).json({message:"Successfully registered please check your email and verify your email"})
    }
  })
})

mosule.exports = router