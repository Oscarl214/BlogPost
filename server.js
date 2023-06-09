const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("images"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "images")));

app.use(routes);

app.get("/static", (req, res) => {
  res.render("static");
});

app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  imageList = [];
  imageList.push({ src:"/images/Blog.png", name: "logo" });
  res.render("/", { imageList: imageList });
});



sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
