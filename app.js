const mongoose = require('mongoose');
const express = require('express');
// const User = require('./models/user');
// const { userValidation } = require('./validations/dataValidation');
const userRouter = require('./routers/users');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

mongoose.connect('mongodb://localhost:27017/testDb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB succesfully connected'))
  .catch((err) => console.log(err));

app.use('/users', userRouter);

// app.get('/users', async (req, res) => {
//     try{
//       const data = await User.find();

//       res.send(data);
//     }catch(err){
//         res.status(500).send(err);
//     }
// });

// app.get('/users/:id', async (req, res) => {
//     try{
//       const {id} = req.params;
//       const data = await User.findOne({_id: id});

//       res.send(data);
//     }catch(err){
//       res.status(500).send(err);
//     }
// });

// app.post('/users', async (req, res) => {
//     try{
//       const {body} = req;

//       if(!body){
//         return res.sendStatus(400);
//       }

//       const {error, value: createParams} = userValidation(body);

//       if(error){
//         return res.status(400).send(error);
//       }

//       const user = await User.create(createParams);

//       res.send(user);
//     }catch(err){
//       res.status(500).send(err);
//     }
// });

// app.put('/users/:id', async (req, res) => {
//     try{
//       const {id} = req.params;
//       const {body} = req;

//       const {error, value: updateParams} = userValidation(body);

//       if(error){
//         return res.status(400).send(error);
//       }

//       const updateUser = await User.findByIdAndUpdate(id, updateParams, {new: true});

//       res.send(updateUser);
//     }catch(err){
//       res.status(500).send(err);
//     }
// });

// app.delete('/users/:id', async (req, res) => {
//   try{
//     const {id} = req.params;

//     const deleted = await User.deleteOne({_id: id});

//     res.send(deleted);
//   }catch(err){
//     res.status(500).send(err);
//   }
// });

app.listen(3000, () => {
  console.log('server is start...');
});
