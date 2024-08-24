require("dotenv").config();
const express = require("express");
const sequelize = require("./config/connection");

const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;
const session = require("express-session");
const { create } = require("express-handlebars");
const helpers = require("./utils/helpers");
const routes = require("./controllers");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const hbs = create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(
  session({
    secret: process.env.DB_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {},
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(routes);
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
