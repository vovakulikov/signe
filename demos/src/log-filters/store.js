/**
 * Created by Vova on 19.02.2017.
 */

import {createImage,fileSelect,getInfoCanvas} from '../../../src/helpers.js';
import Filters from '../../../src/filters.js';
import worker from "worker-loader!./worker.js";


export default class Store {
    constructor(){
            this.worker = new worker();
            this.worker.onmessage = (e)=>{
            console.log(e.data)
        }
        this.worker.postMessage('Hello World')
    }

    loadImage(evt){
        evt.preventDefault();
        let path = (evt.type == "change") ? evt.target.files : evt.dataTransfer.files
        return fileSelect(path)
            .then(data=>{
                return createImage(data);
            })
    }

    processingImage(data){
        let filter = new Filters(data);
        filter.convertToGray().LoGfilter();
        return data;
    }
}