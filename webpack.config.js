"use strict";
let path = require('path');
let fs = require('fs');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

let getEntries = function () {
    let _entries = {};
    let _basePath = path.join(__dirname, './src/app/');
    let _entryFile = 'app.js';
    let _dirs = fs.readdirSync(_basePath);
    _dirs.forEach(function (dir) {
        let _path = path.join(_basePath, dir, _entryFile);
        if (fs.existsSync(_path)) {
            _entries[dir] = _path;
        }
    });
    return _entries;
}


module.exports = {
    devtool: "source-map",
    devServer: {
        'content-base': '/'
    },
    entry: getEntries(),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]/[name].bundle.js'
    },
    module: {
        loaders: [{
                test: /\.js$/,
                loader: 'babel?presets[]=react,presets[]=es2015,presets[]=stage-0',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap')
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }]
    },
    resolve: {
        extensions: ['', '.js', '.scss']
    },
    plugins: [
        new ExtractTextPlugin("[name]/[name].bundle.css"),
    ]
}