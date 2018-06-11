/** 
 * Middleware to ensure user is authorized to access certain page. 
 */

const authCheck = (req, res, next) => {

    console.log(req.user);
    console.log(req.session.id);
    if (!req.user) {
        res.status(401);
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = authCheck;