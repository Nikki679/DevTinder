const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/User");
const app = express();

//Middleware to convert json data to object
app.use(express.json());

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.find({ emailId: userEmail });
    if (user.length === 0) {
      res.status(404).send("User Not Found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    if (user.length === 0) {
      res.status(404).send("No user available");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.post("/signup", async (req, res) => {
  //Create a instance of User modal
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User Added Successfully !!");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.patch("/user", async (req, res) => {
  const id = req.body.userId;
  const data = req.body;

  isAllowedUpdate = Object.keys(data).every((key) => ["password","about","mobileNo"].includes(key))
 

  try {
    if(!isAllowedUpdate)
        {
            throw new Error("You cannot update theses field")
            //.status(400).send("Updates not allowed")
        }
    const user = await User.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true
    });
    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.delete("/user", async (req, res) => {
  try {
    const id = req.body.userId;
    await User.findByIdAndDelete(id);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection established");
    });
  })
  .catch((err) => {
    console.log("There is issue connecting to database");
  });
