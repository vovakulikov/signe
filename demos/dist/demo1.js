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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * Created by Vova on 31.01.2017.
 */
var config = {
    edgeOfConvert : 128,
    edgeInput : document.querySelector("#endgeOfConvert"),
    getEdge: function(){
        return this.edgeInput.value * 1 || this.edgeOfConvert;
    }
}
var canvas = document.querySelector('#load-image'),
    ctx = canvas.getContext('2d'),
    pic = new Image();

var canvasConvert = document.querySelector('#convert-image'),
    ctxConvert = canvas.getContext('2d');

pic.onload = function(){
    console.log(pic)
    draw(canvas,pic,function(canvasCopy,ctx){
        ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);
    });
    console.log('Load is happend');
};

function fileSelect(evt,img){
    var files = evt.target.files;
    // get list of files
    for(var i=0,f; i<files.length;i++){
        f = files[i];
        if (!f.type.match('image.*')) {
            continue;
        }
        var reader = new FileReader();
        reader.onload = function(e){
            console.log('reader return ', e)
            img.src = e.target.result;
            //console.log(img);
        };
        reader.readAsDataURL(f);
    }
}

function handlerOnSelectFile(image){
    var img = image;
    return function(evt){
        fileSelect(evt,img);
    }
}
function draw(canvas, img, handler){
    var canvasCopy = document.createElement("canvas");
    var copyContext = canvasCopy.getContext("2d");

    var ratio = 1;

    if(img.width > 700)
        ratio = 700/img.width;
    else if(img.height>500)
        ratio = 500/img.height;

    canvasCopy.width = img.width;
    canvasCopy.height = img.height;
    copyContext.drawImage(img, 0, 0);

    canvas.width = img.width * ratio;
    canvas.height = img.height * ratio;
    var ctx = canvas.getContext('2d');

    if(handler)
        handler(canvasCopy, ctx);

    //ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);
}
function putColorToImage(imageData){
    draw(canvasConvert,pic,function(canvasCopy,ctx){
        ctx.putImageData(imageData, 0, 0);
        //ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);
    });
}
function handlerOnGray(canvas,config){
    return function(evt){
        console.log(config.getEdge());
        let d = Date.now()
        var myImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
        console.log(myImage);
        console.log('Click on make button');

        var picLength = canvas.width*canvas.height;


        for (var i = 0; i < picLength * 4; i += 4) {

            // First bytes are red bytes.
            // Get red value.
            var myRed = myImage.data[i];

            // Second bytes are green bytes.
            // Get green value.
            var myGreen = myImage.data[i + 1];

            // Third bytes are blue bytes.
            // Get blue value.
            var myBlue = myImage.data[i + 2];

            // Fourth bytes are alpha bytes
            // We don't care about alpha here.
            // Add the three values and divide by three.
            // Make it an integer.
            myGray = parseInt((myRed + myGreen + myBlue) / 3);

            // Assign average to red, green, and blue.
            // console.log(myGray)
            if(myGray > config.getEdge()){
                myImage.data[i] = 255;
                myImage.data[i + 1] = 255;
                myImage.data[i + 2] = 255;
            }
            else{
                myImage.data[i] = 0;
                myImage.data[i + 1] = 0;
                myImage.data[i + 2] = 0;
            }

        }

        putColorToImage(myImage);

        console.log(Date.now()-d);
    }
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

document.querySelector(".input-file").addEventListener('change',handlerOnSelectFile(pic),false);
document.querySelector(".action-gray").addEventListener('click',handlerOnGray(canvas,config),false);


/***/ })
/******/ ]);