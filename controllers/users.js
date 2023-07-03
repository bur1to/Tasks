const crypto = require('crypto');
const User = require('../models/user');
const { userCreateValidation, userUpdateValidation, userGetValidation } = require('../validations/usersValidation');

const getUsers = (async (req, res, next) => {
  try {
    const { query } = req;
    const {
      page,
      limit,
      sort,
      sortBy
    } = await userGetValidation(query);

    const sortOrder = sortBy === 'asc' ? 1 : -1;

    const count = await User.countDocuments();
    const users = await User.find({}, {
      firstName: 1,
      lastName: 1,
      email: 1,
      age: 1
    }).sort({ [sort]: sortOrder })
      .skip(page * limit)
      .limit(limit)
      .lean();

    const result = {
      users,
      count
    };

    res.json(result);
  } catch (err) {
    next(err);
  }
});

const getUser = (async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await User.findOne({ _id: id }, {
      firstName: 1,
      lastName: 1,
      email: 1,
      age: 1
    });

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

    const createParams = await userCreateValidation(body);
    const salt = crypto.randomBytes(16).toString('hex');

    createParams.password = crypto.pbkdf2Sync(createParams.password, salt, 1000, 64, 'sha512').toString('hex');
    createParams.salt = salt;
    const user = await User.create(createParams);

    res.json(user);
  } catch (err) {
    next(err);
  }
});

const updateUser = (async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const updateParams = await userUpdateValidation(body);

    if (body.password) {
      const salt = crypto.randomBytes(16).toString('hex');

      updateParams.password = crypto.pbkdf2Sync(updateParams.password, salt, 1000, 64, 'sha512').toString('hex');
      updateParams.salt = salt;
    }

    const updated = await User.findByIdAndUpdate(id, updateParams, { new: true });

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
