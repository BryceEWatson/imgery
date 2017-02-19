'use strict';
require('./style.less');
const React = require('react');
const connect = require('react-redux').connect;
const e = React.createElement;

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let children = [];
        children.push(e('input', {
            key: 'i',
            type: 'file',
            id: 'form-file-input',
            name: 'photo'
        }));
        children.push(e('button', {
            key: 'b',
            type: 'submit',
            id: 'form-file-submit'
        }, 'Upload Photo'));
        return e('form', {
            className: 'app-home',
            encType: 'multipart/form-data',
            id: 'form-uploader',
            method: 'POST',
            action: '/api/upload'
        }, children);
    }
}

function mapStateToProps(state) {
    return state;
}

module.exports = connect(mapStateToProps)(App);
