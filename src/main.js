import Vue from "vue";

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import VueRouter from "vue-router";
import App from "./App.vue";

// Custom components
import Restaurants from "./components/Restaurants.vue";
import RestaurantDetail from "./components/RestaurantDetail.vue";
import ErrorVue from "./components/Error.vue";
import Cart from "./components/Cart.vue";
import Menu from "./components/Menu.vue";
import Api from "./api/Api";

//Map import
import { L, LMap, LTileLayer, LMarker } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";

Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-marker", LMarker);

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

//Global variable
Vue.API = Vue.prototype.API = new Api();

// Librairies graphiques
Vue.use(Vuetify);

// COMPOSANT GLOBAL qui peut être utilisé n'importe où
Vue.component("app-restaurants", Restaurants);
Vue.component("app-restaurant-detail", RestaurantDetail);
Vue.component("app-menu", Menu);
Vue.component("app-cart", Cart);

// Définition des routes
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Restaurants
  },
  {
    path: "/:id",
    name: "detail",
    component: RestaurantDetail
  },
  {
    path: "/:id/menu",
    name: "menu",
    component: Menu
  },
  {
    path: "*",
    name: "error",
    component: ErrorVue
  }
];

const router = new VueRouter({
  routes: routes,
  mode: "history"
});

new Vue({
  el: "#app",
  router: router,
  render: h => h(App)
});
