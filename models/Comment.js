// import important parts of sequelize library
const { Sequelize, Model, DataTypes } = require("sequelize");
// import database connection from connection.js
const sequelize = require("../config/connection");

//initialize comment model
class Comment extends Model {}

//set up fields for comment model
Comment.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Post",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "Comment",
  }
);

//export model
module.exports = Comment;
