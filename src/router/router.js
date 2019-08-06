const routers = [
  {
    path: '/',
    meta: {
      title: '教师中心'
    },
    component: resolve => require(['../pages/home'], resolve)
  },
  {
    path: '/user',
    meta: {
      title: '个人信息'
    },
    component: resolve => require(['../pages/user'], resolve)
  },
  {
    path: '/grid',
    component: resolve => require(['../pages/grid'], resolve)
  },
  {
    path: '*',
    component: resolve => require(['../pages/404'], resolve)
  }
];

export default routers;
