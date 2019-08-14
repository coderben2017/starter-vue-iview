const routers = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    meta: {
      title: '登录'
    },
    component: resolve => require(['./pages/login/login'], resolve)
  },
  {
    path: '/index',
    component: resolve => require(['./pages/index/index'], resolve),
    children: [
      {
        path: '',
        redirect: 'home'
      },
      {
        path: 'home',
        meta: {
          title: '首页'
        },
        component: resolve => require(['./pages/home/home'], resolve)
      },
      {
        path: '/api/lamp/v1',
        meta: {
          title: '个人信息'
        },
        component: resolve => require(['./pages/user'], resolve)
      }
    ]
  },
  {
    path: '*',
    component: resolve => require(['./pages/404'], resolve)
  }
];

export default routers;
