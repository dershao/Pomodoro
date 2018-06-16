
/** 
 * Check if there is a user currently logged in. 
 */

const sessionCheck = (req, res, next) => {

    //session could be made expresss-session or passport
    if (req.session.user || req.user) {
        res.redirect('/home');
    } else {
        next();
    }
};

module.exports = sessionCheck; 