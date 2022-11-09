const User = require('../models/user');
const { userCreateValidation } = require('../validations/usersValidation');
const { userUpdateValidation } = require('../validations/usersValidation');

const getUsers = (async (req, res, next) => {
  try {
    const data = await User.find();

    res.json(data);
  } catch (err) {
    next(new Error('Something went wrong!'));
  }
});

const getUser = (async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await User.findOne({ _id: id });

    res.json(data);
  } catch (err) {
    next(new Error('Something went wrong!'));
  }
});

const createUser = (async (req, res, next) => {
  try {
    const { body } = req;

    if (!body) {
      throw new Error('Body required');
    }

    const { value: createParams } = await userCreateValidation(body);

    const user = await User.create(createParams);

    res.json(user);
  } catch (err) {
    next(new Error('Something went wrong!'));
  }
});

const updateUser = (async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const { value: updateParams } = await userUpdateValidation(body);

    const update = await User.findByIdAndUpdate(id, updateParams, { new: true });

    res.json(update);
  } catch (err) {
    next(new Error('Something went wrong!'));
  }
});

const deleteUser = (async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await User.deleteOne({ _id: id });

    next(new Error('Something went wrong!'));

    res.json(deleted);
  } catch (err) {
    next(new Error('Something went wrong!'));
  }
});

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
