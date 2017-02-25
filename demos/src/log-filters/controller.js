/**
 * Created by Vova on 19.02.2017.
 */

export default class Controller {
    constructor(store, view){
        this.store = store;
        this.view = view;

        view.bindUploadImage(this.uploadImage.bind(this));
        view.bindStartFiltering(this.processingImage.bind(this));
    }

    uploadImage(evt){
        this.store.loadImage(evt)
            .then(picture=>{
                this.view.render('firstPaint',picture);
            })
    }
    processingImage(data){
        let pixels = this.store.processingImage(data);
        this.view.render('afterFilter', pixels);
    }

}