import Vue from 'vue';
import iView, { Message } from 'iview';
import VueRouter from 'vue-router';
import 'iview/dist/styles/iview.css';
import lodash from 'lodash';
import axios from 'axios';
import qs from 'qs';
import Routers from './router';
import App from './app.vue';
import Vuex from 'vuex';
import store from './store'

Vue.config.devtools = process.env.NODE_ENV === 'development';
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(iView);
Vue.use(Vuex);

axios.interceptors.response.use(response => {
  if (!response.data) {
    Message.error({content: '未获取到数据'});
    return Promise.reject(new Error('response is null'));
  }
  const {code, msg} = response.data;
  if (typeof code === 'number' && code !== 0) { // 获取menu接口无code属性
    Message.error({content: msg.replace('异常', '繁忙')});
    return Promise.reject(new Error(msg));
  }
  return response;
}, error => {
  Message.error({content: error.message});
  return Promise.reject(error);
});

Vue.prototype.commonUrl = 'http://ms.do-ok.com:18010';
Vue.prototype.dataCenterUrl = 'http://ms.do-ok.com:18000';
Vue.prototype.$http = axios;
Vue.prototype.$_ = lodash;
Vue.prototype.$qs = qs;
Vue.prototype.getHeader = () => ({headers: {Authorization: sessionStorage.getItem('token')}});
Vue.prototype.getSchoolCode = () => sessionStorage.getItem('schoolCode');

const router = new VueRouter({
  mode: 'history',
  routes: Routers
});

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  window.document.title = to.meta.title || '数据中心';
  next();
});

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
