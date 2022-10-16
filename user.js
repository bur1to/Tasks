const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    age: Number
});

const User = mongoose.model("User", userSchema);
module.exports = User;