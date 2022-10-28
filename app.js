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

app.get("/users", async (req, res) => {
    try{
      const data = await User.find();
      res.send(data);
    }catch(err){
        return res.status(500).send(err);
    }
});

app.get("/users/:id", async (req, res) => {
    try{
      const {id} = req.params;
      const data = await User.findOne({_id: id});
      res.send(data);
    }catch(err){
      return res.status(500).send(err);
    }
});

app.post("/users", async (req, res) => {
    try{
      if(!req.body){
        return res.sendStatus(400);
      }

      const {body} = req;

      const {error, value: createParams} = userValidation(body);

      if(error){
        return res.status(400).send(error);
      }


      let user = new User(createParams);
      const createUser = await user.save();
      res.send(createUser);
    }catch(err){
      return res.status(500).send(err);
    }
});

app.put("/users/:id", async (req, res) => {
    try{
      const {id} = req.params;
      const {body} = req;

      const {error, value: updateParams} = userValidation(body);

      if(error){
        return res.status(400).send(error);
      }

      const updateUser = await User.findByIdAndUpdate(id, updateParams, {new: true});
      res.send(updateUser);
    }catch(err){
      return res.status(500).send(err);
    }
});

app.delete("/users/:id", async (req, res) => {
  try{
    const {id} = req.params;

    const deleted = await User.deleteOne({_id: id});
    res.send(deleted);
  }catch(err){
    return res.status(500).send(err);
  }
});

app.listen(3000, () => {
    console.log("server is start...");
});
