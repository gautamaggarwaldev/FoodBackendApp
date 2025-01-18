const AppError = require("./appError");

class UnAuthorizedError extends AppError {
    constructor() {

        super(`User is not authorized properly`, 401);
    }
}

module.exports = UnAuthorizedError;