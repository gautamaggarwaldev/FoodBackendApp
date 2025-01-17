const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverConfig');

async function isLoggedIn(req, res, next) {
    const token = req.cookies["authToken"];
    if(!token) {
        return res.status(401).json({
            success: false,
            error: "Not Authenticated",
            message: "Auth token doen not provide",
            success: false
        });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if(!decoded) {
        return res.status(400).json({
            success: false,
            data: {},
            message: "Invalid token provided",
            error: "Not Authenticated"
        });
    }


    // if reached here then user is authenticated allow them to access the apis

    req.user = {
        email: decoded.email,
        id: decoded.id
    }

    next();
}

module.exports = {
    isLoggedIn
}


