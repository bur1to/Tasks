const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number
},{
    collection: "user",
    versionKey: false
});

const User = mongoose.model("User", userSchema);
module.exports = User;