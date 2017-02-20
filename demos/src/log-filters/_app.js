import Controller from './controller.js';
import View from './view';
import Store from './store';

const store = new Store();
const view = new View();

const controller = new Controller(store,view);


