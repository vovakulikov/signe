/**
 * Created by Vova on 15.02.2017.
 */

import {createImage,fileSelect,draw,getInfoCanvas} from '../../../src/helpers.js';
import Filters from '../../../src/filters.js';

let canvas = document.querySelector('._show_image');
let fullCanvas = document.querySelector('._fullInfo');

let handler = (evt)=>{
    fileSelect(evt)
        .then(data=>{
        return createImage(data);
    })
    .then(picture=>{
            draw(canvas,picture,'drawImage');
            draw(fullCanvas,picture,'drawRAWImage');
    })
}

function genHandler(evt){
    let d = Date.now()
    console.log(d)
    console.log('Данные из свернутого холста (сжатого)', getInfoCanvas(canvas));
    console.log('Данные из полноразмерного холста', getInfoCanvas(fullCanvas));
    let info = getInfoCanvas(canvas);
    let filter = new Filters(info);
    //let br = filter.getBrightness();
    filter.convertToGray().LoGfilter();
    //filter.brigFilter(br);

    /*filter.customFilter(function([R,G,B,A]){

          return[0,24,240,255];
    })*/
   // filter.overlayMask()
    draw(canvas,info,'paintPixels');
    console.log(Date.now() - d)
}



document.querySelector(".input-file").addEventListener('change',handler,false);
document.querySelector('.getInfo').addEventListener('click',genHandler,false);