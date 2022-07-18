const multer = require('multer');

const MIME_TYPE = {
'image/jpg': 'jpg',
'image/jpeg': 'jpeg',
'image/png': 'png'
};

// Package de gestion de fichiers - Multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split('.')[0].split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + '_' + Date.now() + '.' + extension);
    }
})

module.exports = multer({ storage }).single('image');