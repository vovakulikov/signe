/**
 * Created by Vova on 26.02.2017.
 */


export default class Template{
    constructor(sizeGrid){
       // this.size = sizeGrid || 3;
    }

    getGridList(size){
        let str = ``;
        for(let i = 0; i < size*size; i++){
            str = str + `<div class="grid-pixel-item"></div>`;
        }
        return str;
    }
}