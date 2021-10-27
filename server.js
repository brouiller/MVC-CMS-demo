//adding libraries
const express = require('express');
const routes = require('./controllers');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');

//put express into app and create a port
const app = express();
const PORT = process.env.PORT || 3001;

//sequelize session stuff
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: "Super duper secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use(session(sess));

//set up handlebars
const hbs = exphbs.create({helpers});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//let express use json, get info from urls, and set a static path to public
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

// sync sequelize models to the database, then turn on the server
sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
