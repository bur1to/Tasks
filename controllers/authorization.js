const crypto = require('crypto');
const User = require('../models/user');

const authorization = (async (req, res, next) => {
  try {
    const { body } = req;

    const user = await User.findOne({ email: body.email });

    if (!user) {
      throw new Error('Incorrect email or password');
    }

    const salt = user.salt;
    const hashedPassword = crypto.pbkdf2Sync(body.password, salt, 1000, 64, 'sha512').toString('hex');

    if (user.password !== hashedPassword) {
      throw new Error('Incorrect email or password');
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
