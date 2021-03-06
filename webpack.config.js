var path = require("path");
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var titles = {
   // '_loadImage': "./demos/src/correct-filters/app.js",
    '_logFilter': "./demos/src/log-filters/_app.js"
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
            entry: {
                app: path.resolve(__dirname, './demos/src/log-filters/js/_app.js'),
               // worker:  path.resolve(__dirname, './demos/src/log-filters/worker.js')
                // 'vendor.js': 'chart.js'
            },
            output: {
                path: path.resolve(__dirname, './demos/dist/_logFilter'),
                publicPath:'/static/',
                filename: '[name].bundle.js'
            },
            module: {
                loaders: [
                    {
                        test: /\.jsx?$/,
                        exclude: /node_modules/,
                        loaders: ["babel-loader"]
                    },
                    {
                        test: /\.css?$/,
                        exclude: /node_modules/,
                        loader:  ExtractTextPlugin.extract({fallback:'style-loader',
                                                            use: 'css-loader'})
                    },
                    {
                        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                        loader:  'file-loader?name=[name].[ext]'
                    }
                    /*{
                        test: /\.html$/,
                        loader:'file-loader'
                    }*/
                ]

            },
           plugins: [
               new ExtractTextPlugin({
                   filename:"critical.css"
               }),
               new webpack.LoaderOptionsPlugin({
                   options: {
                       worker: {
                           output: {
                               filename: "./workers/[name].worker.js",
                               chunkFilename: "[id].hash.worker.js"
                           }
                       }
                   }

               }),

              //new webpack.optimize.UglifyJsPlugin({minimize: true}),
              //new webpack.optimize.CommonsChunkPlugin({name:"vendor",filename:"vendor.bundle.js"})
           ],
           devServer: {
               contentBase: "./demos/dist/_logFilter/",
               hot: false
           },
           watch: true
        }
    ]
