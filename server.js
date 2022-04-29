const path = require("path");
const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});
const app = express();
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const PORT = process.env.PORT || 3001;
const sess = {
  secret: "DB_SECRET",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
// turn on routes
app.use(routes);

// turn on connection to db and server | force: true recreates the tables
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
