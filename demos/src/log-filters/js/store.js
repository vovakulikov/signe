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


    loadImage(evt){
        evt.preventDefault();
        let path = (evt.type == "change") ? evt.target.files : evt.dataTransfer.files

        let sizing = {}
        let image = null;
        return fileSelect(path)
            .then(({data,file})=>{
            // console.log(file)
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
                //return Promise.resolve({picture,sizing});
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
                console.log('tttrrrr',d)
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
    ImageWorker(data){
        return new Promise((resolve,reject)=>{
            this.worker.postMessage(data);
            this.worker.onmessage = (e)=>{
                if(data.func == e.data.func){
                    console.log('То что пришло из воркера',e.data)
                    resolve(e.data.resposne);
                }
            }
        })
    }


}