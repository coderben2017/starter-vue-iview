import Vue from 'vue';
import iView, { Message } from 'iview';
import VueRouter from 'vue-router';
import 'iview/dist/styles/iview.css';
import lodash from 'lodash';
import axios from 'axios';
import qs from 'qs';
import Routers from './router';
import Util from './utils/util';
import App from './app.vue';

Vue.use(VueRouter);
Vue.use(iView);

axios.interceptors.response.use(response => {
  const {code, msg} = response.data;
  if (code !== 0) {
    Message.error({
      content: msg.replace('异常', '繁忙')
    });
    return Promise.reject(new Error(msg));
  }
  return response;
}, error => {
  Message.error({
    content: error.message
  });
  return Promise.reject(error);
});

Vue.prototype.commonUrl = 'http://ms.do-ok.com:18010';
Vue.prototype.dataCenterUrl = 'http://ms.do-ok.com:1800';
Vue.prototype.$http = axios;
Vue.prototype.$_ = lodash;
Vue.prototype.$qs = qs;
Vue.prototype.getHeader = () => ({headers: {Authorization: sessionStorage.getItem('token')}});
Vue.prototype.getSchoolCode = () => sessionStorage.getItem('schoolCode');

// 路由配置
const router = new VueRouter({
  mode: 'history',
  routes: Routers
});

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  Util.title(to.meta.title);
  next();
});

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
