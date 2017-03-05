/**
 * Created by Vova on 26.02.2017.
 */


export default class Template {
    constructor(sizeGrid) {
        // this.size = sizeGrid || 3;
    }

    getDomImage(data) {
        console.log(data)
        let _sizeBlock = (!data.sizing) ? '' : this.details(data.sizing)
        let _temp = `<div class="filter__item">
                            <div class="item__image-wrap">
                               <div class="item__controll-image">
                                    <button class="sup-item-button">
                                        <span>Download</span>
                                        <svg class="small-icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                             viewBox="0 0 516.451 516.451" style="enable-background:new 0 0 516.451 516.451;" xml:space="preserve">
                                        
                                                <g>
                                                    <path d="M390.242,202.892h-84.075V13.455C306.167,6.024,294.346,0,279.761,0h-46.213c-14.583,0-26.408,6.024-26.408,13.455
                                                        v189.437h-84.071c-8.433,0-15.269,5.339-15.269,11.927c0,0,125.952,184.874,137.404,193.819c11.449,8.947,22.899,0,22.899,0
                                                        l137.404-193.819C405.507,208.231,398.672,202.892,390.242,202.892z"/>
                                                    <path d="M408.651,497.323c0,10.565-7.475,19.128-16.7,19.128H124.727c-9.221,0-16.7-8.563-16.7-19.128v-19.128
                                                        c0-10.565,7.479-19.128,16.7-19.128H391.95c9.225,0,16.7,8.563,16.7,19.128L408.651,497.323L408.651,497.323z"/>
                                                </g>
                                        
                                        </svg>

                                    </button>
                                    <button class="details-button_contrast sup-item-button item__details">
                                        <span>Details</span>
                                        <svg class="small-icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                             viewBox="0 0 475 475" >
                                                <g>
                                                    <path d="M238,0C107,0,0,107,0,238s107,237,238,237s237-106,237-237S369,0,238,0z M238,432
                                                        c-107,0-194-87-194-194S131,44,238,44s194,87,194,194S345,432,238,432z"/>
                                                    <path d="M270,323l-20,9l26-133c3-14-12-29-28-20l-49,27c-9,5-12,17-7,26s17,12,26,7l12-6l-25,127
                                                        c-2,11,7,23,19,23c3,0,6-1,8-2l53-23c10-4,14-15,10-25S280,319,270,323z"/>
                                                    <path d="M257,143c15,0,27-12,27-27s-12-27-27-27s-27,12-27,27S242,143,257,143z"/>
                                                </g>
                                        </svg>
                                    </button>
                                </div>
                               <img class="item__img" src="${data.picture.src}" alt="">   
                            </div>
                            <div class="item__details-block" >
                                 <button class="sup-item-button details__close">
                                    <svg class="small-icon small-icon_alone icon_trans" version="1.1" id="Capa_1" viewBox="0 0 47.971 47.971" >
                                        <g>
                                            <path d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88
                                                c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242
                                                C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879
                                                s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"/>
                                        </g>
                                    </svg>
                                 </button>
                                 <div class="details__lineChart">
                                     <h2>Gistogramm graph</h2>
                                     <canvas class="myChart" ></canvas>
                                 </div>
                                ${_sizeBlock}
                            </div>
                     </div>`

        return _temp;
    }

    details(data) {
        let tables = '';
        for (let key in data) {
            tables = tables + this.convertToTable(data[key]);
        }
        return `<header class="details__header">
                    <h2>Details</h2>
                </header>
                <div class="details__info-block">
                    ${tables}
                </div>`
    }

    convertToTable(inf) {
        let caption = (!inf.caption) ? '' : `<caption class="details__table__caption">${inf.caption}</caption>`;
        let trs = '';
        for (let key in inf) {
            if(key == 'caption') continue;
            trs = trs + `<tr>
                                <td>${key}</td>
                                <td>${inf[key]}</td>
                            </tr>`
        }
        return `<table class="details__table">
                            ${caption}
                            <tbody>${trs}</tbody>
                      </table>`;

    }
}