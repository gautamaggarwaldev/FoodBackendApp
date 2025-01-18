const { createCart } = require("../repositories/cartRepository.js");
const { findUser, createUser } = require("../repositories/userRepository.js");

async function registerUser(userDetails) {
    // It will create a brand new user in the database

    //1. We need to check if the user with this email and mobile number is already exist or not.
    const user = await findUser({
        email: userDetails.email,
        mobileNumber: userDetails.mobileNumber
    });

    if (user) {
        // we found a user
        throw { reason: 'User with the give mobile number and email is already exist', statusCode: 400 }
    }

    //2. If not create the user in the database.
    const newUser = await createUser({
        email: userDetails.email,
        password: userDetails.password,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        mobileNumber: userDetails.mobileNumber
    });

    if (!newUser) {
        throw { reason: "Something went wrong, not create user", statusCode: 500 };
    }

    await createCart(newUser._id);
    
    //3. Return the details of the created user.
    return newUser;
}

module.exports = {
    registerUser
};