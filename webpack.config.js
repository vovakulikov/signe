var path = require("path");
module.exports = [
        {
            entry: {
                demo1 : "./demos/black-white-convert/grayImage.js",
                demo2 : "./demos/sobel_operator/sob_operator.js"
            },
            output: {
                path: path.resolve(__dirname, './demos/src/'),
                filename: '[name].js'
            }
        },
        {
            entry: {
                index: "./index.js"
            },
            output: {
                path: path.resolve(__dirname, './src/'),
                filename: '[name].js'
            }
        }
    ]