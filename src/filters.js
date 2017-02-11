export default class Filters{
    constructor(imageData){
        this.imageData = imageData;
        this._data = imageData.data;
        this._widthImage = imageData.width;
        this._heightImage = imageData.height;
    }

    convertToGray(){
        let imageLength = this._widthImage *  this._heightImage * 4;
        let d = this._data;
        for(let i = 0; i < imageLength; i+= 4){
            let red = d[i],
                green = d[i+1],
                blue = d[i+2];

            let gray = parseInt((red+green+blue)/3);
            d[i] = d[i+1] = d[i+2] = gray;
        }

        return this;
    }
    getImageData(){
        return this.imageData
    }

}