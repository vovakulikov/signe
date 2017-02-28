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
            let pixels = filter.convertToGray().LoGfilter().getImageData();

            self.postMessage({
                'func': e.data.func,
                'resposne': pixels
            });
            break;
        }
        case('gistogrammPrepare'):{
            let filter = new Filters(e.data.infoPixel);
            let g = filter.getGistogrammInfo();
            console.log(g)
            self.postMessage({
                'func': e.data.func,
                'resposne': g
            });
            break;
        }
    }
    //self.postMessage('hellloo wolrdddd');
    //console.log(e.type)
}