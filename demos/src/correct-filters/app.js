import {createImage,fileSelect,draw,getInfoCanvas} from '../../../src/helpers.js';
import Filters from '../../../src/filters.js';
//import './distDemo.html'

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
    let infoAboutPixel = filter.getCurrentPixel(info.width-1,info.height-1);
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

