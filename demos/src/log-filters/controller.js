/**
 * Created by Vova on 19.02.2017.
 */

export default class Controller {
    constructor(store, view){
        this.store = store;
        this.view = view;

        view.bindUploadImage(this.uploadImage.bind(this));
        view.bindStartFiltering(this.processingImage.bind(this));
        view.bindRenderingLineChart(this.getGistogrammInfo.bind(this));
    }

    uploadImage(evt){
        //this.view.loadSpin()
        this.store.loadImage(evt)
            .then(picture=>{
                this.view.render('firstPaint',picture);
            })


    }
    processingImage(data){
        //console.log('to arg controller',data)
       /* let pixels = this.store.processingImage(data);
        this.view.render('afterFilter', pixels);*/
        //console.log('main Thread',data);


       this.store.processingImageWorker({
            "func":'processingImage',
            'infoPixel':data
        })
            .then(d=>{
                console.log('worker thread',d)
                this.view.render('afterFilter', d.resposne);
                //return Promise.resolve();
            })
           /*.then(()=>{
               return this.store.processingImageWorker({
                   "func":'gistogrammPrepare',
                   'infoPixel':data
               })
           })
           .then((d)=>{
               console.log('gistogramm is',d.resposne);
               console.log('Hello world ')
           })*/


    }

    getGistogrammInfo(data){
        console.log(data);
        this.store.processingImageWorker({
            "func":'gistogrammPrepare',
            'infoPixel':data
        })
            .then(d=>{
                //console.log('gistogramm is', d)
                this.view.renderLineChart(d)
            })
    }

}