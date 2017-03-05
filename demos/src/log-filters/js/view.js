/**
 * Created by Vova on 19.02.2017.
 */
import '../css/critical.css';
import {draw,getInfoCanvas,getRatioImage,getRation,closest,$delegate,qs,$off,$removeEvent,removeMany} from './../../../../src/helpers.js';
import Template from  './template.js';

import {$bubble} from './helpers.js';

import {getAverageRGB} from './../../../../src/helpers.js';

export default class View {
    constructor(){

        this.loadSpinner = qs('.loading-spin');

        this.imagesBlock = qs('.filter-blocks');
        this.startEffect = qs(".cntrls-filter__start-effect");

        this.uploadButton = qs(".input-file");
        this.uploadFiled = qs(".cntrls-filter__dropdown-file");

        this.itemsBlock = qs('.filter-items');

        this.viewButtonBlock = qs('.usual_width');
        this.viewButtonList = qs('.full_width');


        this.temp = new Template();


        this.lineCharts = {};

        this.standartEvents()
    }
    standartEvents(){
        let activeViewButton = qs('.button-view-style_active');

       /* this.imagesBlock.addEventListener('click',(e)=>{
            let currentBut = closest(e.target, '.button-view-style');
            if(!currentBut) return;
            if(currentBut.dataset.type == 'block'){
                this.imagesBlock.classList.remove('filter-block_item-image_full-width')
            }
            else if(currentBut.dataset.type == 'list'){
                this.imagesBlock.classList.add('filter-block_item-image_full-width')
            }
            if(!(activeViewButton == currentBut)){
                activeViewButton.classList.remove('button-view-style_active')
                currentBut.classList.add('button-view-style_active')
                activeViewButton = currentBut
            }
        })*/

        $bubble(this.imagesBlock,'click','.button-view-style',({matchTarget})=>{
            if(matchTarget.dataset.type == 'block'){
                this.imagesBlock.classList.remove('filter-block_item-image_full-width')
            }
            else if(matchTarget.dataset.type == 'list'){
                this.imagesBlock.classList.add('filter-block_item-image_full-width')
            }
            if(!(activeViewButton == matchTarget)){
                activeViewButton.classList.remove('button-view-style_active')
                matchTarget.classList.add('button-view-style_active')
                activeViewButton = matchTarget;
            }
        })
        $bubble(this.imagesBlock,'click','.item__details',({matchTarget})=>{
            let item = closest(matchTarget,'.filter__item')
            item.style.flexBasis = '100%'
            let details = qs('.item__details-block',item)

            details.classList.add('item__details-block_active')
        })

        /*$delegate(this.imagesBlock,'.item__details','click',({target})=>{
            let item = closest(target,'.filter__item')
            item.style.flexBasis = '100%'
            let details = qs('.item__details-block',item)

            details.classList.add('item__details-block_active')




            //this.imagesBlock.classList.toggle('filter-block_item-image_full-width')
        })*/
        $bubble(this.imagesBlock,'click','.details__close',({matchTarget})=>{
            let details = closest(matchTarget,'.item__details-block')
            let item = closest(matchTarget,'.filter__item')
            item.style.flexBasis = ''
            console.log(details);
            details.classList.remove('item__details-block_active')
        })
       /* $delegate(this.imagesBlock,'.details__close','click',({target})=>{
            let details = closest(target,'.item__details-block')
            let item = closest(target,'.filter__item')
            item.style.flexBasis = ''
            console.log(details);
            details.classList.remove('item__details-block_active')
            //this.imagesBlock.classList.toggle('filter-block_item-image_full-width')
        })*/
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
                console.log('View data has type is ', picture)
                this.disabledDropdownZone()
                //Обрезаем изображение сжимем его.
                //let ratioImg = getRatioImage(picture)
                let DOM_token = this.temp.getDomImage(picture)


                if(this.itemsBlock.childNodes.length>1){
                    let el = this.itemsBlock.lastChild;
                    this.itemsBlock.removeChild(el)
                }

                let d = this.itemsBlock.insertAdjacentHTML('beforeend',DOM_token)
                let c = qs('.myChart',this.itemsBlock.lastChild);

                 setTimeout(()=>{
                     this.initLineChart(c,picture.data)
                 },0)
               // this.itemsBlock.insertAdjacentHTML('beforeend',DOM_token)
            }
        }

        types[type]();

    }

    initLineChart(canvas,data){

        let lab = ()=>{
            let ar = [];
            for(let i=0;i<=255;i++){

                    ar.push(i)

            }
            return ar;
        }
        console.log(lab())
        var _data = {
            labels: lab(),
            datasets: [
                {
                    label: "Gistogram",
                    fill: true,
                    lineTension: 0.9,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: data,
                    spanGaps: true,
                }
            ]
        };

        var myLineChart = new Chart(canvas, {
            type: 'line',
            data: _data,
            options: {
                responsive: true,
                scales: {
                    xAxes: [{

                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 15
                        }
                    }],
                    yAxes: [{

                        ticks: {

                            maxTicksLimit: 10
                        }
                    }]
                }
            }
        })

        this.lineCharts[canvas] = myLineChart;
    }

}