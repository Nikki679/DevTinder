const express = require("express");
const app = express();

app.use("/hi",(req,res) => {
    res.send("hello")
})

app.use("/hello",(req,res) => {
    res.send("welcome nikki")
})

app.listen(3000,() => {
    console.log("server run successfully")
})