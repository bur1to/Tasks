const User = require('../models/user');
const bcrypt = require('bcrypt');

const authorization = (async (req, res, next) => {
  try {
    const { body } = req;

    const user = await User.findOne({ email: body.email});

    if (!user) {
      throw new Error('User with this email does not exist');
    }

    const validPass = bcrypt.compare(body.password, user.password);

    if (!validPass) {
      throw new Error('Invalid password');
    }

    const userData = {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`
    };

    res.send(userData);
  } catch (err) {
    next(err);
  }
});

module.exports = {
  authorization
};
