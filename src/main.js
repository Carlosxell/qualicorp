import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { clearStrCharacters } from './filters/filters';

Vue.config.productionTip = false;

Vue.filter('clearStrCharacters', clearStrCharacters);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
