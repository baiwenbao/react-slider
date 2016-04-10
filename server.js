var webpack = require('webpack');
var webpackDevServer = require("webpack-dev-server");

var config = require("./webpack.config.js");
var compiler = webpack(config);
var server = new webpackDevServer(compiler, {
    //    conentBase: 'dist/',
    hot: true,
    quiet: true,
    open: 'http://localhost:8080/'
});
server.listen(8080);