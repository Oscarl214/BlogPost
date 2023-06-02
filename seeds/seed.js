const sequelize = require('../config/connection');
const { User, POST, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postsData=require('./postsData.json')
const commentData=require('./commentsData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(postsData, {
    individualHooks: true,
    returning: true,
  })

  await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  
  process.exit(0);
};

seedDatabase();
