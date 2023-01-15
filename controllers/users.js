const crypto = require('crypto');
const User = require('../models/user');
const { userCreateValidation, userUpdateValidation } = require('../validations/usersValidation');

const salt = '5d9afb187818d05848770d0c804a7f1f';

const getUsers = (async (req, res, next) => {
  try {
    const data = await User.find();

    res.json(data);
  } catch (err) {
    next(err);
  }
});

const getUser = (async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await User.findOne({ _id: id });

    if (!data) {
      throw new Error('User not found');
    }

    res.send(data);
  } catch (err) {
    next(err);
  }
});

const createUser = (async (req, res, next) => {
  try {
    const { body } = req;

    if (!body) {
      throw new Error('Body required');
    }

    const value = await userCreateValidation(body);

    value.password = crypto.pbkdf2Sync(value.password, salt, 1000, 64, 'sha512').toString('hex');

    const user = await User.create(value);

    res.json(user);
  } catch (err) {
    next(err);
  }
});

const updateUser = (async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const value = await userUpdateValidation(body);

    const updated = await User.findByIdAndUpdate(id, value, { new: true });

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

const deleteUser = (async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await User.deleteOne({ _id: id });

    res.json(deleted);
  } catch (err) {
    next(err);
  }
});

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
