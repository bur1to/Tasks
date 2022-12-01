const User = require('../models/user');

const authorization = (async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      throw new Error('Incorrect email or password');
    }

    res.send(user.id);
  } catch (err) {
    next(err);
  }
});

module.exports = {
  authorization
};
