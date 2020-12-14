import "core-js/stable";
import Vue from "vue";
import App from "./App";
import router from "./router";
import CoreuiVue from "@coreui/vue";
import axios from "axios";
import { iconsSet as icons } from "./assets/icons/icons.js";
import store from "./store";
import Vuelidate from "vuelidate";
import { VueMaskDirective } from "v-mask";
import moment from "moment";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

Vue.config.performance = true;
Vue.use(CoreuiVue);
Vue.use(Vuelidate);
Vue.use(VueSweetalert2);
Vue.directive("mask", VueMaskDirective);

Vue.prototype.$log = console.log.bind(console);
Vue.prototype.$http = axios;

const filter = function(text, length, clamp) {
  clamp = clamp || "...";
  const node = document.createElement("div");
  node.innerHTML = text;
  const content = node.textContent;
  return content.length > length ? content.slice(0, length) + clamp : content;
};

Vue.filter("truncate", filter);

Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("MM/DD/YYYY hh:mm");
  }
});

new Vue({
  el: "#app",
  router,
  store,
  icons,
  template: "<App/>",
  components: {
    App,
  },
});
