// 导入组件
const Layout = () => import('@/layout/index.vue')
const productUnit = () => import('@/views/base/productUnit.vue')

// 导出该组件
export default [
    {
      path: '/base',
      component: Layout,
      name: 'base',
      meta: {
        title: '基础数据管理',
      },
      icon: 'Menu',
      children: [
            {
            path: '/productUnit',
            name: 'productUnit',
            component: productUnit,
            meta: {
                title: '商品单位',
            },
            }
        ],
    },
  ]