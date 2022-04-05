/* import Vue from 'vue'
var bus = new Vue(); */

import mitt from 'mitt'

const bus = mitt()

export { bus as default }