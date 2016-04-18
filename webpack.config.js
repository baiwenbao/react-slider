"use strict";
let path = require('path');
let fs = require('fs');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let webpack = require('webpack');
let ip = require('ip');
let localIp = ip.address();

let getEntries = (function () {
    let _entries = {};
    let _basePath = path.join(__dirname, './src/app/');
    let _entryFile = 'app.js';
    let _dirs = fs.readdirSync(_basePath);
    _dirs.forEach(function (dir) {
        let _path = path.join(_basePath, dir, _entryFile);
        if (fs.existsSync(_path)) {
            _entries[dir] = ['webpack/hot/dev-server', 'webpack-dev-server/client?http://localhost:8080', _path];
        }
    });
    return _entries;
})();


module.exports = {
    devtool: "source-map",
    entry: getEntries,
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
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
                loader: "url?name=[path][name].[ext]&limit=8192"
            }]
    },
    resolve: {
        extensions: ['', '.js', '.scss'],
        externals: {
            // require("jquery") 是引用自外部模块的
            // 对应全局变量 jQuery
            //            "jquery": "jQuery"
        },
        alias: { //模块别名定义，方便后续直接引用别名，无须多写长长的地址
            //            AppStore: 'js/stores/AppStores.js' 后续直接 require('AppStore') 即可
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("[name]/[name].bundle.css")
        /*new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'commons.js',
            chunk: ['./src/vendor/app.js']
        })*/
    ]
}