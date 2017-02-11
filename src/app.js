import {createImage,fileSelect,draw,getInfoCanvas} from './helpers.js';
import Filters from './filters.js'
let handler = (evt)=>{
    fileSelect(evt)
    .then(data=>{
        return createImage(data);
    })
    .then(picture=>{
        draw(canvas,picture,'drawImage');
    })
}

function genHandler(evt){
    let info = getInfoCanvas(canvas);
    console.log(info.data[info.data.length-4],info.data[info.data.length-3],info.data[info.data.length-2],info.data[info.data.length-1])
    console.log(info.data.length)
    let filter = new Filters(info);
    console.log(info.data[(info.width*info.height)*4-4],info.data[(info.width*info.height)*4-3],info.data[(info.width*info.height)*4-2],info.data[(info.width*info.height)*4-1])
    console.log(info.data[0],info.data[1],info.data[2],info.data[3])
    let infoAboutPixel = filter.getCurrentPixel(0,0);
    console.log('Info about pixel',infoAboutPixel)
    info = filter
            .invert()
            .convertToGray()
            .getImageData();

    draw(canWin,info,'paintPixels');
}

let canvas = document.querySelector("#demo");
let canWin = document.querySelector("#winC");
document.querySelector(".input-file").addEventListener('change',handler,false);
document.querySelector('.genPix').addEventListener('click',genHandler,false);

