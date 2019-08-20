import Vue from 'vue';
import Vuex from 'vuex';
import menuStore from './modules/menu';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    menuStore
  }
});
