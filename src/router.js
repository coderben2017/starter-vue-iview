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
        path: '/standard',
        meta: {
          title: '数据库标准'
        },
        component: resolve => require(['./pages/standard/standard'], resolve)
      },
      {
        path: '/standard-management',
        meta: {
          title: '数据库标准管理'
        },
        component: resolve => require(['./pages/standard-management/standard-management'], resolve)
      },
      {
        path: '/source',
        meta: {
          title: '数据源'
        },
        component: resolve => require(['./pages/source/source'], resolve)
      },
      {
        path: '/assets-management',
        meta: {
          title: '数据资产管理'
        },
        component: resolve => require(['./pages/assets-management/assets-management'], resolve)
      },
      {
        path: '/audit-log',
        meta: {
          title: '审计日志'
        },
        component: resolve => require(['./pages/audit-log/audit-log'], resolve)
      },
      {
        path: '/plan-list',
        meta: {
          title: '任务列表'
        },
        component: resolve => require(['./pages/plan-list/plan-list'], resolve)
      },
      {
        path: '/operators',
        meta: {
          title: '运营商'
        },
        component: resolve => require(['./pages/operators/operators'], resolve)
      },
      {
        path: '/system-application',
        meta: {
          title: '系统应用'
        },
        component: resolve => require(['./pages/system-application/system-application'], resolve)
      },
      {
        path: '/api-management',
        meta: {
          title: '接口管理'
        },
        component: resolve => require(['./pages/api-management/api-management'], resolve)
      },
      {
        path: '/api-configuration',
        meta: {
          title: '接口配置'
        },
        component: resolve => require(['./pages/api-configuration/api-configuration'], resolve)
      }
    ]
  },
  {
    path: '*',
    component: resolve => require(['./pages/404'], resolve)
  }
];

export default routers;
