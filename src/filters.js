export default class Filters{
    constructor(imageData, logoMark){
        this.imageData = imageData;
        this._data = imageData.data;
        this._widthImage = imageData.width;
        this._heightImage = imageData.height;
        this.logoMark = logoMark;
        console.log('НАША ШИРИНА !!!!',this.imageData);
        if(logoMark)
            this._dataLogo = logoMark.data;

        /*  this.LoG_mask = [
            [0,1,1,2,2,2,1,1,0],
            [1,2,4,5,5,5,4,2,1],
            [1,4,5,3,0,3,5,4,1],
            [2,5,3,-12,-24,-12,3,5,2],
            [2,5,0,-24,-40,-24,0,5,2],
            [2,5,3,-12,-24,-12,3,5,2],
            [1,4,5,3,0,3,5,4,1],
            [1,2,4,5,5,5,4,2,1],
            [0,1,1,2,2,2,1,1,0]

        ]*/
        /*
        this.LoG_mask = [
            [0,0,0,-1,-1,-2,-1,-1,0,0,0],
            [0,0,-2,-4,-8,-9,-8,-4,-2,0,0],
            [0,-2,-7,-15,-22,-23,-22,-15,-7,-2,0],
            [-1,-4,-15,-24,-14,-1,-14,-24,-15,-4,-1],
            [-1,-8,-22,-14,52,103,52,-14,-22,-8,-1],
            [-2,-9,-23,-1,103,180,103,-1,-23,-9,-2],
            [-1,-8,-22,-14,52,103,52,-14,-22,-8,-1],
            [-1,-4,-15,-24,-14,-1,-14,-24,-15,-4,-1],
            [0,-2,-7,-15,-22,-23,-22,-15,-7,-2,0],
            [0,0,-2,-4,-8,-9,-8,-4,-2,0,0],
            [0,0,0,-1,-1,-2,-1,-1,0,0,0]
        ]
        this.LoG_mask = [
            [0,1,0],
            [1,-4,1],
            [0,1,0]
        ]*/
/*

        this.LoG_mask = [
            [-1,-2,-1],
            [0,0,0],
            [1,2,1]
        ]
 */
        this.LoG_mask = [
            [0,0,1,0,0],
            [0,1,2,1,0],
            [1,2,-16,2,1],
            [0,1,2,1,0],
            [0,0,1,0,0]
        ]

        this.masks = {
            '3': [
                    [0,1,0],
                    [1,-4,1],
                    [0,1,0]
                ],
            '5': [
                [0,0,1,0,0],
                [0,1,2,1,0],
                [1,2,-16,2,1],
                [0,1,2,1,0],
                [0,0,1,0,0]
            ],
            '7': [
                [0,0,1,0,0],
                [0,1,2,1,0],
                [1,2,-16,2,1],
                [0,1,2,1,0],
                [0,0,1,0,0]
            ],
            '9':[
                [0,1,2,4,4,4,2,1,0],
                [1,3,7,10,11,10,7,3,1],
                [2,7,11,6,1,6,11,7,2],
                [4,10,6,-24,-48,-24,6,10,4],
                [4,11,1,-48,-83,-48,1,11,4],
                [4,10,6,-24,-48,-24,6,10,4],
                [2,7,11,6,1,6,11,7,2],
                [1,3,7,10,11,10,7,3,1],
                [0,1,2,4,4,4,2,1,0]
            ],
            '11':[
                [0,0,0,-1,-1,-2,-1,-1,0,0,0],
                [0,0,-2,-4,-8,-9,-8,-4,-2,0,0],
                [0,-2,-7,-15,-22,-23,-22,-15,-7,-2,0],
                [-1,-4,-15,-24,-14,-1,-14,-24,-15,-4,-1],
                [-1,-8,-22,-14,52,103,52,-14,-22,-8,-1],
                [-2,-9,-23,-1,103,180,103,-1,-23,-9,-2],
                [-1,-8,-22,-14,52,103,52,-14,-22,-8,-1],
                [-1,-4,-15,-24,-14,-1,-14,-24,-15,-4,-1],
                [0,-2,-7,-15,-22,-23,-22,-15,-7,-2,0],
                [0,0,-2,-4,-8,-9,-8,-4,-2,0,0],
                [0,0,0,-1,-1,-2,-1,-1,0,0,0]
            ]
        }
/*
        this.LoG_mask = [
            [0,1,2,4,4,4,2,1,0],
            [1,3,7,10,11,10,7,3,1],
            [2,7,11,6,1,6,11,7,2],
            [4,10,6,-24,-48,-24,6,10,4],
            [4,11,1,-48,-83,-48,1,11,4],
            [4,10,6,-24,-48,-24,6,10,4],
            [2,7,11,6,1,6,11,7,2],
            [1,3,7,10,11,10,7,3,1],
            [0,1,2,4,4,4,2,1,0]
        ]*/
       // console.log('Информация из конструктора ширина и высота', this._widthImage, this._heightImage)
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
    getCurrentPixelLogo(x,y) {
        var correctPixel = (x+y*this.logoMark.width)*4;
        let d =  this._dataLogo;
        return [d[correctPixel],d[correctPixel+1],d[correctPixel+2],d[correctPixel+3]]
    }
    getCurrentPixelLogoByNumber(N) {
        let index = N*4;
        let d =  this._dataLogo;
        return d[index];
    }
    setCurrentPixel(x,y,data){
        var correctPixel = (x+y*this._widthImage)*4;
        let d = this._data;
        d[correctPixel] = data[0];
        d[correctPixel+1] = data[1];
        d[correctPixel+2] = data[2];
        d[correctPixel+3] = data[3];
    }

    setCurrentPixelBlueEd(x,y,index){
        var correctPixel = (x+y*this._widthImage)*4;
        let d = this._data;
        let [r,g,b,a] = this.getCurrentPixel(x,y);
        const bright = 0.299*r + 0.587*g + 0.114*b;

        d[correctPixel+2] = (index)? d[correctPixel+2] + 30:  d[correctPixel+2] - 30 ;
    }
    setCurrentPixelLogo(x,y,data){
        var correctPixel = (x+y*this.logoMark.width)*4;
        let d =  this._dataLogo;
        d[correctPixel] = data[0];
        d[correctPixel+1] = data[1];
        d[correctPixel+2] = data[2];
        d[correctPixel+3] = data[3];
    }
    getImageData(){
        return this.imageData
    }
    setCustomPixel(n, obj, data){
        var correctPixel = (n)*4;
        let d = obj;
        d[correctPixel] = data*255;
        d[correctPixel+1] = data*255;
        d[correctPixel+2] = data*255;
        d[correctPixel+3] = 255;
    }
    getLogoFromImage(img) {
        var imageData = img.data;
        const image = this.imageData;
        let counter = 0;
        let logoCounter = 0;
        for(let i = 2; i < (image.width-2); i++){
            if(counter === 3){
                counter = 0;
            }
            for(let j = 2+counter; j < (image.height-2); j=j+3){
                let flag = this.getNewLOGOPIXEL(i,j);
                //console.log('flag',flag)
                if (flag>0){
                    this.setCustomPixel(logoCounter,imageData,1);
                } else {
                    this.setCustomPixel(logoCounter,imageData,0);
                }

                logoCounter++;
                if(logoCounter>(200*200)) return img;
            }
            counter++;
        }
        return img;
    }
    getNewLOGOPIXEL (x,y) {
        let value = 0;
        for (let i = 1; i <= 2; i++){
            value = value + this.getCurrentPixel(x,y+i)[2]
                          + this.getCurrentPixel(x,y-i)[2]
                          + this.getCurrentPixel(x+i,y)[2]
                          + this.getCurrentPixel(x-i,y)[2]
        }
        return (this.getCurrentPixel(x,y)[2] - (value/(4*2)));
    }
    insertLogoIntoImage () {
        const logo = this.logoMark;
        const image = this.imageData;
        let key = 0;
        // binary logo
        for(let i = 0; i < logo.width; i++) {
            for(let j = 0; j < logo.height; j++){
                let [R,G,B,A] = this.getCurrentPixelLogo(i,j);
                const bright = 0.299*R + 0.587*G + 0.114*B;
                key = key + bright;
                if (bright >= 180 ) {
                    this.setCurrentPixelLogo(i, j, [255, 255, 255, 255])
                } else {
                    this.setCurrentPixelLogo(i, j, [0,0,0, 255]);
                }
            }
        }

        let counter = 0;
        let logoCounter = 0;
        let imageKey = 0
        for(let i = 2; i < (image.width-2); i++){
            if(counter === 3){
                counter = 0;
            }
            for(let j = 2+counter; j < (image.height-2); j=j+3){
                let [R,G,B,A] = this.getCurrentPixel(i,j);
                const bright = 0.299*R + 0.587*G + 0.114*B;
                imageKey = imageKey + bright*100;
                let logoPixel = this.getCurrentPixelLogoByNumber(logoCounter);
                logoCounter++;
                //if(!logoPixel) return this;
                this.setCurrentPixelBlueEd(i,j,logoPixel);
            }
            counter++;
        }
        key = imageKey;
        return [logo, key];
    }
    customSerialize() {
        const image = this.imageData;
        let counter = 0;
        let logoCounter = 0;
        let imageKey = 0
        for(let i = 2; i < (image.width-2); i++){
            if(counter === 3){
                counter = 0;
            }
            for(let j = 2+counter; j < (image.height-2); j=j+3){
                let [R,G,B,A] = this.getCurrentPixel(i,j);
                const bright = 0.299*R + 0.587*G + 0.114*B;
                imageKey = imageKey + bright*100;
            }
            counter++;
        }

        return imageKey;
    }
    customFilter(callback){
        let cb = callback.bind(this);
        for(let i =0; i < this._widthImage; i++) {
            for (let j = 0; j < this._heightImage; j++) {
                let pixels = this.getCurrentPixel(i,j);
                let settingPixel = cb(pixels);
                this.setCurrentPixel(i,j,settingPixel);
            }
        }
    }
    overlayMask(x,y,maskSize){
        let mask = this.masks[maskSize];
        let centerMask = (mask.length-1)/2;
        let relay = 0;

        for(let i=0; i < mask.length; i++){
            for(let j = 0; j < mask.length; j++){

                let infoAboutPixel = this.getCurrentPixel(x-centerMask+j,y-centerMask+i);
                let R,G,B,A;
                //console.log(infoAboutPixel[0])
                if(infoAboutPixel[0]){
                    [R,G,B,A] = infoAboutPixel;
                }
                else {
                    //console.log('from getPxel',this.getCurrentPixel(x,y));
                    [R,G,B,A] = this.getCurrentPixel(x,y);
                }

                //console.log( [R,G,B,A])
                let bright = 0.299*R + 0.587*G + 0.114*B;
                relay += bright*mask[i][j];
            }
        }
        return relay;
    }
    pullInfoconsole(){
            let r = [];
            for(let i = 0; i < this._widthImage; i++){
                r[i] = [];
                for(let j = 0; j < this._heightImage; j++){
                     r[i][j] = this.getCurrentPixel(i,j);
                }
            }
           // console.log('GetInformPixels',r)
    }
    LoGfilter(maskSize){
        let i,j;
        let r = [];
        for( i = 0; i < this._widthImage; i++){
          r[i] = [];
            for( j = 0; j < this._heightImage; j++){
                let response = this.overlayMask(i,j,maskSize);
               // this.setCurrentPixel(i,j,[r,r,r,255])
            r[i][j] = Math.round(response);
            }
        }
       // console.log('Che',r.concat([]));
       // if(r[i][j] > 0 && (r[i][j+1] < 0 || ))
        for(i = 0; i < r.length-1; i++){
           // console.log('dfs')

             for( j = 0; j < r[0].length; j++ ){

                if(r[i][j]<=0){
                     r[i][j] = 0;
                 }
                 else {
                   // if( r[i][j]* r[i][j+1] < 0 || r[i][j]* r[i+1][j+1] < 0 || r[i][j]* r[i+1][j] < 0)
                     r[i][j] = ( r[i][j] >= 255)? 255 : r[i][j] //(r[i][j]>80)? 255 : 0;
                    /*else {
                        r[i][j] = 0
                    }*/
                    //r[i][j] = ( r[i][j]/80 >= 255)? 255 : 0;
                 }
                 /*
                 if(r[i][j]*r[i][j+1] < 0 ){
                     r[i][j] = 255;
                 }
                 else {
                     r[i][j] = 0;
                 }*/
                 this.setCurrentPixel(i,j,[r[i][j],r[i][j],r[i][j],255]);
                 /*  if(r[i][j]*r[i][j+1] < 0 || r[i][j]*r[i+1][j] < 0 || r[i][j]*r[i+1][j+1] < 0 ){
                     r[i][j] = 255
                 }
                 else {
                     r[i][j] = 0
                 }
                if((r[i][j] > 0 && r[i][j+1] < 0) || (r[i][j] < 0 && r[i][j+1] > 0) ||
                    (r[i][j] > 0 && r[i+1][j] < 0) || (r[i][j] < 0 && r[i+1][j] > 0) ||
                    (r[i][j] > 0 && r[i+1][j+1] < 0) || (r[i][j] < 0 && r[i+1][j+1] > 0)
                ){
                    if((r[i][j] < 0 && r[i][j+1] == 0)  ){
                        r[i][j] = 255;
                        //this.setCurrentPixel(i,j,[r[i][j],r[i][j],r[i][j],255]);
                    }
                   // r[i][j] = 255;
                    //console.log(r[i][j])

                }
                else {
                    r[i][j] = 0;
                    //this.setCurrentPixel(i,j,[r[i][j],r[i][j],r[i][j],128]);
                }*/
                //if(r[i][j]/(r[i][j]+1) )
               // this.setCurrentPixel(i,j,[r[i][j],r[i][j],r[i][j],255]);
              //  this.setCurrentPixel(i,j+1,[r[i][j+1],r[i][j+1],r[i][j+1],255]);
                //console.log('somethidn')
            }

        }
        console.log('sdfsdfsdf',r)
       /* for(i = 0; i < r.length-1; i++) {
            // console.log('dfs')

            for (j = 0; j < r[0].length-1; j++) {
                if(r[i][j]*r[i][j+1] < 0  || r[i][j]*r[i+1][j+1] < 0 || r[i][j]*r[i+1][j] < 0 ){
                    r[i][j] = 255;
                }
                else {
                    r[i][j] = 0;
                }
                this.setCurrentPixel(i,j,[r[i][j],r[i][j],r[i][j],255]);
            }
        }*/


                return this;
    }
    getMatrInf(){

    }
    brigFilter(inform){
        for(let i = 0; i < inform.length; i++){
            for(let j = 0; j < inform[0].length; j++){
                this.setCurrentPixel(i,j,[inform[i][j],
                                         inform[i][j],
                                         inform[i][j],
                                         inform[i][j]])
            }
        }
    }
    getBrightness(){
        let brightnessMatrix = [];
        for(let i =0; i < this._widthImage; i++){
            brightnessMatrix[i] = [];
            for(let j = 0; j < this._heightImage; j++){
                let [R,G,B,A] = this.getCurrentPixel(i,j);

                let brightness = 0.299*R + 0.587*G + 0.114*B;
                brightnessMatrix[i][j] = Math.floor(brightness);
            }
        }
        return brightnessMatrix;
    }
    getGistogrammInfo(){
        let d = this._data;
        let ar = [];
        for(let i = 0; i < this._widthImage; i++){
            for(let j = 0; j < this._heightImage; j++){
               let [R,G,B,A] = this.getCurrentPixel(i,j);
               let bright = Math.floor(0.299*R + 0.587*G + 0.114*B);
               ar[bright] = (ar[bright])? ar[bright]+1: 1;
            }
        }
        for(let i = 0; i <=255; i++){
            ar[i] = (ar[i])? ar[i] : 0;
        }
        return ar;
    }
}