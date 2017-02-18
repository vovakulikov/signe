/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Filters = function () {
    function Filters(imageData) {
        _classCallCheck(this, Filters);

        this.imageData = imageData;
        this._data = imageData.data;
        this._widthImage = imageData.width;
        this._heightImage = imageData.height;

        /*  this.LoG_mask = [
            [0,1,1,2,2,2,1,1,0],
            [1,2,4,5,5,5,4,2,1],
            [1,4,5,3,0,3,5,4,1],
            [2,5,3,-12,-24,-12,3,5,2],
            [2,5,0,-24,-40,-24,0,5,2],
            [2,5,3,-12,-24,-12,3,5,2],
            [1,4,5,3,0,3,5,4,1],
            [1,2,4,5,5,5,4,2,1],
            [0,1,1,2,2,2,1,1,0]
          ]
          this.LoG_mask = [
            [0,0,0,-1,-1,-2,-1,-1,0,0,0],
            [0,0,-2,-4,-8,-9,-8,-4,-2,0,0],
            [0,-2,-7,-15,-22,-23,-22,-15,-7,-2,0],
            [-1,-4,-15,-24,-14,-1,-14,-24,-15,-4,-1],
            [-1,-8,-22,-14,52,103,52,-14,-22,-8,-1],
            [-2,-9,-23,-1,103,180,103,-1,-23,-9,-2],
            [-1,-8,-22,-14,52,103,52,-14,-22,-8,-1],
            [-1,-4,-15,-24,-14,-1,-14,-24,-15,-4,-1],
            [0,-2,-7,-15,-22,-23,-22,-15,-7,-2,0],
            [0,0,-2,-4,-8,-9,-8,-4,-2,0,0],
            [0,0,0,-1,-1,-2,-1,-1,0,0,0]
        ]
        this.LoG_mask = [
            [0,1,0],
            [1,-4,1],
            [0,1,0]
        ]
            this.LoG_mask = [
            [-1,-2,-1],
            [0,0,0],
            [1,2,1]
        ]*/

        this.LoG_mask = [[0, 0, 1, 0, 0], [0, 1, 2, 1, 0], [1, 2, -16, 2, 1], [0, 1, 2, 1, 0], [0, 0, 1, 0, 0]];
        // console.log('Информация из конструктора ширина и высота', this._widthImage, this._heightImage)
    }

    _createClass(Filters, [{
        key: "convertToGray",
        value: function convertToGray() {
            var imageLength = this._widthImage * this._heightImage * 4;
            var d = this._data;
            for (var i = 0; i < imageLength; i += 4) {
                var red = d[i],
                    green = d[i + 1],
                    blue = d[i + 2];

                var gray = parseInt((red + green + blue) / 3);
                d[i] = d[i + 1] = d[i + 2] = gray;
            }

            return this;
        }
    }, {
        key: "invert",
        value: function invert() {
            var imageLength = this._widthImage * this._heightImage * 4;
            var d = this._data;

            for (var i = 0; i < imageLength; i += 4) {
                var red = d[i],
                    green = d[i + 1],
                    blue = d[i + 2];

                d[i] = 255 - red;
                d[i + 1] = 255 - green;
                d[i + 2] = 255 - blue;
            }

            return this;
        }
    }, {
        key: "sobelOperator",
        value: function sobelOperator() {
            var imageLength = this._widthImage * this._heightImage * 4;
            var d = this._data;
        }
    }, {
        key: "getCurrentPixel",
        value: function getCurrentPixel(x, y) {
            var correctPixel = (x + y * this._widthImage) * 4;
            var d = this._data;

            return [d[correctPixel], d[correctPixel + 1], d[correctPixel + 2], d[correctPixel + 3]];
        }
    }, {
        key: "setCurrentPixel",
        value: function setCurrentPixel(x, y, data) {
            var correctPixel = (x + y * this._widthImage) * 4;
            var d = this._data;
            d[correctPixel] = data[0];
            d[correctPixel + 1] = data[1];
            d[correctPixel + 2] = data[2];
            d[correctPixel + 3] = data[3];
        }
    }, {
        key: "getImageData",
        value: function getImageData() {
            return this.imageData;
        }
    }, {
        key: "customFilter",
        value: function customFilter(callback) {
            var cb = callback.bind(this);
            for (var i = 0; i < this._widthImage; i++) {
                for (var j = 0; j < this._heightImage; j++) {
                    var pixels = this.getCurrentPixel(i, j);
                    var settingPixel = cb(pixels);
                    this.setCurrentPixel(i, j, settingPixel);
                }
            }
        }
    }, {
        key: "overlayMask",
        value: function overlayMask(x, y) {
            var centerMask = (this.LoG_mask.length - 1) / 2;
            var relay = 0;

            for (var i = 0; i < this.LoG_mask.length; i++) {
                for (var j = 0; j < this.LoG_mask.length; j++) {

                    var infoAboutPixel = this.getCurrentPixel(x - centerMask + j, y - centerMask + i);
                    var R = void 0,
                        G = void 0,
                        B = void 0,
                        A = void 0;
                    //console.log(infoAboutPixel[0])
                    if (infoAboutPixel[0]) {
                        var _infoAboutPixel = _slicedToArray(infoAboutPixel, 4);

                        R = _infoAboutPixel[0];
                        G = _infoAboutPixel[1];
                        B = _infoAboutPixel[2];
                        A = _infoAboutPixel[3];
                    } else {
                        var _getCurrentPixel = this.getCurrentPixel(x, y);
                        //console.log('from getPxel',this.getCurrentPixel(x,y));


                        var _getCurrentPixel2 = _slicedToArray(_getCurrentPixel, 4);

                        R = _getCurrentPixel2[0];
                        G = _getCurrentPixel2[1];
                        B = _getCurrentPixel2[2];
                        A = _getCurrentPixel2[3];
                    }

                    //console.log( [R,G,B,A])
                    var bright = 0.299 * R + 0.587 * G + 0.114 * B;
                    relay += bright * this.LoG_mask[i][j];
                }
            }
            return relay;
        }
    }, {
        key: "LoGfilter",
        value: function LoGfilter() {
            var i = void 0,
                j = void 0;
            var r = [];
            for (i = 0; i < this._widthImage; i++) {
                r[i] = [];
                for (j = 0; j < this._heightImage; j++) {
                    var response = this.overlayMask(i, j);
                    // this.setCurrentPixel(i,j,[r,r,r,255])
                    r[i][j] = Math.round(response);
                }
            }
            console.log(r.concat([]));
            // if(r[i][j] > 0 && (r[i][j+1] < 0 || ))
            for (i = 0; i < r.length - 1; i++) {
                // console.log('dfs')

                for (j = 0; j < r[0].length; j++) {

                    /*  if(r[i][j]*r[i][j+1] < 0 || r[i][j]*r[i+1][j] < 0 || r[i][j]*r[i+1][j+1] < 0 ){
                        r[i][j] = 255
                    }
                    else {
                        r[i][j] = 0
                    }
                    if((r[i][j] > 0 && r[i][j+1] < 0) || (r[i][j] < 0 && r[i][j+1] > 0) ||
                       (r[i][j] > 0 && r[i+1][j] < 0) || (r[i][j] < 0 && r[i+1][j] > 0) ||
                       (r[i][j] > 0 && r[i+1][j+1] < 0) || (r[i][j] < 0 && r[i+1][j+1] > 0)
                    ){
                       if((r[i][j] < 0 && r[i][j+1] == 0)  ){
                           r[i][j] = 255;
                           //this.setCurrentPixel(i,j,[r[i][j],r[i][j],r[i][j],255]);
                       }
                      // r[i][j] = 255;
                       //console.log(r[i][j])
                     }
                    else {
                       r[i][j] = 0;
                       //this.setCurrentPixel(i,j,[r[i][j],r[i][j],r[i][j],128]);
                    }*/
                    //if(r[i][j]/(r[i][j]+1) )
                    this.setCurrentPixel(i, j, [r[i][j], r[i][j], r[i][j], 255]);
                    //  this.setCurrentPixel(i,j+1,[r[i][j+1],r[i][j+1],r[i][j+1],255]);
                    //console.log('somethidn')
                }
            }

            return this;
        }
    }, {
        key: "getMatrInf",
        value: function getMatrInf() {}
    }, {
        key: "brigFilter",
        value: function brigFilter(inform) {
            for (var i = 0; i < inform.length; i++) {
                for (var j = 0; j < inform[0].length; j++) {
                    this.setCurrentPixel(i, j, [inform[i][j], inform[i][j], inform[i][j], inform[i][j]]);
                }
            }
        }
    }, {
        key: "getBrightness",
        value: function getBrightness() {
            var brightnessMatrix = [];
            for (var i = 0; i < this._widthImage; i++) {
                brightnessMatrix[i] = [];
                for (var j = 0; j < this._heightImage; j++) {
                    var _getCurrentPixel3 = this.getCurrentPixel(i, j),
                        _getCurrentPixel4 = _slicedToArray(_getCurrentPixel3, 4),
                        R = _getCurrentPixel4[0],
                        G = _getCurrentPixel4[1],
                        B = _getCurrentPixel4[2],
                        A = _getCurrentPixel4[3];

                    var brightness = 0.299 * R + 0.587 * G + 0.114 * B;
                    brightnessMatrix[i][j] = Math.floor(brightness);
                }
            }
            return brightnessMatrix;
        }
    }]);

    return Filters;
}();

