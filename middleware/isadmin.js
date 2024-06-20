//isadmin.js
const { knex } = require('../config/knex');
module.exports = requireAuth = async (req, res, next) => {
  console.log(req.session)
  const user = await knex('users').select('*').where('id', req.session.userId).first();
  if (user.isadmin) {
    next(); // User is authenticated, continue to next middleware
  } else {
    return res.redirect('/dashboard');
  }
}