/**
 * Created by Vova on 19.02.2017.
 */

import {createImage,fileSelect,getInfoCanvas,convertTo} from '../../../src/helpers.js';
import Filters from '../../../src/filters.js';
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
        return fileSelect(path)
            .then(data=>{
                return createImage(data);
            })
            .then(picture =>{
                this.gitImageFull = convertTo('imageData',picture);

                Object.assign(sizing,{
                    full_width:this.gitImageFull.width,
                    full_height:this.gitImageFull.height
                })

                let smIMG = convertTo('resizeImg',picture);
                return createImage(smIMG);
               // return Promise.resolve(this.gitImageSmall);
            })
            .then(picture=>{
                console.log(picture)
                this.gitImageSmall = convertTo('imageData',picture);
                Object.assign(sizing,{
                    small_width:this.gitImageSmall.width,
                    small_height:this.gitImageSmall.height
                })
                return Promise.resolve({picture,sizing});
            })
    }

    processingImage(data){
        let filter = new Filters(data);
        filter.convertToGray().LoGfilter();
        return data;
    }

    processingImageWorker(data){
        return new Promise((resolve,reject)=>{
            this.worker.postMessage(data);
            this.worker.onmessage = (e)=>{
                if(data.func == e.data.func){

                    let res = {
                        picture:{
                            src:convertTo('URL',e.data.resposne)
                        }
                    }
                    resolve(res);
                }

            }
        })
    }


}