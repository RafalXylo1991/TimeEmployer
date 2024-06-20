//auth.js
const session = require("express-session");

module.exports = requireAuth = async (req, res, next) => {
    console.log(req.session)
    if (req.session.userId) {
        next(); // User is authenticated, continue to next middleware
    } else {
        req.session.destroy(function (err) {
            if (err) {
                console.log(err);
            } else {
                return res.redirect('/');
            }
        })

    }
}