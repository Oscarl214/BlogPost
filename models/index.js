const User = require('./User');
const Comment = require('./Comments');
const Post = require('./Posts');

User.hasMany(Comment, {
  foreignKey: "user_id"
});

User.hasMany(Post, {
  foreignKey: "user_id"
});

Comment.belongsTo(User, {
  foreignKey: "user_id"
});

Post.belongsTo(User, {
  foreignKey: "user_id"
});

module.exports = { User, Comment, Post };

