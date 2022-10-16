const mongoose = require("mongoose");
const User = require("./user.js");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded());

mongoose.connect("mongodb://localhost:27017/testDb", {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("MongoDB succesfully connected"))
.catch((err) => console.log(err));

const db = mongoose.connection;
const collection = db.collection("user");

app.get("/users", (req, res) => {
    collection.find().toArray((err, result) => {
        if(err) console.log(err);
        res.send(result);
    });
});

app.get("/users/:id", (req, res) => {
    const { id } = req.params;

    User.findOne({_id: id}, (err, result) => {
        if(err){
            console.log(err);
        }

        res.send(result);
    });
});

app.post("/users", (req, res) => {
    if(!req.body) return res.sendStatus(400);

    console.log(req.body);
    let user = new User({firstName: req.body.firstName, lastName: req.body.lastName, age: req.body.age});

    user.save((err, user) => {
        if(err){
            console.log(err);
        }

        console.log("user saved", user);
    });

    res.send(user);
});

app.put("/users/:id", (req, res) => {
    const {id} = req.params;
    const userFirstName = req.body.firstName;
    const userLastName = req.body.lastName;
    const userAge = req.body.age;

    const newUser = {firstName: userFirstName, lastName: userLastName, age: userAge};

    User.findByIdAndUpdate({_id: id}, newUser, {new: true},(err, result) => {
        if(err) console.log(err);

        res.send(result);
    });
});

app.delete("/users/:id", (req, res) => {
    const {id} = req.params;

    User.deleteOne({_id: id}, (err, result) => {
        if(err){
            console.log(err);
        }

        res.send(result);
    });
});

app.listen(3000, () => {
    console.log("server is start...");
});