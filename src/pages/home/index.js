'use strict';
const renderToString = require('react-dom/server').renderToString;
const React = require('react');
const createStore = require('redux').createStore;
const Provider = require('react-redux').Provider;
const homeReducer = require('../../reducers/home.js');
const homeApp = require('../../containers/home-app');
const path = require('path');
const lasso = require('lasso');
const fs = require('fs');
const hbs = require('handlebars');
const Promise = require('promise');
const lassoConfig = require('../../../config/lasso-config.json');
const initialState = require('./initial-state');

function getReactElement(store) {
    return React.createElement(Provider, {
        store
    },
    React.createElement(homeApp));
}

function renderFullPage(req, reactBody, preloadedState){
    return new Promise((resolve, reject) => {
        const mLasso = lasso.create(lassoConfig);
        return mLasso.lassoPage({
            pageName: 'home',
            packagePath: path.join(__dirname, './browser.json')
        },
        function(err, result) {
            if (err) {
                return err;
            }
            const templatePath = path.join(__dirname, './home.hbs');
            const hbsSource = fs.readFileSync(templatePath, {
                encoding: 'utf-8'
            });
            const template = hbs.compile(hbsSource);
            const html = template({
                lassoHead: result.getHeadHtml(),
                lassoBody: result.getBodyHtml(),
                reactBody: reactBody,
                preloadedState: JSON.stringify(preloadedState)
            });
            return resolve(html);
        });
    });
}

module.exports = (req, res) => {
    const stateData = {
        home: initialState
    };
    const store = createStore(homeReducer, stateData);
    const reactBody = renderToString(getReactElement(store));

    renderFullPage(req, reactBody, stateData).then((html) => {
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
            res.setHeader('Expires', '0');
            res.write(html);
            res.end();
    }).catch((err) => {
        console.log(err);
    });
}
