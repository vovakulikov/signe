/**
 * Created by Vova on 19.02.2017.
 */
import './critical.css';
import {draw,getInfoCanvas,getRation,closest,$delegate,qs,$off,$removeEvent} from '../../../src/helpers.js';

//import Chart from 'chart.js';
//console.log(Chart)
console.log('sf')


import {getAverageRGB} from '../../../src/helpers.js';

export default class View {
    constructor(){

        this.loadSpinner = qs('.loading-spin');

        this.imagesBlock = qs('.filter__images-cavas');
        this.startEffect = qs(".cntrls-filter__start-effect");
        this.post_canvas = qs('._post-filter-image');
        this.canvas = qs('._show_image');



        this.uploadButton = qs(".input-file");
        this.uploadFiled = qs(".cntrls-filter__dropdown-file");

        this.filteredImage =  qs('.filtered-image')

        this.debugBtn = qs(".debug__btn");



        this.toogleDebugWindow = this.toogleDebugWindow.bind(this);

        this.standartEvent()
    }

    standartEvent(){
        $delegate( this.imagesBlock, '.debug__btn', 'click', this.toogleDebugWindow,false)
        $delegate( this.imagesBlock, '.debug__close-icon', 'click',this.toogleDebugWindow,false)
        $delegate( this.imagesBlock, '.full_width', 'click', ({target})=>{
            this.imagesBlock.classList.toggle('items-full-width_active')
        })

    }
    toogleDebugWindow({target}){
        let rootImgEl = closest(target, '.item-canvas');
        rootImgEl.classList.toggle('item-cavas_debug_active')
    }
    bindUploadImage(handler){
        this.uploadButton.addEventListener('change',handler);
        this.uploadFiled.addEventListener('drop',handler);
        this.uploadFiled.addEventListener("dragover", function(e){e.preventDefault();}, true);
    }
    bindStartFiltering(handler){
        this.startEffect.addEventListener('click',(e)=>{

            let information = getInfoCanvas(this.canvas)
            handler(information);
        });
    }
    loadSpin(){
        this.loadSpinner.style.visibility = 'visible';
    }
    dragFieldHide(){
        this.uploadFiled.querySelector('span').style.display = 'none';
        this.uploadFiled.classList.add("cntrls-filter__dropdown-file_with_images");
        this.filteredImage.classList.add('item-canvas_hide')

       // let items = qs('item-canvas').
    }
    render(type,picture){

        let getConfig = ()=>{
            let w = document.querySelector('.item-canvas').offsetWidth;
            let config = getRation(picture,w);
            return config;
        }

        let action = {
            'firstPaint': ()=>{
                this.dragFieldHide()
                draw(this.canvas,'drawImage',getConfig());
                document.querySelector('.origin-image')
                    .setAttribute('src',this.canvas.toDataURL("image/png"));
                let img = document.querySelector('.origin-image')
                   setTimeout(()=>{
                       let c = getAverageRGB(img)
                       img.parentNode.parentNode.style.backgroundColor = `rgb(${c[0]},${c[1]},${c[2]})`
                   },0)
            },
            'afterFilter': ()=>{

                draw(this.post_canvas,'paintPixels',getConfig());
                document.querySelector('.filter-image')
                    .setAttribute('src',this.post_canvas.toDataURL("image/png"));
                let img = document.querySelector('.filter-image')
                this.filteredImage.classList.remove('item-canvas_hide')
               //
            }
        }

        action[type]();
        /*setTimeout(()=>{
            this.loadSpinner.style.visibility = 'hidden';
        },100)*/

    }

}