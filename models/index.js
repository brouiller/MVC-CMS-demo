// import models
const User = require('./User');
const Post = require("./Post");
const Comment = require("./Comment");

//define relationships between tables
Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

module.exports = {
  User,
  Comment,
  Post
};
