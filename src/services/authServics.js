const { findUser } = require("../repositories/userRepository.js");
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('../config/serverConfig.js')

async function loginUser(authDetails) {
    const email = authDetails.email;
    const plainPasssword = authDetails.password;

    // 1. check the user with the registered email
    const user = await findUser({email});

    if(!user) {
        throw {message: "No user is found with this email", statusCode: 404};
    }

    // 2. If the user is found then we compare the plain password with hashed password
    const isPasswordValidate = await bcrypt.compare(plainPasssword, user.password);

    if(!isPasswordValidate) {
        throw {message: "Invalid password please try again!!", statusCode: 401};
    }


    const userRole = user.role ? user.role : "USER";

    // 3. If the password is validate then create a JWT token
    const token = jwt.sign({email: user.email, id: user._id, role: userRole}, JWT_SECRET, {expiresIn: JWT_EXPIRY})
    return token;
}

module.exports = {
    loginUser
}