const Comment = require('../models/comment');
const User = require('../models/user');
const { commentCreateValidation, commentUpdateValidation, commentGetValidation } = require('../validations/commentsValidation');

const getComments = (async (req, res, next) => {
  try {
    const { query } = req;
    const {
      page,
      limit,
      sort,
      sortBy
    } = await commentGetValidation(query);

    const sortOrder = sortBy === 'asc' ? 1 : -1;

    const count = await Comment.countDocuments();
    const data = await Comment.find({}, {
      comment: 1
    }).sort({ [sort]: sortOrder })
      .skip(page * limit)
      .limit(limit)
      .lean();

    const result = {
      data,
      count
    };

    res.send(result);
  } catch (err) {
    next(err);
  }
});

const getComment = (async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Comment.findOne({ _id: id });

    if (!data) {
      throw new Error('User does not exist');
    }

    res.send(data);
  } catch (err) {
    next(err);
  }
});

const createComment = (async (req, res, next) => {
  try {
    const { body } = req;

    const { userId } = req.body;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new Error('User does not exist');
    }

    const value = await commentCreateValidation(body);

    const created = await Comment.create(value);

    res.send(created);
  } catch (err) {
    next(err);
  }
});

const updateComment = (async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const { userId } = req.body;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new Error('User does not exist');
    }

    const value = await commentUpdateValidation(body);

    const updated = await Comment.findByIdAndUpdate({ _id: id }, value, { new: true });

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
