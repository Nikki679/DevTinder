const express = require("express");
const  connectDB  = require("./config/database");
const User = require("./models/User");
const app = express();

//Middleware to convert json data to object
app.use(express.json())

app.post("/signUp",async (req,res) => {
    //Create a instance of User modal
    const user = new User(req.body)
    try{
        await user.save()
        res.send("User Added Successfully !!")
    }
    catch(error)
    {
        res.status(400).send(err.message)
    }
})

connectDB().then(() => {
    app.listen(3000,() => {
        console.log("Database connection established")
    })
}).catch((err) =>
{
    console.log("There is issue connecting to database")
})

