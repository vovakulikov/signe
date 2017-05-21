/**
 * Created by Vova on 19.02.2017.
 */

export default class Controller {
    constructor(store, view){
        this.store = store;
        this.view = view;

        view.bindUploadImage(this.uploadImage.bind(this));
        view.bindStartFiltering(this.processingImage2.bind(this));
        view.bindUploadLogoImage(this.uploadLogoImage.bind(this));
        view.bindStartGetting(this.processingImage3.bind(this));

    }
    uploadLogoImage(evt){
        this.store.loadLogoImage(evt)
            .then((picture)=>{
                this.view.render('add-item-logo-image',picture);
                console.log('LOGO PICTURE', picture)
            })
    }

    uploadImage(evt){
        this.store.loadImage(evt)
            .then((picture)=>{
                this.view.render('add-item-image',picture);
            })


    }
    processingImage(){
        //console.log('to arg controller',data)
       /* let pixels = this.store.processingImage(data);
        this.view.render('afterFilter', pixels);*/
        //console.log('main Thread',data);
        // console.log('обьект с настройками',this.view.getSettings());
       let formData =  this.view.getSettings()
       this.store.processingImageWorker({
            "func":'processingImage',
            'infoPixel':this.store.gitImageSmall,
            'options':{
                sizeMatr: 5,
                typeFilter: 'Log-filter'
            }
        })
            .then(d=>{
                console.log('worker thread',d)

                this.view.render('add-item-image',d);
                //this.view.render('afterFilter', d.resposne);
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
    processingImage3(){
        //console.log('to arg controller',data)
        /* let pixels = this.store.processingImage(data);
         this.view.render('afterFilter', pixels);*/
        //console.log('main Thread',data);
        // console.log('обьект с настройками',this.view.getSettings());
        let formData =  this.view.getSettings()
        var canvas = document.createElement('canvas')
        var ctx = canvas.getContext('2d');
        var img = ctx.createImageData(200, 200);
        var imageData = img.data;

        this.store.processingImageWorker({
            "func":'gettigLogo',
            'infoPixel':this.store.gitImageSmall,
            'options':{
                sizeMatr: 5,
                typeFilter: 'Log-filter',
                canvas: img
            }
        })
            .then(d=>{
                console.log('{Хееййййй вот то что пришло из воркера при потпытке лго',d)

                this.view.render('add-item-image',d);
                //this.view.render('afterFilter', d.resposne);
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
    processingImage2(){
        //console.log('to arg controller',data)
        /* let pixels = this.store.processingImage(data);
         this.view.render('afterFilter', pixels);*/
        //console.log('main Thread',data);
        // console.log('обьект с настройками',this.view.getSettings());
        let formData =  this.view.getSettings()
        this.store.processingImageWorker({
            "func":'processingImage2',
            'infoPixel':this.store.gitImageSmall,
            'infoPixelLogo': this.store.gitImageLogoFull,
            'options':{
                sizeMatr: 5,
                typeFilter: 'Log-filter'
            }
        })
            .then(d=>{
                console.log('worker thread',d)

                this.view.render('add-item-image',d);
                //this.view.render('afterFilter', d.resposne);
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
                Object.assign(d,{sizing:{}})
                this.view.renderLineChart(d)
            })
    }

}