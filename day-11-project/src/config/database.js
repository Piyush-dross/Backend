const mongoose = require("mongoose");
async function connecttodb() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("connected to database");
}
module.exports = connecttodb;

