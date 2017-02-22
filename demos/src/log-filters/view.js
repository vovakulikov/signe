/**
 * Created by Vova on 19.02.2017.
 */
import './critical.css';
import {draw,getInfoCanvas,getRation} from '../../../src/helpers.js';
import '../../../node_modules/chart.js/dist/Chart.js'
export default class View {
    constructor(){
        console.log('View is active')

        this.setting_label = document.querySelector(".setting-button")
        this.fake_setting_block = document.querySelector('.fake__setting-block');
        this.setting_block = document.querySelector(".setting-block")
        this.canvasesBlock = document.querySelector(".cntrls-filter__dropdown-file")

        this.startEffect = document.querySelector(".cntrls-filter__start-effect");

        this.post_canvas = document.querySelector('._post-filter-image');
        this.canvas = document.querySelector('._show_image');

        this.canvasWidth = this.canvas.parentNode.offsetWidth;
        this.canvasWidthFull = this.canvas.parentNode.parentNode.offsetWidth;


        this.uploadButton = document.querySelector(".input-file");
        this.uploadFiled = document.querySelector(".cntrls-filter__dropdown-file");

        this.standartEvent()
    }

    standartEvent(){
        this.setting_label.addEventListener('click',(evt)=>{

        })
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

        this.canvas.setAttribute('width', 0)
        this.canvas.setAttribute('height', 0)
          this.post_canvas.setAttribute('width', 0)
          this.post_canvas.setAttribute('height', 0)

    }

    render(type,picture){

        let getConfig = ()=>{
            let w = this.canvas.parentNode.offsetWidth;
            let fullyW = this.canvas.parentNode.parentNode.offsetWidth;

            let config = getRation(picture,w);
            console.log('config before',config.ratio)
            //config.ratio = (config.ratio > 0.5)? config.ratio : getRation(picture,fullyW).ratio;
            console.log('config after',config.ratio)
            return config;
        }

        let action = {
            'firstPaint': ()=>{
                this.dragFieldHide()
                console.log(this.canvas.parentNode.offsetWidth)


                draw(this.canvas,'drawImage',getConfig());
                document.querySelector('.origin-image')
                    .setAttribute('src',this.canvas.toDataURL("image/png"))
                let img = document.querySelector('.origin-image')
                    img.style.maxWidth = img.offsetWidth + 'px';

            },
            'afterFilter': ()=>{
                draw(this.post_canvas,'paintPixels',getConfig());
                //let img = this.post_canvas.toDataURL("image/png");
                document.querySelector('.filter-image')
                .setAttribute('src',this.post_canvas.toDataURL("image/png"))
                let img = document.querySelector('.filter-image')
                img.style.maxWidth = img.offsetWidth + 'px';
            }
        }

        action[type]();
    }

    //Animate setting menu with fake block
    animateSetting(){

    }

    //The function for animate a main block slow down and show block setting
    /*showSettingNormalize(evt){
        evt.preventDefault();
        let heigth;

        let actionHandler = (evt)=>{
            this.setting_block.classList.add('setting-block_is_show')
            this.canvasesBlock.removeEventListener("transitionend", actionHandler);
            this.canvasesBlock.style = 'none'
            this.canvasesBlock.style.transform = `translateY(0)`;
        }

        this.setting_label.classList.toggle('setting-block_is_active');

        if(this.setting_label.classList.contains('setting-block_is_active')){
            heigth = this.setting_block.clientHeight;
            this.canvasesBlock.style = 'transition: transform 0.3s ease;'
            this.canvasesBlock.style.transform = `translateY(${heigth+40}px)`;

            this.canvasesBlock.addEventListener("transitionend", actionHandler, false);

        }
        else{
            this.setting_block.classList.remove('setting-block_is_show')
            this.canvasesBlock.style.transform = `translateY(0)`;
        }

    }*/
}