export default class Filters{
    constructor(imageData){
        this.imageData = imageData;
        this._data = imageData.data;
        this._widthImage = imageData.width;
        this._heightImage = imageData.height;

        console.log('Информация из конструктора ширина и высота', this._widthImage, this._heightImage)
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
    invert(){
        let imageLength = this._widthImage *  this._heightImage * 4;
        let d = this._data;

        for(let i = 0; i < imageLength; i+= 4){
            let red = d[i],
                green = d[i+1],
                blue = d[i+2];

            d[i] = 255 - red;
            d[i+1] = 255 - green;
            d[i+2] = 255 - blue;
        }

        return this;

    }
    sobelOperator(){
        let imageLength = this._widthImage *  this._heightImage * 4;
        let d = this._data;


    }
    getCurrentPixel(x,y){
        var correctPixel = (x+y*this._widthImage)*4;
        let d = this._data;
        return [d[correctPixel],d[correctPixel+1],d[correctPixel+2],d[correctPixel+3]]
    }
    getImageData(){
        return this.imageData
    }

}