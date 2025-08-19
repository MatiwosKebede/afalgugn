const express = require("express")
const app = express()

require('dotenv').config();
app.use(express.json());
app.use('/auth',require('./auth/signup/signup'))
app.use("/auth",require("./auth/verifyEmail/verify"))
app.use("/auth",require("./auth/verifyEmail/resend_email"))
app.use("/auth",require("./auth/login/login"))
app.use("/auth",require("./auth/change_password/change_password"))
app.use("/auth",require("./auth/password_reset/forgot_password"))
app.use("/auth",require("./auth/password_reset/password_reset"))
app.use('/public',require("./public/posts"))
app.use('/user',require('./user/reports/create_report'))
const swaggerDocs = require("./swagger");
swaggerDocs(app);

app.listen(3000,()=>{
    console.log("server is running on 3000")


})