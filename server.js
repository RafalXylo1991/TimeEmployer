//server.js
const express = require("express")
require('dotenv').config({ path: './config/.env' })
const bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
const { sessionStore, session } = require('./config/session_config')
const knexfile = require('./config/knexfile');
const knex = require('knex')(knexfile.development)
const router = require('./routes/users')
const app = express();
const workersRoutes = require('./routes/workers'); // Import tras


app.use(express.static('public'))
app.set('view engine', 'ejs');
app.set('layout extractScripts', true)
app.set('layout extractStyles', true)
app.set('layout', 'layout/layout');
app.use(expressLayouts);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);


app.use(session({
  store: sessionStore,
  secret: 'cycki',
  resave: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  saveUninitialized: false,
}
));

app.use('/', router)
app.use('/workers', workersRoutes); // Użycie tras dla endpointu '/workers'
app.listen(3000, () => {
  console.log('Listening on port ' + process.env.PORT);
});