const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {type: String, minLength: 3, maxLength: 20},
    lastName: {type: String, minLength: 3, maxLength: 20},
    age: {type: Number, minLength: 1, maxLength: 120}
},{
    collection: "user",
    versionKey: false
});

const User = mongoose.model("User", userSchema);
module.exports = User;
