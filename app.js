const mongoose = require("mongoose");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded());

mongoose.connect("mongodb://localhost:27017/testDb", {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("MongoDB succesfully connected"))
.catch((err) => console.log(err));

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        name: String,
        firstName: String,
        lastName: String
    },
    age: Number
});

// const users = [
//     {
//         id: 1, 
//         name: "Tom",
//         age: "18"
//     },
//     {
//         id: 2,
//         name: "Kolya",
//         age: "90"
//     },
//     {
//         id: 3,
//         name: "Volodya",
//         age: "37"
//     }
// ];

app.get("/users", (req, res) => {
    res.send(users);
});

app.get("/users/:id", (req, res) => {
    const { id } = req.params;

    const user = users.find((el) => el.id === parseInt(id));
    
    res.send(user);
});

app.post("/users", (req, res) => {
    if(!req.body) return res.sendStatus(400);

    console.log(req.body);
    let user = {
        id: users.length+1,
        name: req.body.name,
        age: req.body.age
    }
    users.push(user);
    res.send(users);
});

app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const userName = req.body.name;
    const userAge = req.body.age;

    let index = users.findIndex((el) => el.id === parseInt(id));

    if(index >= 0){
        const user = users[index];
        user.name = userName;
        user.age = userAge;
        return res.send(user);
    }
    
    res.sendStatus(404);
});

app.delete("/users/:id", (req, res) => {
    const { id } = req.params;

    let index = users.findIndex((el) => el.id === parseInt(id));

    if(index >= 0){
        let user = users[index];
        users.splice(index, 1);
        return res.send(user);
    } 
    
    res.sendStatus(404);
});

app.listen(3000, () => {
    console.log("server is start...");
});