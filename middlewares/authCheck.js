/** 
 * Middleware to ensure user is authorized to access certain page. 
 */

const authCheck = (req, res, next) => {

    if (!req.user && !req.session.user) {
        res.status(401);
        res.redirect("/login");
    } else {
        next();
    }
};

module.exports = authCheck;