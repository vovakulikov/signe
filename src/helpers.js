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
                    fixOrientation(e.target.result,{img:true},function(fixed,image){
                        resolve(fixed)
                    })

                };

    })
}
export function createImage(source){
    return new Promise((resolve,reject)=>{
        let picture = new Image();
        picture.src = source;
        picture.onload = ()=>{
            console.log('Из загрузчика',picture)
            resolve(picture);
        }
    })
}
export function getRation(img,width,height=400){
    var ratio = 1

    if(img.width > width) {
        ratio = width / img.width;
    }
    else if(img.height>height)
        ratio = height/img.height;

    //var ratio = (ratioH > ratioW)? ratioW: ratioH;
    return {
        'ratio' : ratio,
        'img':img
    }
}

export function draw(canvas,type,config){
    var canvasCopy = document.createElement("canvas");
    var copyContext = canvasCopy.getContext("2d");

    var ctx = canvas.getContext('2d');




    let options = {
        'drawImage': function(){

           // let ratio = getRation(size.width,800);

            canvasCopy.width = config.img.width;
            canvasCopy.height = config.img.height;

            canvas.width = config.img.width * config.ratio;
            canvas.height = config.img.height * config.ratio;

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