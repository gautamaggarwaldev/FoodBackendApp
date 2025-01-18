const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverConfig');
const UnAuthorizedError = require('../utils/UnAuthorizedError');

async function isLoggedIn(req, res, next) {
    const token = req.cookies["authToken"];
    if (!token) {
        return res.status(401).json({
            success: false,
            error: "Not Authenticated",
            message: "Auth token doen not provide",
            success: false
        });
    }



    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if(!decoded) {
            throw new UnAuthorizedError();
        }
        // if reached here then user is authenticated allow them to access the apis
        req.user = {
            email: decoded.email,
            id: decoded.id,
            role: decoded.role
        }
    
        next();
    }
    catch(error) {
        return res.status(400).json({
            success: false,
            data: {},
            message: "Invalid token provided",
            error: error
        });
    }
    
}


// this function checks if the authenticated user is admin or not ?
// because we call isAdmin after isLoggedIN thats why we will receive user details
function isAdmin(req, res, next) {
    const loggedInUser = req.user;
    if (loggedInUser.role === "ADMIN") {
        next();
    }
    else {
        return res.status(401).json({
            success: true,
            message: "You are not authorised for this action",
            data: {},
            error: {
                reason: "Unauthorized user for this action",
                statusCode: 401
            }
        })
    }
}

module.exports = {
    isLoggedIn,
    isAdmin
}


