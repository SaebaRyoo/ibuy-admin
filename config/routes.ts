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
  {
    path: '/goods',
    icon: 'crown',
    name: '商品管理',
    // access: 'canAdmin',
    routes: [
      { path: '/goods/goodsList', name: '商品列表', icon: 'smile', component: './Goods/GoodsList' },
      { path: '/goods/brandList', name: '品牌列表', icon: 'smile', component: './Goods/BrandList' },
      { path: '/goods/albumList', name: '相册列表', icon: 'smile', component: './Goods/AlbumList' },
      { component: './404' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];
