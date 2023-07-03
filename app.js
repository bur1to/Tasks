const mongoose = require('mongoose');
const cors = require('cors');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const userRouter = require('./routers/users');
const commentRouter = require('./routers/comments');
const authRouter = require('./routers/authorization');

const swaggerDoc = YAML.load('./swagger/docs.yaml');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect('mongodb://172.18.0.3:27017/testDb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB succesfully connected'))
  .catch((err) => console.log(err));

app.use('/users', userRouter);
app.use('/comments', commentRouter);
app.use('/auth', authRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(3000, () => {
  console.log('server is start...');
});
