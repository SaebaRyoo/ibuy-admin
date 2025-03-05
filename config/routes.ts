export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { component: './404' },
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Chart' },
  // 商品管理路由
  {
    path: '/goods',
    icon: 'crown',
    name: '商品管理',
    routes: [
      { path: '/goods/goods', name: '商品列表', icon: 'smile', component: './Goods/GoodsList' },
      { path: '/goods/brand', name: '品牌列表', icon: 'smile', component: './Goods/BrandList' },
      { path: '/goods/album', name: '相册列表', icon: 'smile', component: './Goods/AlbumList' },
      { path: '/goods/albumDetails', component: './Goods/AlbumList/AlbumDetails' },
      {
        path: '/goods/category',
        name: '分类列表',
        icon: 'smile',
        component: './Goods/CategoryList',
      },
      {
        path: '/goods/template',
        name: '模板列表',
        icon: 'smile',
        component: './Goods/SpecAndParaTemplate',
      },
      {
        path: '/goods/spec',
        name: '规格列表',
        icon: 'smile',
        component: './Goods/SpecList',
      },
      {
        path: '/goods/para',
        name: '参数列表',
        icon: 'smile',
        component: './Goods/ParaList',
      },
      { component: './404' },
    ],
  },
  // 订单管理路由
  {
    path: '/order',
    icon: 'crown',
    name: '订单管理',
    routes: [
      {
        path: '/order/order',
        name: '订单列表',
        icon: 'smile',
        component: './Order/OrderList',
      },
    ],
  },
  // 系统管理路由
  {
    path: '/system',
    icon: 'crown',
    name: '系统管理',
    access: 'isAdmin',
    routes: [
      {
        path: '/system/menu',
        name: '菜单列表',
        icon: 'smile',
        component: './System/Menu',
      },
      {
        path: '/system/role',
        name: '角色列表',
        icon: 'smile',
        component: './System/Role',
      },
      {
        path: '/system/sysuser',
        name: '系统用户列表',
        icon: 'smile',
        component: './System/SysUser',
      },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];
