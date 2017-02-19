'use strict';
const path = require('path');

module.exports = {
    upload: (req, res) => {
        let photo = req.files.photo;
        photo.mv(path.join(__dirname, '../temp/photos/' + photo.name), (err) => {
            console.log(err);
            res.write('Photo uploaded');
            res.end();
        });
    }
}
