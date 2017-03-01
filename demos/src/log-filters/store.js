/**
 * Created by Vova on 19.02.2017.
 */

import {createImage,fileSelect,getInfoCanvas} from '../../../src/helpers.js';
import Filters from '../../../src/filters.js';
//import worker from "worker-loader!./worker.js";




console.log('dfsfa')
export default class Store {
    constructor(){
        require.ensure(['worker-loader!./worker.js'], ()=> {
            let worker = require('worker-loader!./worker.js')
            this.worker = new worker();
        })

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

    processingImageWorker(data){
        return new Promise((resolve,reject)=>{
            this.worker.postMessage(data);
            this.worker.onmessage = (e)=>{
                console.log('Responce from worker in store.js',e.data)
                if(data.func == e.data.func)
                    resolve(e.data);
            }
        })
    }


}