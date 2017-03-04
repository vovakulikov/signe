/**
 * Created by Vova on 19.02.2017.
 */
import './critical.css';
import {draw,getInfoCanvas,getRatioImage,getRation,closest,$delegate,qs,$off,$removeEvent,removeMany} from '../../../src/helpers.js';
import {configLineChart} from './lineChart.js'
import Template from  './template.js'
//console.log(Chart)
console.log('sf')


import {getAverageRGB} from '../../../src/helpers.js';

export default class View {
    constructor(){

        this.loadSpinner = qs('.loading-spin');

        this.imagesBlock = qs('.filter-blocks');
        this.startEffect = qs(".cntrls-filter__start-effect");

        this.uploadButton = qs(".input-file");
        this.uploadFiled = qs(".cntrls-filter__dropdown-file");

        this.itemsBlock = qs('.filter-items');
        this.temp = new Template();

    }

    bindUploadImage(handler){
        this.uploadButton.addEventListener('change',(e)=>{
            this.render('clearDropDownZone',null);
            handler(e)
        });
        this.uploadFiled.addEventListener('drop',(e)=>{
            this.render('clearDropDownZone',null);
            handler(e)
        });
        this.uploadFiled.addEventListener("dragover", function(e){e.preventDefault();}, true);
    }

    bindStartFiltering(handler){
        this.startEffect.addEventListener('click',handler);
    }
    disabledDropdownZone(){
        this.uploadFiled.classList.add('cntrls-filter__dropdown-file_disabled');
        this.imagesBlock.classList.add('filter-block_active');
    }
    render(type,picture){

        let types = {
            'clearDropDownZone':()=>{
                console.log('clear!!!!')
                this.itemsBlock.innerHTML = '';
            },
            'add-item-image': ()=>{
                this.disabledDropdownZone()
                //Обрезаем изображение сжимем его.
                //let ratioImg = getRatioImage(picture)
                let DOM_token = this.temp.getDomImage(picture)
                this.itemsBlock.insertAdjacentHTML('beforeend',DOM_token)
               // this.itemsBlock.insertAdjacentHTML('beforeend',DOM_token)
            }
        }

        types[type]();

    }

}