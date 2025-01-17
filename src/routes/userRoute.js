// Resource - User
const express = require('express');
const { createUser } = require('../controllers/userController.js');

// We have to initialise the router object to add routes in a new file
// Riuters are used to segreggating your router in different modules
const userRouter = express.Router();

userRouter.post('/', createUser); // This is a route registration

module.exports =  userRouter; // exporting the router 
