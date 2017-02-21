/**
 * Created by Vova on 19.02.2017.
 */

export default class Controller {
    constructor(store, view){
        this.store = store;
        this.view = view;

        view.bindUploadImage(this.uploadImage.bind(this));
        view.bindStartFiltering(this.processingImage.bind(this));
        console.log('conroller is active.')
    }

    uploadImage(evt){
        this.store.loadImage(evt)
            .then(picture=>{
                this.view.render('firstPaint',picture);
                //Yes, this is crazy, but we need get data fro

            })
    }
    processingImage(data){
        let pixels = this.store.processingImage(data);

        this.view.render('afterFilter', pixels);

    }

}