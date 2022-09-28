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
        name: '模板列表',
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
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];
