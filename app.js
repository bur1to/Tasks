const mongoose = require("mongoose");
const User = require("./model/user.js");
const {userValidation} = require("./validations/dataValidation.js");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded());

mongoose.connect("mongodb://localhost:27017/testDb", {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("MongoDB succesfully connected"))
.catch((err) => console.log(err));

app.get("/users", (req, res) => {
    User.find((err, result) => {
        if(err) console.log(err);

        res.send(result);
    });
});

app.get("/users/:id", (req, res) => {
    const {id} = req.params;

    User.findOne({_id: id}, (err, result) => {
        if(err){
            console.log(err);
        }

        res.send(result);
    });
});

app.post("/users", (req, res) => {
    if(!req.body){
        return res.sendStatus(400);
    }
    
    const {firstName, lastName, age} = req.body;

    const {error} = userValidation(req.body);

    if(error){ 
        return res.status(400).send(error);
    }

    let user = new User({firstName, lastName, age});

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
    const {firstName, lastName, age} = req.body;

    const {error} = userValidation(req.body);
    
    if(error){
        return res.status(400).send(error);
    }

    const newUser = {firstName, lastName, age};

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