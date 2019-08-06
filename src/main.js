import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router/router';
import Util from './utils/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import lodash from 'lodash';
import axios from 'axios';
import qs from 'qs';

Vue.use(VueRouter);
Vue.use(iView);

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
