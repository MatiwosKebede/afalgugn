const express = require("express")
const app = express()

app.use("/users","./users.js")

app.listen(3000,()=>{
  console.log("running on port 3000")
})