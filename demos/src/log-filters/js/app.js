/**
 * Created by Vova on 15.02.2017.
 */

import {createImage,fileSelect,draw,getInfoCanvas} from '../../../../src/helpers.js';
import Filters from '../../../../src/filters.js';
import '../css/critical.css';
let canvas = document.querySelector('._show_image');
let fullCanvas = document.querySelector('._fullInfo');

let handler = (evt)=>{
    fileSelect(evt.target.files)
        .then(data=>{
        return createImage(data);
    })
    .then(picture=>{
            //console.log('Thats we get from fileselect promise', picture)
            draw(canvas,picture,'drawImage');
            draw(fullCanvas,picture,'drawRAWImage');
    })
}

function genHandler(evt){
    let d = Date.now()
    //console.log(d)
   // console.log('Данные из свернутого холста (сжатого)', getInfoCanvas(canvas));
    //console.log('Данные из полноразмерного холста', getInfoCanvas(fullCanvas));
    let info = getInfoCanvas(canvas);
    let filter = new Filters(info);
    //let br = filter.getBrightness();
    filter.convertToGray().LoGfilter().invert();
    //filter.brigFilter(br);

    /*filter.customFilter(function([R,G,B,A]){

          return[0,24,240,255];
    })*/
   // filter.overlayMask()
    draw(canvas,info,'paintPixelsToSizing');
    console.log(Date.now() - d)

    info = getInfoCanvas(canvas);
   // console.log('Постданные ',info);
}



document.querySelector(".input-file").addEventListener('change',handler,false);
document.querySelector('.getInfo').addEventListener('click',genHandler,false);
document.querySelector('.info').addEventListener('click',function (evt) {
    let d = Date.now()
    let info = getInfoCanvas(canvas);
    let filter = new Filters(info);
    filter.convertToGray()
    draw(canvas,info,'paintPixels');
    console.log(Date.now() - d)
    console.log('from image info ',info);
})
var target = document.querySelector(".drop-target");
target.addEventListener("dragover", function(e){e.preventDefault();}, true);
target.addEventListener("drop", function(e){
    e.preventDefault();
    fileSelect(e.dataTransfer.files)
        .then(data=>{
            return createImage(data);
        })
        .then(picture=>{
            //console.log('Thats we get from fileselect promise', picture)
            draw(canvas,picture,'drawImage');
            draw(fullCanvas,picture,'drawRAWImage');
        })
}, true);/**/