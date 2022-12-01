const User = require('../models/user');

const authorization = (async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
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
