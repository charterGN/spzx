// 导入组件
const Layout = () => import('@/layout/index.vue')
const userInfo = () => import('@/views/users/userInfo.vue')

// 导出该组件
export default [
    {
      path: '/users',
      component: Layout,
      name: 'users',
      meta: {
        title: '会员管理',
      },
      icon: 'User',
      children: [
            {
            path: '/userInfo',
            name: 'userInfo',
            component: userInfo,
            meta: {
                title: '会员管理',
            },
            }
        ],
    },
  ]