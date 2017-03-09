import Controller from './controller.js';
import View from './view.js';
import Store from './store.js';

const store = new Store();
const view = new View();

new Controller(store,view);

let Chart;

require.ensure(['chart.js'], function() {
    Chart = require('chart.js')
})
