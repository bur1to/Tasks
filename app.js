const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded());

const users = [
    {
        id: 1, 
        name: "Tom",
        age: "18"
    },
    {
        id: 2,
        name: "Kolya",
        age: "90"
    },
    {
        id: 3,
        name: "Volodya",
        age: "37"
    }
];

app.get("/users", (req, res) => {
    res.send(users);
});

app.get("/users/:id", (req, res) => {
    let user = users.find(el => {
        const id = req.params.id;
        return el.id === parseInt(id);
    });
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
    const userName = req.body.name;
    const userAge = req.body.age;

    let index = users.findIndex(el => {
        const id = req.params.id;
        return el.id === parseInt(id);
    });

    if(index >= 0){
        const user = users[index];
        user.name = userName;
        user.age = userAge;
        return res.send(user);
    }
    
    res.sendStatus(404);
});

app.delete("/users/:id", (req, res) => {
    let index = users.findIndex(el => {
        const id = req.params.id;
        return el.id === parseInt(id);
    });

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