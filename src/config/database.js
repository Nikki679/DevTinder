const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect("mongodb+srv://Nikki14:ZqT2Jh6II4DfCtGS@namastenode.lrlpn.mongodb.net/devTinder")
}

module.exports = connectDB;

