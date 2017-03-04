/**
 * Created by Vova on 26.02.2017.
 */


export default class Template{
    constructor(sizeGrid){
       // this.size = sizeGrid || 3;
    }
    getDomImage(data){
        console.log(data)
        let _sizeBlock = (!data.sizing)? '' : `<div>
                                                    <div>${data.sizing.small_width}</div>
                                                    <div>${data.sizing.small_height}</div>
                                                    <div>${data.sizing.full_width}</div>
                                                    <div>${data.sizing.full_width}</div>
                                               </div>`;
        let _temp = `<div class="filter__item">
                            <div class="item__image-wrap">
                               <div class="item__controll-image">
                                    <button>Download</button>
                                    <button>Details</button>
                                </div>
                               <img class="item__img" src="${data.picture.src}" alt="">   
                            </div>
                            <div class="item__details-block hide"class="img-details hide">
                                ${_sizeBlock}
                            </div>
                     </div>`

        return _temp;
    }
}