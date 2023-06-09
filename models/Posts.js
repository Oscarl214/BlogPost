const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Posts extends Model {}

Posts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    post_title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    contents: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creator_name:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    date_created: {
        type:DataTypes.DATE,
        allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user", // Capitalize "User"
        key: "id",
      }
    }
    
    },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "posts",
  }
);

module.exports= Posts;