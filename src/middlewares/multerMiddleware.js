const multer = require('multer');
const path = require('path');

const storgeConfiguration = multer.diskStorage({
    destination: (req, res, next) => {
        next(null, 'uploads/')
    },
    filename: (req, file, next) => {
        console.log(file);
        next(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
});

const uploader = multer({storage: storgeConfiguration});

module.exports = uploader;