exports.default = Filters;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fileSelect = fileSelect;
exports.createImage = createImage;
exports.draw = draw;
exports.getInfoCanvas = getInfoCanvas;
function fileSelect(evt, callback) {
    //get list of current files
    return new Promise(function (resolve, reject) {
        var files = evt;
        //Пройдемся по массиву с файлами
        var length = files.length,
            i = void 0,
            f = void 0;
        // если файл не имеет формат изображения, то выброс
        f = files[0];
        if (!f.type.match('image.*')) {
            return;
        }

        //Создаем новый ридер для чтение файла изображение.
        var reader = new FileReader();
        //Читаем файл в виде dataUrl
        reader.readAsDataURL(f);

        //Загрузка файла
        reader.onload = function (e) {
            // console.log('Thats is eeeee', e)
            resolve(e.target.result);
        };
    });
}
function createImage(source) {
    return new Promise(function (resolve, reject) {
        var picture = new Image();
        picture.src = source;
        picture.onload = function () {
            resolve(picture);
        };
    });
}
function draw(canvas, img, type) {
    var canvasCopy = document.createElement("canvas");
    var copyContext = canvasCopy.getContext("2d");

    var ctx = canvas.getContext('2d');

    var ratio = 1;

    var options = {
        'drawImage': function drawImage() {
            if (img.width > 500) ratio = 500 / img.width;else if (img.height > 500) ratio = 500 / img.height;

            canvasCopy.width = img.width;
            canvasCopy.height = img.height;

            canvas.width = img.width * ratio;
            canvas.height = img.height * ratio;

            copyContext.drawImage(img, 0, 0);
            ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);
        },
        'paintPixels': function paintPixels() {
            // console.log(img)
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.putImageData(img, 0, 0);
        },
        'drawRAWImage': function drawRAWImage() {
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);
        },
        'paintPixelsToSizing': function paintPixelsToSizing() {

            if (img.width > 500) ratio = 800 / img.width;else if (img.height > 400) ratio = 400 / img.height;

            canvasCopy.width = img.width;
            canvasCopy.height = img.height;

            //canvas.width = img.width * ratio;
            //canvas.height = img.height * ratio;

            copyContext.putImageData(img, 0, 0);

            ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);
        }
    };
    options[type]();
}

