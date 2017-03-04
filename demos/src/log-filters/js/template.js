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
                                    <button>Download</button>
                                    <button>Details</button>
                                </div>
                               <img class="item__img" src="${data.picture.src}" alt="">   
                            </div>
                            <div class="item__details-block"class="img-details hide">
                                <header class="details__header">
                                    <h2>Details</h2>
                                 </header>
                                ${_sizeBlock}
                                <div class="details__lineChart">
                                     <canvas class="myChart" ></canvas>
                                </div>
                            </div>
                     </div>`

        return _temp;
    }

    details(data) {
        let tables = '';
        for (let key in data) {
            tables = tables + this.convertToTable(data[key]);
        }
        return `<div class="details__info-block">
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