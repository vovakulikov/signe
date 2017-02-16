var path = require("path");
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var titles = {
    '_loadImage': "./demos/src/correct-filters/app.js",
    '_logFilter': "./demos/src/log-filters/app.js"
}
module.exports = [
      /*  {
            entry: {
                demo1 : "./demos/black-white-convert/grayImage.js",
                demo2 : "./demos/sobel_operator/sob_operator.js"
            },
            output: {
                path: path.resolve(__dirname, './demos/dist/'),
                filename: '[name].js'
            }
        },*/
       {
            entry: titles,
            output: {
                path: path.resolve(__dirname),
                filename: './demos/dist/[name]/index[name].bundle.js'
            },
            module: {
                loaders: [
                    {
                        test: /\.jsx?$/,
                        exclude: /node_modules/,
                        loaders: ["babel-loader"]
                    },
                    /*{
                        test: /\.html$/,
                        loader:'file-loader'
                    }*/
                ]

            }
        }
    ]
