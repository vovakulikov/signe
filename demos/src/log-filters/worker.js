/**
 * Created by Vova on 27.02.2017.
 */
import Filters from '../../../src/filters.js';
self.onmessage = function(e) {
    //console.log(e.data)
    console.log(e.data.func)
    switch(e.data.func){

        case ('processingImage'):{
            let filter = new Filters(e.data.infoPixel);
            filter.convertToGray().LoGfilter();

            self.postMessage({
                'resposne': e.data.infoPixel
            });
            break;
        }
    }
    //self.postMessage('hellloo wolrdddd');
    //console.log(e.type)
}