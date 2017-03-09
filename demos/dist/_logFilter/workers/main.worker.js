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
/******/ 	__webpack_require__.p = "/static/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
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
          ]*/
        /*
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
        ]*/
        /*
        
                this.LoG_mask = [
                    [-1,-2,-1],
                    [0,0,0],
                    [1,2,1]
                ]
         */
        this.LoG_mask = [[0, 0, 1, 0, 0], [0, 1, 2, 1, 0], [1, 2, -16, 2, 1], [0, 1, 2, 1, 0], [0, 0, 1, 0, 0]];
        // console.log('Информация из конструктора ширина и высота', this._widthImage, this._heightImage)
    }

    _createClass(Filters, [{
        key: 'convertToGray',
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
        key: 'invert',
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
        key: 'sobelOperator',
        value: function sobelOperator() {
            var imageLength = this._widthImage * this._heightImage * 4;
            var d = this._data;
        }
    }, {
        key: 'getCurrentPixel',
        value: function getCurrentPixel(x, y) {
            var correctPixel = (x + y * this._widthImage) * 4;
            var d = this._data;

            return [d[correctPixel], d[correctPixel + 1], d[correctPixel + 2], d[correctPixel + 3]];
        }
    }, {
        key: 'setCurrentPixel',
        value: function setCurrentPixel(x, y, data) {
            var correctPixel = (x + y * this._widthImage) * 4;
            var d = this._data;
            d[correctPixel] = data[0];
            d[correctPixel + 1] = data[1];
            d[correctPixel + 2] = data[2];
            d[correctPixel + 3] = data[3];
        }
    }, {
        key: 'getImageData',
        value: function getImageData() {
            return this.imageData;
        }
    }, {
        key: 'customFilter',
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
        key: 'overlayMask',
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
        key: 'pullInfoconsole',
        value: function pullInfoconsole() {
            var r = [];
            for (var i = 0; i < this._widthImage; i++) {
                r[i] = [];
                for (var j = 0; j < this._heightImage; j++) {
                    r[i][j] = this.getCurrentPixel(i, j);
                }
            }
            // console.log('GetInformPixels',r)
        }
    }, {
        key: 'LoGfilter',
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
            // console.log('Che',r.concat([]));
            // if(r[i][j] > 0 && (r[i][j+1] < 0 || ))
            for (i = 0; i < r.length - 1; i++) {
                // console.log('dfs')

                for (j = 0; j < r[0].length; j++) {

                    if (r[i][j] <= 0) {
                        r[i][j] = 0;
                    } else {
                        r[i][j] = r[i][j] >= 255 ? 255 : r[i][j];
                        //r[i][j] = ( r[i][j]/80 >= 255)? 255 : 0;
                    }
                    /*
                    if(r[i][j]*r[i][j+1] < 0 ){
                        r[i][j] = 255;
                    }
                    else {
                        r[i][j] = 0;
                    }*/
                    this.setCurrentPixel(i, j, [r[i][j], r[i][j], r[i][j], 255]);
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
                    // this.setCurrentPixel(i,j,[r[i][j],r[i][j],r[i][j],255]);
                    //  this.setCurrentPixel(i,j+1,[r[i][j+1],r[i][j+1],r[i][j+1],255]);
                    //console.log('somethidn')
                }
            }
            console.log('sdfsdfsdf', r);
            /* for(i = 0; i < r.length-1; i++) {
                 // console.log('dfs')
                   for (j = 0; j < r[0].length-1; j++) {
                     if(r[i][j]*r[i][j+1] < 0  || r[i][j]*r[i+1][j+1] < 0 || r[i][j]*r[i+1][j] < 0 ){
                         r[i][j] = 255;
                     }
                     else {
                         r[i][j] = 0;
                     }
                     this.setCurrentPixel(i,j,[r[i][j],r[i][j],r[i][j],255]);
                 }
             }*/

            return this;
        }
    }, {
        key: 'getMatrInf',
        value: function getMatrInf() {}
    }, {
        key: 'brigFilter',
        value: function brigFilter(inform) {
            for (var i = 0; i < inform.length; i++) {
                for (var j = 0; j < inform[0].length; j++) {
                    this.setCurrentPixel(i, j, [inform[i][j], inform[i][j], inform[i][j], inform[i][j]]);
                }
            }
        }
    }, {
        key: 'getBrightness',
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
    }, {
        key: 'getGistogrammInfo',
        value: function getGistogrammInfo() {
            var d = this._data;
            var ar = [];
            for (var i = 0; i < this._widthImage; i++) {
                for (var j = 0; j < this._heightImage; j++) {
                    var _getCurrentPixel5 = this.getCurrentPixel(i, j),
                        _getCurrentPixel6 = _slicedToArray(_getCurrentPixel5, 4),
                        R = _getCurrentPixel6[0],
                        G = _getCurrentPixel6[1],
                        B = _getCurrentPixel6[2],
                        A = _getCurrentPixel6[3];

                    var bright = Math.floor(0.299 * R + 0.587 * G + 0.114 * B);
                    ar[bright] = ar[bright] ? ar[bright] + 1 : 1;
                }
            }
            for (var _i = 0; _i <= 255; _i++) {
                ar[_i] = ar[_i] ? ar[_i] : 0;
            }
            return ar;
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
exports.getRation = getRation;
exports.throttle = throttle;
exports.convertTo = convertTo;
exports.draw = draw;
exports.getInfoCanvas = getInfoCanvas;
exports.removeMany = removeMany;
exports.qs = qs;
exports.$on = $on;
exports.$delegate = $delegate;
exports.$removeEvent = $removeEvent;
exports.$off = $off;
exports.closest = closest;
exports.getAverageRGB = getAverageRGB;
var fixOrientation = __webpack_require__(5);

function fileSelect(evt, callback) {
    //get list of current files
    return new Promise(function (resolve, reject) {
        var files = evt;
        //Пройдемся по массиву с файлами
        // если файл не имеет формат изображения, то выброс
        var f = files[0];
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
            fixOrientation(e.target.result, { img: true }, function (data, image) {
                resolve({ data: data, file: f });
            });
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
function getRation(img, width) {
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 650;

    var ratio = 1;

    if (img.height > height) ratio = height / img.height;else if (img.width > width) {
        ratio = width / img.width;
    }

    //var ratio = (ratioH > ratioW)? ratioW: ratioH;
    return ratio;
}

//Тормоз-функция.
function throttle(func, ms) {

    var isThrottled = false,
        savedArgs,
        savedThis;

    function wrapper() {

        if (isThrottled) {
            // (2)
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        func.apply(this, arguments); // (1)

        isThrottled = true;

        setTimeout(function () {
            isThrottled = false; // (3)
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }

    return wrapper;
}
function convertTo(type, picture) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    /*let canvasCopy = document.createElement('canvas');
    let ctxCopy = canvasCopy.getContext('2d');*/

    /*canvasCopy.width = picture.width;
    canvasCopy.height = picture.height;
      let ratio = getRation(picture,picture.width);*/
    canvas.width = picture.width;
    canvas.height = picture.height;

    /*ctx.drawImage(canvasCopy, 0, 0,
        canvasCopy.width, canvasCopy.height, 0, 0,
        canvas.width, canvas.height);*/
    switch (type) {
        case 'imageData':
            {
                ctx.drawImage(picture, 0, 0);
                var data = ctx.getImageData(0, 0, canvas.width, canvas.height);
                return data;
            }
        case 'URL':
            {
                ctx.putImageData(picture, 0, 0);
                return canvas.toDataURL('image/png');
            }
        case "resizeImg":
            {
                var canvasCopy = document.createElement('canvas');
                var ctxCopy = canvasCopy.getContext('2d');

                canvasCopy.width = picture.width;
                canvasCopy.height = picture.height;

                var ratio = getRation(picture, picture.width);
                canvas.width = picture.width * ratio;
                canvas.height = picture.height * ratio;

                ctxCopy.drawImage(picture, 0, 0);

                ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);

                return canvas.toDataURL('image/png');
            }
    }
}
function draw(canvas, type, config) {
    var canvasCopy = document.createElement("canvas");
    var copyContext = canvasCopy.getContext("2d");

    var ctx = canvas.getContext('2d');

    var options = {
        'getRatioImage': function getRatioImage() {
            canvasCopy.width = config.img.width;
            canvasCopy.height = config.img.height;

            console.log('helper', config.img.width * config.ratio);
            canvas.width = config.img.width * config.ratio;
            canvas.height = config.img.height * config.ratio;

            var inf = copyContext.getImageData(0, 0, canvasCopy.width, canvasCopy.height);
            console.log('Info from copy CANVAS', inf);
            copyContext.drawImage(config.img, 0, 0);
        },
        'drawImage': function drawImage() {

            canvasCopy.width = config.img.width;
            canvasCopy.height = config.img.height;

            console.log('helper', config.img.width * config.ratio);
            canvas.width = config.img.width * config.ratio;
            canvas.height = config.img.height * config.ratio;

            var inf = copyContext.getImageData(0, 0, canvasCopy.width, canvasCopy.height);
            console.log('Info from copy CANVAS', inf);
            copyContext.drawImage(config.img, 0, 0);
            ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);
        },
        'paintPixels': function paintPixels() {
            // console.log(img)
            canvas.width = config.img.width;
            canvas.height = config.img.height;
            ctx.putImageData(config.img, 0, 0);
        },
        'drawRAWImage': function drawRAWImage() {
            canvas.width = config.img.width;
            canvas.height = config.img.height;

            ctx.drawImage(config.img, 0, 0);
        },
        'paintPixelsToSizing': function paintPixelsToSizing() {

            var ratio = getRation(size.width, 500);

            canvasCopy.width = config.img.width;
            canvasCopy.height = config.img.height;

            //canvas.width = img.width * ratio;
            //canvas.height = img.height * ratio;

            copyContext.putImageData(config.img, 0, 0);

            ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);
        }
    };
    options[type]();
}

function getInfoCanvas(canvas) {
    var ctx = canvas.getContext('2d');

    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function removeMany(selector, scope, cls) {
    var elements = Array.from((scope || document).querySelectorAll(selector));

    elements.forEach(function (item, i, arr) {
        item.classList.remove(cls);
    });
}

function qs(selector, scope) {
    return (scope || document).querySelector(selector);
}
function $on(target, type, callback, capture) {
    target.addEventListener(type, callback, !!capture);
}
function $delegate(target, selector, type, handler, capture) {
    var dispatchEvent = function dispatchEvent(event) {
        var targetElement = event.target;
        var potentialElements = target.querySelectorAll(selector);
        var i = potentialElements.length;

        while (i--) {
            if (potentialElements[i] === targetElement) {
                handler.call(targetElement, event);
                break;
            }
        }
    };

    $on(target, type, dispatchEvent, !!capture);
}
function $removeEvent(target, selector, type, handler, capture) {
    var dispatchEvent = function dispatchEvent(event) {
        var targetElement = event.target;
        var potentialElements = target.querySelectorAll(selector);
        var i = potentialElements.length;

        while (i--) {
            if (potentialElements[i] === targetElement) {
                handler.call(targetElement, event);
                break;
            }
        }
    };

    $off(target, type, dispatchEvent, !!capture);
}
function $off(target, type, callback) {
    target.removeEventListener(type, callback);
}

function closest(el, selector) {
    var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

    while (el) {
        if (matchesSelector.call(el, selector)) {
            break;
        }
        el = el.parentElement;
    }
    return el;
}

function getAverageRGB(imgEl) {

    var blockSize = 5,
        // only visit every 5 pixels
    defaultRGB = { r: 0, g: 0, b: 0 },
        // for non-supporting envs
    canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data,
        width,
        height,
        i = -4,
        length,
        rgb = { r: 0, g: 0, b: 0 },
        count = 0;

    if (!context) {
        return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch (e) {
        /* security error, img on diff domain */alert('x');
        return defaultRGB;
    }

    length = data.data.length;

    while ((i += blockSize * 4) < length) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i + 1];
        rgb.b += data.data[i + 2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);

    return [rgb.r, rgb.g, rgb.b, 255];
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {


/**
 * Return a `Blob` for the given data `uri`.
 *
 * @param {String} uri
 * @return {Blob}
 * @api public
 */

module.exports = function(uri){
  var data = uri.split(',')[1];
  var bytes = atob(data);
  var buf = new ArrayBuffer(bytes.length);
  var arr = new Uint8Array(buf);

  for (var i = 0; i < bytes.length; i++) {
    arr[i] = bytes.charCodeAt(i);
  }

  arr.type = mime(uri);
  return arr;
};

/**
 * Return data uri mime type.
 */

function mime(uri) {
  return uri.split(';')[0].slice(5);
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var ExifReader = __webpack_require__(4).ExifReader;

/**
 * Parse EXIF tags in `buf`.
 *
 * @param {ArrayBuffer} buf
 * @return {Object}
 * @api public
 */

module.exports = function(buf){
  var exif = new ExifReader;
  exif.load(buf);
  return exif.getAllTags();
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

(function() {
  /*
  # ExifReader 0.1
  # http://github.com/mattiasw/exifreader
  # Copyright (C) 2011  Mattias Wallander <mattias@wallander.eu>
  # Licensed under the GNU Lesser General Public License version 3 or later
  # See license text at http://www.gnu.org/licenses/lgpl.txt
  */  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  (typeof exports !== "undefined" && exports !== null ? exports : this).ExifReader = (function() {
    ExifReader.prototype._tiffHeaderOffset = 0x0c;
    function ExifReader() {
      this._getTagValueAt = {
        1: __bind(function(offset) {
          return this._getByteAt(offset);
        }, this),
        2: __bind(function(offset) {
          return this._getAsciiAt(offset);
        }, this),
        3: __bind(function(offset) {
          return this._getShortAt(offset);
        }, this),
        4: __bind(function(offset) {
          return this._getLongAt(offset);
        }, this),
        5: __bind(function(offset) {
          return this._getRationalAt(offset);
        }, this),
        7: __bind(function(offset) {
          return this._getUndefinedAt(offset);
        }, this),
        9: __bind(function(offset) {
          return this._getSlongAt(offset);
        }, this),
        10: __bind(function(offset) {
          return this._getSrationalAt(offset);
        }, this)
      };
    }
    /*
      # Loads all the Exif tags from the specified image file buffer.
      #
      # data ArrayBuffer Image file data
      */
    ExifReader.prototype.load = function(data) {
      return this.loadView(new DataView(data));
    };
    /*
      # Loads all the Exif tags from the specified image file buffer view. Probably
      # used when DataView isn't supported by the browser.
      #
      # @_dataView DataView Image file data view
      */
    ExifReader.prototype.loadView = function(_dataView) {
      this._dataView = _dataView;
      this._tags = {};
      this._checkImageHeader();
      return this._readTags();
    };
    ExifReader.prototype._checkImageHeader = function() {
      if (this._dataView.byteLength < 12 || this._dataView.getUint32(0, false) !== 0xffd8ffe1 || this._dataView.getUint32(6, false) !== 0x45786966 || this._dataView.getUint16(10, false) !== 0x0000) {
        throw 'Invalid image format or no Exif data';
      }
    };
    ExifReader.prototype._readTags = function() {
      this._setByteOrder();
      this._read0thIfd();
      this._readExifIfd();
      this._readGpsIfd();
      return this._readInteroperabilityIfd();
    };
    ExifReader.prototype._setByteOrder = function() {
      if (this._dataView.getUint16(this._tiffHeaderOffset) === 0x4949) {
        return this._littleEndian = true;
      } else if (this._dataView.getUint16(this._tiffHeaderOffset) === 0x4d4d) {
        return this._littleEndian = false;
      } else {
        throw 'Illegal byte order value. Faulty image.';
      }
    };
    ExifReader.prototype._read0thIfd = function() {
      var ifdOffset;
      ifdOffset = this._getIfdOffset();
      return this._readIfd('0th', ifdOffset);
    };
    ExifReader.prototype._getIfdOffset = function() {
      return this._tiffHeaderOffset + this._getLongAt(this._tiffHeaderOffset + 4);
    };
    ExifReader.prototype._readExifIfd = function() {
      var ifdOffset;
      if (this._tags['Exif IFD Pointer'] != null) {
        ifdOffset = this._tiffHeaderOffset + this._tags['Exif IFD Pointer'].value;
        return this._readIfd('exif', ifdOffset);
      }
    };
    ExifReader.prototype._readGpsIfd = function() {
      var ifdOffset;
      if (this._tags['GPS Info IFD Pointer'] != null) {
        ifdOffset = this._tiffHeaderOffset + this._tags['GPS Info IFD Pointer'].value;
        return this._readIfd('gps', ifdOffset);
      }
    };
    ExifReader.prototype._readInteroperabilityIfd = function() {
      var ifdOffset;
      if (this._tags['Interoperability IFD Pointer'] != null) {
        ifdOffset = this._tiffHeaderOffset + this._tags['Interoperability IFD Pointer'].value;
        return this._readIfd('interoperability', ifdOffset);
      }
    };
    ExifReader.prototype._readIfd = function(ifdType, offset) {
      var fieldIndex, numberOfFields, tag, _results;
      numberOfFields = this._getShortAt(offset);
      offset += 2;
      _results = [];
      for (fieldIndex = 0; 0 <= numberOfFields ? fieldIndex < numberOfFields : fieldIndex > numberOfFields; 0 <= numberOfFields ? fieldIndex++ : fieldIndex--) {
        tag = this._readTag(ifdType, offset);
        this._tags[tag.name] = {
          'value': tag.value,
          'description': tag.description
        };
        _results.push(offset += 12);
      }
      return _results;
    };
    ExifReader.prototype._readTag = function(ifdType, offset) {
      var tagCode, tagCount, tagDescription, tagName, tagType, tagValue, tagValueOffset;
      tagCode = this._getShortAt(offset);
      tagType = this._getShortAt(offset + 2);
      tagCount = this._getLongAt(offset + 4);
      if (this._typeSizes[tagType] * tagCount <= 4) {
        tagValue = this._getTagValue(offset + 8, tagType, tagCount);
      } else {
        tagValueOffset = this._getLongAt(offset + 8);
        tagValue = this._getTagValue(this._tiffHeaderOffset + tagValueOffset, tagType, tagCount);
      }
      if (tagType === this._tagTypes['ASCII']) {
        tagValue = this._splitNullSeparatedAsciiString(tagValue);
      }
      if (this._tagNames[ifdType][tagCode] != null) {
        if ((this._tagNames[ifdType][tagCode]['name'] != null) && (this._tagNames[ifdType][tagCode]['description'] != null)) {
          tagName = this._tagNames[ifdType][tagCode]['name'];
          tagDescription = this._tagNames[ifdType][tagCode]['description'](tagValue);
        } else {
          tagName = this._tagNames[ifdType][tagCode];
          if (tagValue instanceof Array) {
            tagDescription = tagValue.join(', ');
          } else {
            tagDescription = tagValue;
          }
        }
        return {
          'name': tagName,
          'value': tagValue,
          'description': tagDescription
        };
      } else {
        return {
          'name': "undefined-" + tagCode,
          'value': tagValue,
          'description': tagValue
        };
      }
    };
    ExifReader.prototype._getTagValue = function(offset, type, count) {
      var tagValue, value, valueIndex;
      value = (function() {
        var _results;
        _results = [];
        for (valueIndex = 0; 0 <= count ? valueIndex < count : valueIndex > count; 0 <= count ? valueIndex++ : valueIndex--) {
          tagValue = this._getTagValueAt[type](offset);
          offset += this._typeSizes[type];
          _results.push(tagValue);
        }
        return _results;
      }).call(this);
      if (value.length === 1) {
        value = value[0];
      } else if (type === this._tagTypes['ASCII']) {
        value = this._getAsciiValue(value);
      }
      return value;
    };
    ExifReader.prototype._getAsciiValue = function(charArray) {
      var char, newCharArray;
      return newCharArray = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = charArray.length; _i < _len; _i++) {
          char = charArray[_i];
          _results.push(String.fromCharCode(char));
        }
        return _results;
      })();
    };
    ExifReader.prototype._getByteAt = function(offset) {
      return this._dataView.getUint8(offset);
    };
    ExifReader.prototype._getAsciiAt = function(offset) {
      return this._dataView.getUint8(offset);
    };
    ExifReader.prototype._getShortAt = function(offset) {
      return this._dataView.getUint16(offset, this._littleEndian);
    };
    ExifReader.prototype._getLongAt = function(offset) {
      return this._dataView.getUint32(offset, this._littleEndian);
    };
    ExifReader.prototype._getRationalAt = function(offset) {
      return this._getLongAt(offset) / this._getLongAt(offset + 4);
    };
    ExifReader.prototype._getUndefinedAt = function(offset) {
      return this._getByteAt(offset);
    };
    ExifReader.prototype._getSlongAt = function(offset) {
      return this._dataView.getInt32(offset, this._littleEndian);
    };
    ExifReader.prototype._getSrationalAt = function(offset) {
      return this._getSlongAt(offset) / this._getSlongAt(offset + 4);
    };
    ExifReader.prototype._splitNullSeparatedAsciiString = function(string) {
      var char, i, tagValue, _i, _len;
      tagValue = [];
      i = 0;
      for (_i = 0, _len = string.length; _i < _len; _i++) {
        char = string[_i];
        if (char === '\x00') {
          i++;
          continue;
        }
        if (!(tagValue[i] != null)) {
          tagValue[i] = '';
        }
        tagValue[i] += char;
      }
      return tagValue;
    };
    ExifReader.prototype._typeSizes = {
      1: 1,
      2: 1,
      3: 2,
      4: 4,
      5: 8,
      7: 1,
      9: 4,
      10: 8
    };
    ExifReader.prototype._tagTypes = {
      'BYTE': 1,
      'ASCII': 2,
      'SHORT': 3,
      'LONG': 4,
      'RATIONAL': 5,
      'UNDEFINED': 7,
      'SLONG': 9,
      'SRATIONAL': 10
    };
    ExifReader.prototype._tagNames = {
      '0th': {
        0x0100: 'ImageWidth',
        0x0101: 'ImageLength',
        0x0102: 'BitsPerSample',
        0x0103: 'Compression',
        0x0106: 'PhotometricInterpretation',
        0x010e: 'ImageDescription',
        0x010f: 'Make',
        0x0110: 'Model',
        0x0111: 'StripOffsets',
        0x0112: {
          'name': 'Orientation',
          'description': function(value) {
            switch (value) {
              case 1:
                return 'top-left';
              case 2:
                return 'top-right';
              case 3:
                return 'bottom-right';
              case 4:
                return 'bottom-left';
              case 5:
                return 'left-top';
              case 6:
                return 'right-top';
              case 7:
                return 'right-bottom';
              case 8:
                return 'left-bottom';
              default:
                return 'Undefined';
            }
          }
        },
        0x0115: 'SamplesPerPixel',
        0x0116: 'RowsPerStrip',
        0x0117: 'StripByteCounts',
        0x011a: 'XResolution',
        0x011b: 'YResolution',
        0x011c: 'PlanarConfiguration',
        0x0128: {
          'name': 'ResolutionUnit',
          'description': function(value) {
            switch (value) {
              case 2:
                return 'inches';
              case 3:
                return 'centimeters';
              default:
                return 'Unknown';
            }
          }
        },
        0x012d: 'TransferFunction',
        0x0131: 'Software',
        0x0132: 'DateTime',
        0x013b: 'Artist',
        0x013e: 'WhitePoint',
        0x013f: 'PrimaryChromaticities',
        0x0201: 'JPEGInterchangeFormat',
        0x0202: 'JPEGInterchangeFormatLength',
        0x0211: 'YCbCrCoefficients',
        0x0212: 'YCbCrSubSampling',
        0x0213: {
          'name': 'YCbCrPositioning',
          'description': function(value) {
            switch (value) {
              case 1:
                return 'centered';
              case 2:
                return 'co-sited';
              default:
                return 'undefied ' + value;
            }
          }
        },
        0x0214: 'ReferenceBlackWhite',
        0x8298: {
          'name': 'Copyright',
          'description': function(value) {
            return value.join('; ');
          }
        },
        0x8769: 'Exif IFD Pointer',
        0x8825: 'GPS Info IFD Pointer'
      },
      'exif': {
        0x829a: 'ExposureTime',
        0x829d: 'FNumber',
        0x8822: {
          'name': 'ExposureProgram',
          'description': function(value) {
            switch (value) {
              case 0:
                return 'Undefined';
              case 1:
                return 'Manual';
              case 2:
                return 'Normal program';
              case 3:
                return 'Aperture priority';
              case 4:
                return 'Shutter priority';
              case 5:
                return 'Creative program';
              case 6:
                return 'Action program';
              case 7:
                return 'Portrait mode';
              case 8:
                return 'Landscape mode';
              default:
                return 'Unknown';
            }
          }
        },
        0x8824: 'SpectralSensitivity',
        0x8827: 'ISOSpeedRatings',
        0x8828: {
          'name': 'OECF',
          'description': function(value) {
            return '[Raw OECF table data]';
          }
        },
        0x9000: {
          'name': 'ExifVersion',
          'description': function(value) {
            var char, string, _i, _len;
            string = '';
            for (_i = 0, _len = value.length; _i < _len; _i++) {
              char = value[_i];
              string += String.fromCharCode(char);
            }
            return string;
          }
        },
        0x9003: 'DateTimeOriginal',
        0x9004: 'DateTimeDigitized',
        0x9101: {
          'name': 'ComponentsConfiguration',
          'description': function(value) {
            var char, string, _i, _len;
            string = '';
            for (_i = 0, _len = value.length; _i < _len; _i++) {
              char = value[_i];
              switch (char) {
                case 0x31:
                  string += 'Y';
                  break;
                case 0x32:
                  string += 'Cb';
                  break;
                case 0x33:
                  string += 'Cr';
                  break;
                case 0x34:
                  string += 'R';
                  break;
                case 0x35:
                  string += 'G';
                  break;
                case 0x36:
                  string += 'B';
              }
            }
            return string;
          }
        },
        0x9102: 'CompressedBitsPerPixel',
        0x9201: 'ShutterSpeedValue',
        0x9202: 'ApertureValue',
        0x9203: 'BrightnessValue',
        0x9204: 'ExposureBiasValue',
        0x9205: 'MaxApertureValue',
        0x9206: 'SubjectDistance',
        0x9207: {
          'name': 'MeteringMode',
          'description': function(value) {
            switch (value) {
              case 1:
                return 'Average';
              case 2:
                return 'CenterWeightedAverage';
              case 3:
                return 'Spot';
              case 4:
                return 'MultiSpot';
              case 5:
                return 'Pattern';
              case 6:
                return 'Partial';
              case 255:
                return 'Other';
              default:
                return 'Unknown';
            }
          }
        },
        0x9208: {
          'name': 'LightSource',
          'description': function(value) {
            switch (value) {
              case 1:
                return 'Daylight';
              case 2:
                return 'Fluorescent';
              case 3:
                return 'Tungsten (incandescent light)';
              case 4:
                return 'Flash';
              case 9:
                return 'Fine weather';
              case 10:
                return 'Cloudy weather';
              case 11:
                return 'Shade';
              case 12:
                return 'Daylight fluorescent (D 5700 – 7100K)';
              case 13:
                return 'Day white fluorescent (N 4600 – 5400K)';
              case 14:
                return 'Cool white fluorescent (W 3900 – 4500K)';
              case 15:
                return 'White fluorescent (WW 3200 – 3700K)';
              case 17:
                return 'Standard light A';
              case 18:
                return 'Standard light B';
              case 19:
                return 'Standard light C';
              case 20:
                return 'D55';
              case 21:
                return 'D65';
              case 22:
                return 'D75';
              case 23:
                return 'D50';
              case 24:
                return 'ISO studio tungsten';
              case 255:
                return 'Other light source';
              default:
                return 'Unknown';
            }
          }
        },
        0x9209: {
          'name': 'Flash',
          'description': function(value) {
            switch (value) {
              case 0x00:
                return 'Flash did not fire';
              case 0x01:
                return 'Flash fired';
              case 0x05:
                return 'Strobe return light not detected';
              case 0x07:
                return 'Strobe return light detected';
              case 0x09:
                return 'Flash fired, compulsory flash mode';
              case 0x0d:
                return 'Flash fired, compulsory flash mode, return light not detected';
              case 0x0f:
                return 'Flash fired, compulsory flash mode, return light detected';
              case 0x10:
                return 'Flash did not fire, compulsory flash mode';
              case 0x18:
                return 'Flash did not fire, auto mode';
              case 0x19:
                return 'Flash fired, auto mode';
              case 0x1d:
                return 'Flash fired, auto mode, return light not detected';
              case 0x1f:
                return 'Flash fired, auto mode, return light detected';
              case 0x20:
                return 'No flash function';
              case 0x41:
                return 'Flash fired, red-eye reduction mode';
              case 0x45:
                return 'Flash fired, red-eye reduction mode, return light not detected';
              case 0x47:
                return 'Flash fired, red-eye reduction mode, return light detected';
              case 0x49:
                return 'Flash fired, compulsory flash mode, red-eye reduction mode';
              case 0x4d:
                return 'Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected';
              case 0x4f:
                return 'Flash fired, compulsory flash mode, red-eye reduction mode, return light detected';
              case 0x59:
                return 'Flash fired, auto mode, red-eye reduction mode';
              case 0x5d:
                return 'Flash fired, auto mode, return light not detected, red-eye reduction mode';
              case 0x5f:
                return 'Flash fired, auto mode, return light detected, red-eye reduction mode';
              default:
                return 'Unknown';
            }
          }
        },
        0x920a: 'FocalLength',
        0x9214: {
          'name': 'SubjectArea',
          'description': function(value) {
            switch (value.length) {
              case 2:
                return "Location; X: " + value[0] + ", Y: " + value[1];
                break;
              case 3:
                return "Circle; X: " + value[0] + ", Y: " + value[1] + ", diameter: " + value[2];
                break;
              case 4:
                return "Rectangle; X: " + value[0] + ", Y: " + value[1] + ", width: " + value[2] + ", height: " + value[3];
                break;
              default:
                return 'Unknown';
            }
          }
        },
        0x927c: {
          'name': 'MakerNote',
          'description': function(value) {
            return '[Raw maker note data]';
          }
        },
        0x9286: {
          'name': 'UserComment',
          'description': function(value) {
            switch (value.slice(0, 8).map(function(byte) {
                  return String.fromCharCode(byte);
                }).join('')) {
              case 'ASCII\x00\x00\x00':
                return value.slice(8, value.length).map(function(byte) {
                  return String.fromCharCode(byte);
                }).join('');
              case 'JIS\x00\x00\x00\x00\x00':
                return '[JIS encoded text]';
              case 'UNICODE\x00':
                return '[Unicode encoded text]';
              case '\x00\x00\x00\x00\x00\x00\x00\x00':
                return '[Undefined encoding]';
            }
          }
        },
        0x9290: 'SubSecTime',
        0x9291: 'SubSecTimeOriginal',
        0x9292: 'SubSecTimeDigitized',
        0xa000: {
          'name': 'FlashpixVersion',
          'description': function(value) {
            var char, string, _i, _len;
            string = '';
            for (_i = 0, _len = value.length; _i < _len; _i++) {
              char = value[_i];
              string += String.fromCharCode(char);
            }
            return string;
          }
        },
        0xa001: {
          'name': 'ColorSpace',
          'description': function(value) {
            switch (value) {
              case 1:
                return 'sRGB';
              case 0xffff:
                return 'Uncalibrated';
              default:
                return 'Unknown';
            }
          }
        },
        0xa002: 'PixelXDimension',
        0xa003: 'PixelYDimension',
        0xa004: 'RelatedSoundFile',
        0xa005: 'Interoperability IFD Pointer',
        0xa20b: 'FlashEnergy',
        0xa20c: {
          'name': 'SpatialFrequencyResponse',
          'description': function(value) {
            return '[Raw SFR table data]';
          }
        },
        0xa20e: 'FocalPlaneXResolution',
        0xa20f: 'FocalPlaneYResolution',
        0xa210: {
          'name': 'FocalPlaneResolutionUnit',
          'description': function(value) {
            switch (value) {
              case 2:
                return 'inches';
              case 3:
                return 'centimeters';
              default:
                return 'Unknown';
            }
          }
        },
        0xa214: {
          'name': 'SubjectLocation',
          'description': function(value) {
            return "X: " + value[0] + ", Y: " + value[1];
          }
        },
        0xa215: 'ExposureIndex',
        0xa217: {
          'name': 'SensingMethod',
          'description': function(value) {
            switch (value) {
              case 1:
                return 'Undefined';
              case 2:
                return 'One-chip color area sensor';
              case 3:
                return 'Two-chip color area sensor';
              case 4:
                return 'Three-chip color area sensor';
              case 5:
                return 'Color sequential area sensor';
              case 7:
                return 'Trilinear sensor';
              case 8:
                return 'Color sequential linear sensor';
              default:
                return 'Unknown';
            }
          }
        },
        0xa300: {
          'name': 'FileSource',
          'description': function(value) {
            switch (value) {
              case 3:
                return 'DSC';
              default:
                return 'Unknown';
            }
          }
        },
        0xa301: {
          'name': 'SceneType',
          'description': function(value) {
            switch (value) {
              case 1:
                return 'A directly photographed image';
              default:
                return 'Unknown';
            }
          }
        },
        0xa302: {
          'name': 'CFAPattern',
          'description': function(value) {
            return '[Raw CFA pattern table data]';
          }
        },
        0xa401: {
          'name': 'CustomRendered',
          'description': function(value) {
            switch (value) {
              case 0:
                return 'Normal process';
              case 1:
                return 'Custom process';
              default:
                return 'Unknown';
            }
          }
        },
        0xa402: {
          'name': 'ExposureMode',
          'description': function(value) {
            switch (value) {
              case 0:
                return 'Auto exposure';
              case 1:
                return 'Manual exposure';
              case 2:
                return 'Auto bracket';
              default:
                return 'Unknown';
            }
          }
        },
        0xa403: {
          'name': 'WhiteBalance',
          'description': function(value) {
            switch (value) {
              case 0:
                return 'Auto white balance';
              case 1:
                return 'Manual white balance';
              default:
                return 'Unknown';
            }
          }
        },
        0xa404: {
          'name': 'DigitalZoomRatio',
          'description': function(value) {
            switch (value) {
              case 0:
                return 'Digital zoom was not used';
              default:
                return value;
            }
          }
        },
        0xa405: {
          'name': 'FocalLengthIn35mmFilm',
          'description': function(value) {
            switch (value) {
              case 0:
                return 'Unknown';
              default:
                return value;
            }
          }
        },
        0xa406: {
          'name': 'SceneCaptureType',
          'description': function(value) {
            switch (value) {
              case 0:
                return 'Standard';
              case 1:
                return 'Landscape';
              case 2:
                return 'Portrait';
              case 3:
                return 'Night scene';
              default:
                return 'Unknown';
            }
          }
        },
        0xa407: {
          'name': 'GainControl',
          'description': function(value) {
            switch (value) {
              case 0:
                return 'None';
              case 1:
                return 'Low gain up';
              case 2:
                return 'High gain up';
              case 3:
                return 'Low gain down';
              case 4:
                return 'High gain down';
              default:
                return 'Unknown';
            }
          }
        },
        0xa408: {
          'name': 'Contrast',
          'description': function(value) {
            switch (value) {
              case 0:
                return 'Normal';
              case 1:
                return 'Soft';
              case 2:
                return 'Hard';
              default:
                return 'Unknown';
            }
          }
        },
        0xa409: {
          'name': 'Saturation',
          'description': function(value) {
            switch (value) {
              case 0:
                return 'Normal';
              case 1:
                return 'Low saturation';
              case 2:
                return 'High saturation';
              default:
                return 'Unknown';
            }
          }
        },
        0xa40a: {
          'name': 'Sharpness',
          'description': function(value) {
            switch (value) {
              case 0:
                return 'Normal';
              case 1:
                return 'Soft';
              case 2:
                return 'Hard';
              default:
                return 'Unknown';
            }
          }
        },
        0xa40b: {
          'name': 'DeviceSettingDescription',
          'description': function(value) {
            return '[Raw device settings table data]';
          }
        },
        0xa40c: {
          'name': 'SubjectDistanceRange',
          'description': function(value) {
            switch (value) {
              case 1:
                return 'Macro';
              case 2:
                return 'Close view';
              case 3:
                return 'Distant view';
              default:
                return 'Unknown';
            }
          }
        },
        0xa420: 'ImageUniqueID'
      },
      'gps': {
        0x0000: {
          'name': 'GPSVersionID',
          'description': function(value) {
            var _ref, _ref2;
            if ((value[0] === (_ref = value[1]) && _ref === 2) && (value[2] === (_ref2 = value[3]) && _ref2 === 0)) {
              return 'Version 2.2';
            } else {
              return 'Unknown';
            }
          }
        },
        0x0001: {
          'name': 'GPSLatitudeRef',
          'description': function(value) {
            switch (value.join('')) {
              case 'N':
                return 'North latitude';
              case 'S':
                return 'South latitude';
              default:
                return 'Unknown';
            }
          }
        },
        0x0002: {
          'name': 'GPSLatitude',
          'description': function(value) {
            return value[0] + value[1] / 60 + value[2] / 3600;
          }
        },
        0x0003: {
          'name': 'GPSLongitudeRef',
          'description': function(value) {
            switch (value.join('')) {
              case 'E':
                return 'East longitude';
              case 'W':
                return 'West longitude';
              default:
                return 'Unknown';
            }
          }
        },
        0x0004: {
          'name': 'GPSLongitude',
          'description': function(value) {
            return value[0] + value[1] / 60 + value[2] / 3600;
          }
        },
        0x0005: {
          'name': 'GPSAltitudeRef',
          'description': function(value) {
            switch (value) {
              case 0:
                return 'Sea level';
              case 1:
                return 'Sea level reference (negative value)';
              default:
                return 'Unknown';
            }
          }
        },
        0x0006: {
          'name': 'GPSAltitude',
          'description': function(value) {
            return value + ' m';
          }
        },
        0x0007: {
          'name': 'GPSTimeStamp',
          'description': function(value) {
            var padZero;
            padZero = function(num) {
              var i;
              return ((function() {
                var _ref, _results;
                _results = [];
                for (i = 0, _ref = 2 - ('' + Math.floor(num)).length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
                  _results.push('0');
                }
                return _results;
              })()) + num;
            };
            return value.map(padZero).join(':');
          }
        },
        0x0008: 'GPSSatellites',
        0x0009: {
          'name': 'GPSStatus',
          'description': function(value) {
            switch (value.join('')) {
              case 'A':
                return 'Measurement in progress';
              case 'V':
                return 'Measurement Interoperability';
              default:
                return 'Unknown';
            }
          }
        },
        0x000a: {
          'name': 'GPSMeasureMode',
          'description': function(value) {
            switch (value.join('')) {
              case '2':
                return '2-dimensional measurement';
              case '3':
                return '3-dimensional measurement';
              default:
                return 'Unknown';
            }
          }
        },
        0x000b: 'GPSDOP',
        0x000c: {
          'name': 'GPSSpeedRef',
          'description': function(value) {
            switch (value.join('')) {
              case 'K':
                return 'Kilometers per hour';
              case 'M':
                return 'Miles per hour';
              case 'N':
                return 'Knots';
              default:
                return 'Unknown';
            }
          }
        },
        0x000d: 'GPSSpeed',
        0x000e: {
          'name': 'GPSTrackRef',
          'description': function(value) {
            switch (value.join('')) {
              case 'T':
                return 'True direction';
              case 'M':
                return 'Magnetic direction';
              default:
                return 'Unknown';
            }
          }
        },
        0x000f: 'GPSTrack',
        0x0010: {
          'name': 'GPSImgDirectionRef',
          'description': function(value) {
            switch (value.join('')) {
              case 'T':
                return 'True direction';
              case 'M':
                return 'Magnetic direction';
              default:
                return 'Unknown';
            }
          }
        },
        0x0011: 'GPSImgDirection',
        0x0012: 'GPSMapDatum',
        0x0013: {
          'name': 'GPSDestLatitudeRef',
          'description': function(value) {
            switch (value.join('')) {
              case 'N':
                return 'North latitude';
              case 'S':
                return 'South latitude';
              default:
                return 'Unknown';
            }
          }
        },
        0x0014: {
          'name': 'GPSDestLatitude',
          'description': function(value) {
            return value[0] + value[1] / 60 + value[2] / 3600;
          }
        },
        0x0015: {
          'name': 'GPSDestLongitudeRef',
          'description': function(value) {
            switch (value.join('')) {
              case 'E':
                return 'East longitude';
              case 'W':
                return 'West longitude';
              default:
                return 'Unknown';
            }
          }
        },
        0x0016: {
          'name': 'GPSDestLongitude',
          'description': function(value) {
            return value[0] + value[1] / 60 + value[2] / 3600;
          }
        },
        0x0017: {
          'name': 'GPSDestBearingRef',
          'description': function(value) {
            switch (value.join('')) {
              case 'T':
                return 'True direction';
              case 'M':
                return 'Magnetic direction';
              default:
                return 'Unknown';
            }
          }
        },
        0x0018: 'GPSDestBearing',
        0x0019: {
          'name': 'GPSDestDistanceRef',
          'description': function(value) {
            switch (value.join('')) {
              case 'K':
                return 'Kilometers';
              case 'M':
                return 'Miles';
              case 'N':
                return 'Knots';
              default:
                return 'Unknown';
            }
          }
        },
        0x001a: 'GPSDestDistance',
        0x001b: {
          'name': 'GPSProcessingMethod',
          'description': function(value) {
            switch (value.slice(0, 8).map(function(byte) {
                  return String.fromCharCode(byte);
                }).join('')) {
              case 'ASCII\x00\x00\x00':
                return value.slice(8, value.length).map(function(byte) {
                  return String.fromCharCode(byte);
                }).join('');
              case 'JIS\x00\x00\x00\x00\x00':
                return '[JIS encoded text]';
              case 'UNICODE\x00':
                return '[Unicode encoded text]';
              case '\x00\x00\x00\x00\x00\x00\x00\x00':
                return '[Undefined encoding]';
            }
          }
        },
        0x001c: {
          'name': 'GPSAreaInformation',
          'description': function(value) {
            switch (value.slice(0, 8).map(function(byte) {
                  return String.fromCharCode(byte);
                }).join('')) {
              case 'ASCII\x00\x00\x00':
                return value.slice(8, value.length).map(function(byte) {
                  return String.fromCharCode(byte);
                }).join('');
              case 'JIS\x00\x00\x00\x00\x00':
                return '[JIS encoded text]';
              case 'UNICODE\x00':
                return '[Unicode encoded text]';
              case '\x00\x00\x00\x00\x00\x00\x00\x00':
                return '[Undefined encoding]';
            }
          }
        },
        0x001d: 'GPSDateStamp',
        0x001e: {
          'name': 'GPSDifferential',
          'description': function(value) {
            switch (value) {
              case 0:
                return 'Measurement without differential correction';
              case 1:
                return 'Differential correction applied';
              default:
                return 'Unknown';
            }
          }
        }
      },
      'interoperability': {
        0x0001: 'InteroperabilityIndex',
        0x0002: 'UnknownInteroperabilityTag0x0002',
        0x1001: 'UnknownInteroperabilityTag0x1001',
        0x1002: 'UnknownInteroperabilityTag0x1002'
      }
    };
    /*
      # Gets the image's value of the tag with the given name.
      #
      # name string The name of the tag to get the value of
      #
      # Returns the value of the tag with the given name if it exists,
      # otherwise throws "Undefined".
      */
    ExifReader.prototype.getTagValue = function(name) {
      if (this._tags[name] != null) {
        return this._tags[name].value;
      } else {
        throw 'Undefined';
      }
    };
    /*
      # Gets the image's description of the tag with the given name.
      #
      # name string The name of the tag to get the description of
      #
      # Returns the description of the tag with the given name if it exists,
      # otherwise throws "Undefined".
      */
    ExifReader.prototype.getTagDescription = function(name) {
      if (this._tags[name] != null) {
        return this._tags[name].description;
      } else {
        throw 'Undefined';
      }
    };
    /*
      # Gets all the image's tags.
      #
      # Returns the image's tags as an associative array: name -> description.
      */
    ExifReader.prototype.getAllTags = function() {
      return this._tags;
    };
    return ExifReader;
  })();
}).call(this);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var process = __webpack_require__(10);
var exif = __webpack_require__(3);
var toArray = __webpack_require__(2);
var rotate = __webpack_require__(11);
var resize = __webpack_require__(6);
var urlToImage = __webpack_require__(7);
var size = {
  'image/png': __webpack_require__(9),
  'image/jpeg': __webpack_require__(8)
};

module.exports = fixOrientation;

function fixOrientation (url, opts, fn) {
  if (typeof opts == 'function') {
    fn = opts;
    opts = {};
  }

  var buf = toArray(url);
  var tags = {};
  try { tags = exif(buf.buffer) } catch (err) {}

  var toRotate = tags.Orientation
    && typeof tags.Orientation.value == 'number'
    && (tags.Orientation.value == 6
    || tags.Orientation.value == 8);

  if (!toRotate) {
    process.nextTick(function () {
      fn(url, opts.image && urlToImage(url));
    });
    return;
  }

  var s = size[buf.type](buf);
  var max = Math.max(s.width, s.height);
  var half = max / 2;
  var dir = { 6: 1, 8: -1 }[tags.Orientation.value];

  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = canvas.height = max;

  rotate(ctx, { x: half, y: half, degrees: dir * 90 });

  urlToImage(url, function (img) {
    if (dir == 1) {
      ctx.drawImage(img, 0, max - s.height);
    } else {
      ctx.drawImage(img, max - s.width, 0);
    }

    rotate(ctx, { x: half, y: half, degrees: -1 * dir * 90 });
    resize(canvas, {
      width: s.height,
      height: s.width
    });

    var url = buf.type == 'image/png'
      ? canvas.toDataURL()
      : canvas.toDataURL('image/jpeg', 1);
    fn(url, opts.image && urlToImage(url));
  });
}



/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = resize;

function resize (canvas, o) {
  var ctx = canvas.getContext('2d');
  var imgData = ctx.getImageData(0, 0, o.width, o.height);
  canvas.width = o.width;
  canvas.height = o.height;
  ctx.putImageData(imgData, 0, 0);
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = urlToImage;

function urlToImage (url, fn) {
  var img = new Image();
  if (fn) img.onload = fn.bind(null, img);
  img.src = url;
  return img;
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {


module.exports = size;

/**
 * Start of frame markers.
 */

var sof = {
  0xc0: true,
  0xc1: true,
  0xc2: true,
  0xc3: true,
  0xc5: true,
  0xc6: true,
  0xc7: true,
  0xc9: true,
  0xca: true,
  0xcb: true,
  0xcd: true,
  0xce: true,
  0xcf: true
};

/**
 * Uint16BE.
 */

function u16(buf, o) {
  return buf[o] << 8 | buf[o + 1];
}

/**
 * Return dimensions from jpeg `buf`.
 *
 * @param {Buffer} buf
 * @return {Object} or undefined
 * @api public
 */

function size(buf) {
  var len = buf.length;
  var o = 0;

  // magick
  var jpeg = 0xff == buf[0] && 0xd8 == buf[1];
  if (!jpeg) return;
  o += 2;

  while (o < len) {
    // find next marker
    while (0xff != buf[o]) o++;

    // skip marker
    while (0xff == buf[o]) o++;

    // non-SOF jump to the next marker
    if (!sof[buf[o]]) {
      o += u16(buf, ++o);
      continue;
    }

    var w = u16(buf, o + 6);
    var h = u16(buf, o + 4);

    return { width: w, height: h };
  }
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {


/**
 * Expose `size`.
 */

module.exports = size;

/**
 * Uint32BE.
 */

function u32(buf, o) {
  return buf[o] << 24
    | buf[o + 1] << 16
    | buf[o + 2] << 8
    | buf[o + 3];
}

/**
 * Return dimensions from png `buf`.
 *
 * @param {Buffer} buf
 * @return {Object}
 * @api public
 */

function size(buf) {
  return {
    width: u32(buf, 16),
    height: u32(buf, 16 + 4)
  }
}


/***/ }),
/* 10 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 11 */
/***/ (function(module, exports) {


module.exports = function(ctx, o){
  var x = o.x || 0;
  var y = o.y || 0;

  if (o.degrees) {
    o.radians = o.degrees * (Math.PI / 180);
  }

  ctx.translate(x, y);
  ctx.rotate(o.radians);
  ctx.translate(-x, -y);
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _filters = __webpack_require__(0);

var _filters2 = _interopRequireDefault(_filters);

var _helpers = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Vova on 27.02.2017.
 */
self.onmessage = function (e) {
    //console.log(e.data)
    console.log(e.data.func);
    switch (e.data.func) {

        case 'processingImage':
            {
                var filter = new _filters2.default(e.data.infoPixel);
                var pixels = filter.convertToGray().LoGfilter().getImageData();

                self.postMessage({
                    'func': e.data.func,
                    'resposne': pixels
                });
                break;
            }
        case 'gistogrammPrepare':
            {
                var _filter = new _filters2.default(e.data.infoPixel);
                var g = _filter.getGistogrammInfo();
                console.log(g);
                self.postMessage({
                    'func': e.data.func,
                    'resposne': g
                });
                break;
            }
    }
    //self.postMessage('hellloo wolrdddd');
    //console.log(e.type)
};

/***/ })
/******/ ]);