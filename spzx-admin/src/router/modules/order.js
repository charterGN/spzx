const Layout = () => import('@/layout/index.vue')
const orderInfo = () => import('@/views/order/orderInfo.vue')

export default [
    {
      path: '/order',
      component: Layout,
      name: 'order',
      meta: {
        title: '订单管理',
      },
      icon: 'Operation',
      children: [
            {
            path: '/orderInfo',
            name: 'orderInfo',
            component: orderInfo,
            meta: {
                title: '订单管理',
            },
            }
        ],
    },
  ]