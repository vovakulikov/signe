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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Filters = function () {
    function Filters(imageData) {
        _classCallCheck(this, Filters);

        this.imageData = imageData;
        this._data = imageData.data;
        this._widthImage = imageData.width;
        this._heightImage = imageData.height;
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
        key: "getImageData",
        value: function getImageData() {
            return this.imageData;
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
        var files = evt.target.files;
        //Пройдемся по массиву с файлами
        var length = files.length,
            i = void 0,
            f = void 0;
        for (i = 0; i < length; i++) {
            // если файл не имеет формат изображения, то выброс
            f = files[i];
            if (!f.type.match('image.*')) {
                continue;
            }

            //Создаем новый ридер для чтение файла изображение.
            var reader = new FileReader();
            //Читаем файл в виде dataUrl
            reader.readAsDataURL(f);

            //Загрузка файла
            reader.onload = function (e) {
                resolve(e.target.result);
            };
        }
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
            if (img.width > 700) ratio = 700 / img.width;else if (img.height > 500) ratio = 500 / img.height;

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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _helpers = __webpack_require__(1);

var _filters = __webpack_require__(0);

var _filters2 = _interopRequireDefault(_filters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handler = function handler(evt) {
    (0, _helpers.fileSelect)(evt).then(function (data) {
        return (0, _helpers.createImage)(data);
    }).then(function (picture) {
        (0, _helpers.draw)(canvas, picture, 'drawImage');
    });
};

function genHandler(evt) {
    var info = (0, _helpers.getInfoCanvas)(canvas);
    var filter = new _filters2.default(info);
    console.log(info.data[0]);
    info = filter.convertToGray().getImageData();
    (0, _helpers.draw)(canWin, info, 'paintPixels');
}

var canvas = document.querySelector("#demo");
var canWin = document.querySelector("#winC");
document.querySelector(".input-file").addEventListener('change', handler, false);
document.querySelector('.genPix').addEventListener('click', genHandler, false);

/***/ })
/******/ ]);