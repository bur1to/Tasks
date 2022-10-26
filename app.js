const mongoose = require("mongoose");
const User = require("./models/user.js");
const {userValidation} = require("./validations/dataValidation.js");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded());

mongoose.connect("mongodb://localhost:27017/testDb", {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("MongoDB succesfully connected"))
.catch((err) => console.log(err));

app.get("/users", (req, res) => {
    User.find()
    .then((data) => res.send(data));
});

app.get("/users/:id", (req, res) => {
    const {id} = req.params;

    User.findOne({_id: id})
    .then((data) => res.send(data));
});

app.post("/users", (req, res) => {
    if(!req.body){
        return res.sendStatus(400);
    }

    const {body} = req;

    const {error, value: createParams} = userValidation(body);

    if(error){
      res.status(400).send(error);
    }


    let user = new User(createParams);

    user.save()
    .then(() => console.log("User saved"));

    res.send(user);
});

app.put("/users/:id", (req, res) => {
    const {id} = req.params;
    const {body} = req;

    const {error, value: updateParams} = userValidation(body);

    if(error){
      res.status(400).send(error);
    }

    User.findByIdAndUpdate(id, updateParams, {new: true})
    .then((data) => res.send(data));
});

app.delete("/users/:id", (req, res) => {
    const {id} = req.params;

    User.deleteOne({_id: id})
    .then((deleted) => res.send(deleted));
});

app.listen(3000, () => {
    console.log("server is start...");
});
