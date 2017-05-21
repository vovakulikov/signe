/**
 * Created by Vova on 19.02.2017.
 */

import {createImage,fileSelect,getInfoCanvas,convertTo} from './helpers.js';
import Filters from '../../../../src/filters.js';
//import worker from "worker-loader!./worker.js";




console.log('dfsfa')
export default class Store {
    constructor(){
        require.ensure(['worker-loader!./worker.js'], ()=> {
            let worker = require('worker-loader!./worker.js')
            this.worker = new worker();
        })
        this.gitImageFull = null;
    }

    loadLogoImage(evt){
        evt.preventDefault();
        let path = (evt.type == "change") ? evt.target.files : evt.dataTransfer.files
        let sizing = {}
        let image = null;
        return fileSelect(path)
            .then(({data,file})=>{
                sizing.systemInfo = {};
                Object.assign( sizing.systemInfo,{
                    name:file.name,
                    size:file.size,
                    type:file.type,
                    lastMod: file.lastModifiedDate

                })
                return createImage(data);
            })
            .then(picture =>{
                this.gitImageLogoFull = convertTo('imageData',picture);
                console.log('IMAGE DATA LOGO IMAGE',this.gitImageLogoFull);
                sizing.sizeFull={};
                Object.assign(sizing.sizeFull,{
                    caption: 'Image size before resizing',
                    width:this.gitImageLogoFull.width,
                    height:this.gitImageLogoFull.height
                })

                let smIMG = convertTo('resizeImg',picture);
                console.log('LOGO INFO',sizing)
                return createImage(smIMG);
            })
    }
    loadImage(evt){
        evt.preventDefault();
        let path = (evt.type == "change") ? evt.target.files : evt.dataTransfer.files

        let sizing = {}
        let image = null;
        return fileSelect(path)
            .then(({data,file})=>{
                sizing.systemInfo = {};
                Object.assign( sizing.systemInfo,{
                    name:file.name,
                    size:file.size,
                    type:file.type,
                    lastMod: file.lastModifiedDate

                })
                return createImage(data);
            })
            .then(picture =>{
                this.gitImageFull = convertTo('imageData',picture);
                sizing.sizeFull={};
                Object.assign(sizing.sizeFull,{
                    caption: 'Image size before resizing',
                    width:this.gitImageFull.width,
                    height:this.gitImageFull.height
                })

                let smIMG = convertTo('resizeImg',picture);
                return createImage(smIMG);
            })
            .then(picture=>{
               // console.log(picture)
                image = picture;
                sizing.size={};
                this.gitImageSmall = convertTo('imageData',picture);
                Object.assign(sizing.size,{
                    caption: 'Image size after resizing',
                    width:this.gitImageSmall.width,
                    height:this.gitImageSmall.height
                })
                return this.ImageWorker({
                    "func":'gistogrammPrepare',
                    'infoPixel': this.gitImageSmall
                })
            })
            .then(data=>{
                //console.log(data)
                return Promise.resolve({picture:image,sizing,data});
            })

    }

    processingImage(data){
        let filter = new Filters(data);
        filter.convertToGray().LoGfilter();
        return data;
    }
    processingImageWorker(data){
        let res = {};
        return this.ImageWorker(data)
            .then(d=>{
                console.log('tttrrrr',d);
                res.picture = {
                    src: convertTo("URL",d)
                }
                return this.ImageWorker({
                    "func":'gistogrammPrepare',
                    'infoPixel': d
                })
            })
            .then(chart=>{
                res.data = chart;
                return Promise.resolve(res)
            })

    }
    storeKey(key, secretImage){
        const imgData = this.getBase64Image(secretImage);
        localStorage.setItem(key, imgData);
        console.log(imgData,key)
    }
    getStoreKey(key) {
        var dataImage = "data:image/png;base64," + localStorage.getItem(key);
        const canvas = document.createElement('canvas');

        var ctx = canvas.getContext("2d");

        var image = new Image();
        image.src = dataImage
        return new Promise((resolve, reject) => {
            image.onload = function() {
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0);
                let data = ctx.getImageData(0,0,canvas.width,canvas.height)
                resolve(data);
            };
        })

    }

    getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        console.log(img)
        var ctx = canvas.getContext("2d");
        ctx.putImageData(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }

    ImageWorker(data){
        return new Promise((resolve,reject)=>{
            this.worker.postMessage(data);
            this.worker.onmessage = (e)=>{
                if(data.func == e.data.func){
                    if(data.func == 'processingImage2'){
                        console.log('KEYYYYYYYYY!!!!!::',e.data.key)
                        this.storeKey(e.data.key, e.data.resposneKeyImage)
                    }
                    if(data.func == "gettigLogo") {
                        this.getStoreKey(e.data.resposne)
                            .then(data => {
                                resolve(data);
                            })
                    } else {
                        console.log('То что пришло из воркера',e.data)
                        resolve(e.data.resposne);
                    }


                }
            }
        })
    }


}