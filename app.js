const mongoose = require('mongoose');
const express = require('express');
const userRouter = require('./routers/users');
const commnetRouter = require('./routers/comments');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

mongoose.connect('mongodb://localhost:27017/testDb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB succesfully connected'))
  .catch((err) => console.log(err));

app.use('/users', userRouter);
app.use('/comments', commnetRouter);

app.listen(3000, () => {
  console.log('server is start...');
});
