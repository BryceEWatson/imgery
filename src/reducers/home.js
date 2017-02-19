'use strict';
const combineReducers = require('redux').combineReducers;
const update = require('immutability-helper');

function home(state, action) {
    if (!state) {
        state = require('../pages/home/initial-state.js');
    }
    return state;
}

module.exports = combineReducers({
    home: home
});
