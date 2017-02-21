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
                    resolve(e.target.result)
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
export function draw(canvas,img,type, size){
    var canvasCopy = document.createElement("canvas");
    var copyContext = canvasCopy.getContext("2d");

    var ctx = canvas.getContext('2d');



    let getRation = (width,height) => {
        var ratio = 1;

        if(img.width > width)
            ratio = width/img.width;
        else if(img.height>height)
            ratio = height/img.height;


        console.log('ratio', ratio)
        return ratio;
    }

    let options = {
        'drawImage': function(){

            let ratio = getRation(size.width,800);

            canvasCopy.width = img.width;
            canvasCopy.height = img.height;

            canvas.width = img.width * ratio;
            canvas.height = img.height * ratio;

            copyContext.drawImage(img, 0, 0);
            ctx.drawImage(canvasCopy, 0, 0,
                canvasCopy.width, canvasCopy.height, 0, 0,
                canvas.width, canvas.height);

        },
        'paintPixels':function(){
           // console.log(img)
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.putImageData(img, 0, 0);
        },
        'drawRAWImage':function(){
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img,0,0);
        },
        'paintPixelsToSizing': function(){

            let ratio = getRation(size.width,500);

            canvasCopy.width = img.width;
            canvasCopy.height = img.height;

            //canvas.width = img.width * ratio;
            //canvas.height = img.height * ratio;

            copyContext.putImageData(img, 0, 0);

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

