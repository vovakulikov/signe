/**
 * Created by Vova on 19.02.2017.
 */

import {createImage,fileSelect,getInfoCanvas} from '../../../src/helpers.js';
import Filters from '../../../src/filters.js';
export default class Store {
    constructor(){
        console.log('store is active')
        this.virtualCanvas = document.createElement('canvas');

        console.log( this.virtualCanvas )
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
        console.log(filter.pullInfoconsole())
        filter.convertToGray().LoGfilter();

        return data;
    }
}