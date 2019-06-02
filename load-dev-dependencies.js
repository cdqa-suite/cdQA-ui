import Vue from 'vue'
import MyComponent from './src/entry';

import BootstrapVue from "bootstrap-vue"
import ToggleButton from "vue-js-toggle-button"

Vue.use(BootstrapVue);
Vue.use(ToggleButton);

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.config.productionTip = false

// Mount custom component in div provided by vue cli dev server
new Vue({
    render: h => h(MyComponent)
}).$mount('#app');