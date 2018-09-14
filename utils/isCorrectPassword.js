
const bcrypt = require("bcrypt");
const User = require("../models/User");

/** 
 * Checks if the user's password matches the password inputted.
 * 
 * @param password Inputted password
 * @param hash Hashed password
 *  
 */
const isCorrectPassword = (password, hash) => {

    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, result) => {
            
            resolve(result);
        });
    });
};   

module.exports = isCorrectPassword;