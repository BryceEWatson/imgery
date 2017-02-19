require('lasso/node-require-no-op').enable('.less');
const express = require('express');
const upload = require('./api/upload');
const home = require('./src/pages/home');
const path = require('path');
const fileUpload = require('express-fileupload');

let app = express();
const lassoOptions = require('./config/lasso-config');
app.use(require('lasso/middleware').serveStatic(lassoOptions));
app.use(fileUpload());
app.post('/api/upload', upload.upload);
app.use('/', home);
app.listen(8080);
