/**
 * Created by Vova on 19.02.2017.
 */
import './critical.css';
import {draw,getInfoCanvas,getRation,closest,$delegate,qs} from '../../../src/helpers.js';
import '../../../node_modules/chart.js/dist/Chart.js'


var colorThief = new ColorThief();

export default class View {
    constructor(){
        this.imagesBlock = qs('.filter__images-cavas');
        this.startEffect = qs(".cntrls-filter__start-effect");
        this.post_canvas = qs('._post-filter-image');
        this.canvas = qs('._show_image');

        this.uploadButton = qs(".input-file");
        this.uploadFiled = qs(".cntrls-filter__dropdown-file");

        this.debugBtn = qs(".debug__btn");
        this.standartEvent()
    }

    standartEvent(){
        $delegate( this.imagesBlock, '.debug__btn', 'click', ({target})=>{
            let rootImgEl = closest(target, '.item-canvas')
            rootImgEl.classList.add('item-cavas_debug_active')
        },false)
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
    dragFieldHide(){
        this.uploadFiled.querySelector('span').style.display = 'none';
        this.uploadFiled.classList.add("cntrls-filter__dropdown-file_with_images");
        qs('.filtered-image').classList.add('item-canvas_hide')
        this.canvas.setAttribute('width', 0)
        this.canvas.setAttribute('height', 0)
        this.post_canvas.setAttribute('width', 0)
        this.post_canvas.setAttribute('height', 0)
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
                       var c = colorThief.getColor(img)
                       img.parentNode.parentNode.style.backgroundColor = `rgb(${c[0]},${c[1]},${c[2]})`
                   },0)
            },
            'afterFilter': ()=>{
                draw(this.post_canvas,'paintPixels',getConfig());
                document.querySelector('.filter-image')
                    .setAttribute('src',this.post_canvas.toDataURL("image/png"));
                let img = document.querySelector('.filter-image')
                document.querySelector('.filtered-image').classList.remove('item-canvas_hide')
            }
        }

        action[type]();

    }

}