var fixOrientation = require('fix-orientation');

export function fileSelect(evt,callback){
    //get list of current files
    return new Promise((resolve,reject) => {
            var files = evt
            //Пройдемся по массиву с файлами
                // если файл не имеет формат изображения, то выброс
                let f = files[0];
                if (!f.type.match('image.*')) {
                    return;
                }

                //Создаем новый ридер для чтение файла изображение.
                let reader = new FileReader();
                //Читаем файл в виде dataUrl
                reader.readAsDataURL(f);

                //Загрузка файла
                reader.onload = function(e){
                   // console.log('Thats is eeeee', e)
                    fixOrientation(e.target.result,{img:true},function(data,image){
                        resolve({data,file:f})
                    })

                };

    })
}
export function createImage(source){
    return new Promise((resolve,reject)=>{
        let picture = new Image();
        picture.src = source;
        picture.onload = ()=>{
            resolve(picture);
        }
    })
}
export function getRation(img,width,height=650){
    var ratio = 1

    if(img.height>height)
        ratio = height/img.height;
    else if(img.width > width) {
        ratio = width / img.width;
    }


    //var ratio = (ratioH > ratioW)? ratioW: ratioH;
    return ratio;
}

//Тормоз-функция.
export function throttle(func, ms) {

    var isThrottled = false,
        savedArgs,
        savedThis;

    function wrapper() {

        if (isThrottled) { // (2)
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        func.apply(this, arguments); // (1)

        isThrottled = true;

        setTimeout(function() {
            isThrottled = false; // (3)
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }

    return wrapper;
}
export function convertTo(type,picture){
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');


    /*let canvasCopy = document.createElement('canvas');
    let ctxCopy = canvasCopy.getContext('2d');*/


    /*canvasCopy.width = picture.width;
    canvasCopy.height = picture.height;

    let ratio = getRation(picture,picture.width);*/
    canvas.width =  picture.width;
    canvas.height = picture.height;



    /*ctx.drawImage(canvasCopy, 0, 0,
        canvasCopy.width, canvasCopy.height, 0, 0,
        canvas.width, canvas.height);*/
    switch(type){
        case 'imageData':{
            ctx.drawImage(picture, 0, 0);
            let data = ctx.getImageData(0,0,canvas.width,canvas.height)
            return data;
        }
        case 'URL':{
            ctx.putImageData(picture, 0, 0);
            return canvas.toDataURL('image/png');
        }
        case "resizeImg":{
            let canvasCopy = document.createElement('canvas');
            let ctxCopy = canvasCopy.getContext('2d');


             canvasCopy.width = picture.width;
             canvasCopy.height = picture.height;

            let ratio = getRation(picture,picture.width);
            canvas.width =  picture.width*ratio;
            canvas.height = picture.height*ratio;


            ctxCopy.drawImage(picture, 0, 0);


             ctx.drawImage(canvasCopy, 0, 0,
             canvasCopy.width, canvasCopy.height, 0, 0,
             canvas.width, canvas.height);


             return canvas.toDataURL('image/png');
        }
    }



}
export function draw(canvas,type,config){
    var canvasCopy = document.createElement("canvas");
    var copyContext = canvasCopy.getContext("2d");

    var ctx = canvas.getContext('2d');




    let options = {
        'getRatioImage':()=>{
            canvasCopy.width = config.img.width;
            canvasCopy.height = config.img.height;

            console.log('helper', config.img.width * config.ratio)
            canvas.width = config.img.width * config.ratio;
            canvas.height = config.img.height * config.ratio;


            let inf = copyContext.getImageData(0,0,canvasCopy.width,canvasCopy.height);
            console.log('Info from copy CANVAS',inf)
            copyContext.drawImage(config.img, 0, 0);

        },
        'drawImage': function(){

            canvasCopy.width = config.img.width;
            canvasCopy.height = config.img.height;

            console.log('helper', config.img.width * config.ratio)
            canvas.width = config.img.width * config.ratio;
            canvas.height = config.img.height * config.ratio;


            let inf = copyContext.getImageData(0,0,canvasCopy.width,canvasCopy.height);
            console.log('Info from copy CANVAS',inf)
            copyContext.drawImage(config.img, 0, 0);
                ctx.drawImage(canvasCopy, 0, 0,
                canvasCopy.width, canvasCopy.height, 0, 0,
                canvas.width, canvas.height);

        },
        'paintPixels':function(){
           // console.log(img)
            canvas.width = config.img.width;
            canvas.height = config.img.height;
            ctx.putImageData(config.img, 0, 0);
        },
        'drawRAWImage':function(){
            canvas.width = config.img.width;
            canvas.height = config.img.height;

            ctx.drawImage(config.img,0,0);
        },
        'paintPixelsToSizing': function(){

            let ratio = getRation(size.width,500);

            canvasCopy.width = config.img.width;
            canvasCopy.height = config.img.height;

            //canvas.width = img.width * ratio;
            //canvas.height = img.height * ratio;

            copyContext.putImageData(config.img, 0, 0);

            ctx.drawImage(canvasCopy, 0, 0,
                canvasCopy.width, canvasCopy.height, 0, 0,
                canvas.width, canvas.height);
        }
    }
    options[type]();
}

export function getInfoCanvas(canvas){
    let ctx = canvas.getContext('2d');

    return ctx.getImageData(0,0,canvas.width,canvas.height);
}

export function removeMany(selector,scope,cls){
    let elements =  Array.from((scope || document).querySelectorAll(selector));

    elements.forEach((item,i,arr)=>{
        item.classList.remove(cls)
    })

}


export function qs(selector, scope) {
    return (scope || document).querySelector(selector);
}
export function $on(target, type, callback, capture) {
    target.addEventListener(type, callback, !!capture);
}
export function $delegate(target, selector, type, handler, capture) {
    const dispatchEvent = event => {
        const targetElement = event.target;
        const potentialElements = target.querySelectorAll(selector);
        let i = potentialElements.length;

        while (i--) {
            if (potentialElements[i] === targetElement) {
                handler.call(targetElement, event);
                break;
            }
        }
    };

    $on(target, type, dispatchEvent, !!capture);
}

export function $deleg(target,type,cl){

    target.addEventListener(type,(e)=>{
        var tar = e.target;
        while (tar != target) {
            if (tar.classList.contains(cl)) {
                console.log(tar);
                return;
            }
            target = target.parentNode;
        }
    })



}
export function $removeEvent(target, selector, type, handler, capture) {
    const dispatchEvent = event => {
        const targetElement = event.target;
        const potentialElements = target.querySelectorAll(selector);
        let i = potentialElements.length;

        while (i--) {
            if (potentialElements[i] === targetElement) {
                handler.call(targetElement, event);
                break;
            }
        }
    };

    $off(target, type, dispatchEvent, !!capture);
}
export function $off(target, type, callback) {
    target.removeEventListener(type, callback);
}


export function closest(el, selector) {
    var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

    while (el) {
        if (matchesSelector.call(el, selector)) {
            break;
        }
        el = el.parentElement;
    }
    return el;
}

export function getAverageRGB(imgEl) {

    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;

    if (!context) {
        return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        /* security error, img on diff domain */alert('x');
        return defaultRGB;
    }

    length = data.data.length;

    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);

    return [rgb.r,rgb.g,rgb.b,255];

}