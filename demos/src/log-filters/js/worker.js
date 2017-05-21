/**
 * Created by Vova on 27.02.2017.
 */
import Filters from '../../../../src/filters.js';
import {convertTo} from '../../../../src/helpers.js';
self.onmessage = function(e) {
    //console.log(e.data)
    console.log(e.data.func)
    switch(e.data.func){

        case ('processingImage'):{
            let filter = new Filters(e.data.infoPixel);
            let pixels = filter.convertToGray().LoGfilter(e.data.options.sizeMatr).getImageData();

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
        case('processingImage2'):{
            console.log('ИЗ ВОРКЕРА ГОВОРИТ ФУНКЦИЯ',e)
            let filter = new Filters(e.data.infoPixel,e.data.infoPixelLogo);
            let [pixels, key] = filter.insertLogoIntoImage()//.getImageData();
            let Imagepixels = filter.getImageData();

            self.postMessage({
                'func': e.data.func,
                'resposne': Imagepixels,
                'resposneKeyImage': pixels,
                'key': key
            });
            break;
        }
        case('gettigLogo'): {
            let filter = new Filters(e.data.infoPixel);
            let key = filter.customSerialize();
            self.postMessage({
                'func': e.data.func,
                'resposne': key
            });
            break;
        }
    }
    //self.postMessage('hellloo wolrdddd');
    //console.log(e.type)
}