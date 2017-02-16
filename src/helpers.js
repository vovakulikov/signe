export function fileSelect(evt,callback){
    //get list of current files
    return new Promise((resolve,reject) => {
            var files = evt.target.files;
            //Пройдемся по массиву с файлами
            let length = files.length, i,f;
            for(i=0; i < length; i++){
                // если файл не имеет формат изображения, то выброс
                f = files[i];
                if (!f.type.match('image.*')) {
                    continue;
                }

                //Создаем новый ридер для чтение файла изображение.
                let reader = new FileReader();
                //Читаем файл в виде dataUrl
                reader.readAsDataURL(f);

                //Загрузка файла
                reader.onload = function(e){
                    resolve(e.target.result)
                };
            }
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
export function draw(canvas,img,type){
    var canvasCopy = document.createElement("canvas");
    var copyContext = canvasCopy.getContext("2d");

    var ctx = canvas.getContext('2d');

    var ratio = 1;

    let options = {
        'drawImage': function(){
            if(img.width > 1000)
                ratio = 1000/img.width;
            else if(img.height>800)
                ratio = 800/img.height;

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

            if(img.width > 500)
                ratio = 800/img.width;
            else if(img.height>400)
                ratio = 400/img.height;

            canvasCopy.width = img.width;
            canvasCopy.height = img.height;

            canvas.width = img.width * ratio;
            canvas.height = img.height * ratio;

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