function getInfoCanvas(canvas) {
    var ctx = canvas.getContext('2d');

    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _helpers = __webpack_require__(1);

var _filters = __webpack_require__(0);

var _filters2 = _interopRequireDefault(_filters);

__webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.querySelector('._show_image'); /**
                                                      * Created by Vova on 15.02.2017.
                                                      */

var fullCanvas = document.querySelector('._fullInfo');

var handler = function handler(evt) {
    (0, _helpers.fileSelect)(evt.target.files).then(function (data) {
        return (0, _helpers.createImage)(data);
    }).then(function (picture) {
        //console.log('Thats we get from fileselect promise', picture)
        (0, _helpers.draw)(canvas, picture, 'drawImage');
        (0, _helpers.draw)(fullCanvas, picture, 'drawRAWImage');
    });
};

function genHandler(evt) {
    var d = Date.now();
    //console.log(d)
    // console.log('Данные из свернутого холста (сжатого)', getInfoCanvas(canvas));
    //console.log('Данные из полноразмерного холста', getInfoCanvas(fullCanvas));
    var info = (0, _helpers.getInfoCanvas)(canvas);
    var filter = new _filters2.default(info);
    //let br = filter.getBrightness();
    filter.convertToGray().LoGfilter().invert();
    //filter.brigFilter(br);

    /*filter.customFilter(function([R,G,B,A]){
            return[0,24,240,255];
    })*/
    // filter.overlayMask()
    (0, _helpers.draw)(canvas, info, 'paintPixelsToSizing');
    console.log(Date.now() - d);

    info = (0, _helpers.getInfoCanvas)(canvas);
    // console.log('Постданные ',info);
}

document.querySelector(".input-file").addEventListener('change', handler, false);
document.querySelector('.getInfo').addEventListener('click', genHandler, false);
document.querySelector('.info').addEventListener('click', function (evt) {
    var d = Date.now();
    var info = (0, _helpers.getInfoCanvas)(canvas);
    var filter = new _filters2.default(info);
    filter.convertToGray();
    (0, _helpers.draw)(canvas, info, 'paintPixels');
    console.log(Date.now() - d);
    console.log('from image info ', info);
});
var target = document.querySelector(".drop-target");
target.addEventListener("dragover", function (e) {
    e.preventDefault();
}, true);
target.addEventListener("drop", function (e) {
    e.preventDefault();
    (0, _helpers.fileSelect)(e.dataTransfer.files).then(function (data) {
        return (0, _helpers.createImage)(data);
    }).then(function (picture) {
        //console.log('Thats we get from fileselect promise', picture)
        (0, _helpers.draw)(canvas, picture, 'drawImage');
        (0, _helpers.draw)(fullCanvas, picture, 'drawRAWImage');
    });
}, true); /**/

/***/ })
/******/ ]);