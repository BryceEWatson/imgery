const React = require('react');
const createStore = require('redux').createStore;
const Provider = require('react-redux').Provider;
const render = require('react-dom').render;
const homeReducer = require('../../reducers/home');
const homeApp = require('../../containers/home-app');

const preloadedState = window.__PRELOADED_STATE__;
console.log(preloadedState);
const store = createStore(homeReducer, preloadedState);

render(React.createElement(Provider, {store}, React.createElement(homeApp)),
    document.getElementById('main'));
