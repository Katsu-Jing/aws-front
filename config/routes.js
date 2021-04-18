export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['operator', 'driver'],
            routes: [
              {
                path: '/driver',
                name: 'driver',
                icon: 'smile',
                authority: ['driver'],
                component: './Driver',
              },
              {
                path: '/operator/heatmap',
                name: 'operator.heatmap',
                icon: 'crown',
                authority: ['operator'],
                component: './OpHeatmap',
              },
              {
                name: '近七天数据',
                icon: 'smile',
                path: '/operator/recent',
                component: './OpRecent',
              },
              {
                name: '全部历史数据',
                icon: 'smile',
                path: '/operator/history',
                component: './OpHistory',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
