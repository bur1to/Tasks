// const mongoose = require('mongoose');
const Comment = require('../models/comment');
const User = require('../models/user');
const { commentCreateValidation, commentUpdateValidation } = require('../validations/commentsValidation');

const getComments = (async (req, res, next) => {
  try {
    const data = await Comment.find();

    res.send(data);
  } catch (err) {
    next(err);
  }
});

const getComment = (async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Comment.findOne({ _id: id });

    if (data) {
      res.send(data);
    } else {
      res.send('Comment do not exist!');
    }
  } catch (err) {
    next(err);
  }
});

const createComment = (async (req, res, next) => {
  try {
    const { body } = req;

    if (!body) {
      throw new Error('Body required');
    }

    const { userId } = req.body;

    if (User.findOne({ _id: userId })) {
      const { value: createParams } = await commentCreateValidation(body);

      const created = await Comment.create(createParams);

      res.send(created);
    } else {
      res.send('User does not exist');
    }
  } catch (err) {
    next(err);
  }
});

const updateComment = (async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const { value: updateParams } = await commentUpdateValidation(body);

    const updated = await Comment.findByIdAndUpdate({ _id: id }, updateParams, { new: true });

    res.send(updated);
  } catch (err) {
    next(err);
  }
});

const deleteComment = (async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await Comment.deleteOne({ _id: id });

    res.send(deleted);
  } catch (err) {
    next(err);
  }
});

module.exports = {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment
};
