var path = require("path");
module.exports = [
        {
            entry: {
                demo1 : "./demos/black-white-convert/grayImage.js",
                demo2 : "./demos/sobel_operator/sob_operator.js"
            },
            output: {
                path: path.resolve(__dirname, './demos/dist/'),
                filename: '[name].js'
            }
        },
        {
            entry: {
                index: "./src/app.js"
            },
            output: {
                path: path.resolve(__dirname, './src/'),
                filename: '[name].bundle.js'
            },
            module: {
                loaders: [
                    {
                        test: /\.jsx?$/,
                        exclude: /node_modules/,
                        loaders: ["babel-loader"]
                    }
                ]
            }
        }
    ]