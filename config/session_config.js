require('dotenv').config()

const session = require('express-session');
const pgsession = require('connect-pg-simple')(session);
const PostgresqlStore = pgsession;

const sessionStore = new PostgresqlStore({
  conString: "postgres://" + process.env.PG_USER + ":" + process.env.PG_PASSWORD + "@localhost:5433/" + process.env.PG_DATABASE,
});

session({
  store: sessionStore,
  secret: 'cycki',
  resave: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  saveUninitialized: false,
}
)

module.exports = {
  pgsession,
  sessionStore,
  PostgresqlStore,
  session
}
