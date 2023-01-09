const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  userId: { type: String },
  comment: { type: String, minLength: 3, maxLength: 255 }
}, {
  collection: 'comments',
  versionKey: false
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
