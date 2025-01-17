const { loginUser } = require("../services/authServics.js");

async function login(req, res) {
    try {
        const loginPayload = req.body;
        const response = await loginUser(loginPayload);

        res.cookie('authToken', response, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });
        
        return res.status(200).json({
            success: true,
            data: {},
            message: "Logged In Successfully!!",
            error: {}
            
        })
    }
    catch(error) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
            error: error,
            data: {}
        })
    }

}

module.exports = {
    login
}