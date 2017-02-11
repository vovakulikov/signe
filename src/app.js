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
    let filter = new Filters(info);
    console.log(info.data[0])
    info = filter.convertToGray().getImageData();
    draw(canWin,info,'paintPixels');
}

let canvas = document.querySelector("#demo");
let canWin = document.querySelector("#winC");
document.querySelector(".input-file").addEventListener('change',handler,false);
document.querySelector('.genPix').addEventListener('click',genHandler,false);

