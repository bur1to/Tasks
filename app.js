const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const express = require('express');
const userRouter = require('./routers/users');
const commentRouter = require('./routers/comments');
const authRouter = require('./routers/authorization');
const swaggerDoc = YAML.load('./swagger/docs.yaml');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

mongoose.connect('mongodb://localhost:27017/testDb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB succesfully connected'))
  .catch((err) => console.log(err));

app.use('/users', userRouter);
app.use('/comment', commentRouter);
app.use('/auth', authRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(3000, () => {
  console.log('server is start...');
});
