import Controller from './controller.js';
import View from './view';
import Store from './store';

const store = new Store();
const view = new View();

new Controller(store,view);

let Chart;

require.ensure(['chart.js'], function() {
    Chart = require('chart.js')
})
