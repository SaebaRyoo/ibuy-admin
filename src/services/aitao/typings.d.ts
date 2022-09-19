// @ts-ignore
/* eslint-disable */

declare namespace API {
  type LoginUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string; //email
    token?: string; // 用户登录token
    group?: string; // 部门
    role?: number[]; // 角色列表
    menu?: string[]; // 可访问菜单列表
    phone?: string;
    // notifyCount?: number;
    // unreadCount?: number;
    // country?: string;
    // access?: string;
    // geographic?: {
    //   province?: { label?: string; key?: string };
    //   city?: { label?: string; key?: string };
    // };
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type SpuListItem = {
    id?: number;
    sn?: string;
    name?: string;
    caption?: string;
    brand_id?: number;
    category1_id?: number;
    category2_id?: number;
    category3_id?: number;
    template_id?: number;
    freight_id?: number;
    image?: string;
    images?: string;
    sale_service?: string;
    introduction?: string;
    spec_items?: string;
    para_items?: string;
    sale_num?: number;
    comment_num?: number;
    is_marketable?: string;
    is_enable_spec?: string;
    is_delete?: string;
    status?: string;
    updatedAt?: string;
    createdAt?: string;
  };

  type SkuListItem = {
    id?: number;
    sn?: string;
    name?: string;
    price?: number;
    num?: number;
    alert_num?: number;
    image?: string;
    images?: string;
    spu_id?: number;
    spec?: string;
    weight?: number;
    create_time?: string;
    update_time?: string;
    category_id?: number;
    category_name?: string;
    brand_name?: string;
    sale_num?: number;
    comment_num?: number;
    status?: string;
  };

  type RuleList = {
    data?: SpuListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  // 品牌
  type Brand = {
    id?: number;
    name: string;
    image?: string; // 品牌图片地址
    letter?: string; // 品牌的首字母
    seq?: number; // 排序
  };

  // 图片管理
  type Album = {
    id?: number;
    title?: string; // 相册名称
    image?: string; // 相册封面
    image_items?: Array; // 图片列表
    desc?: string; // 相册描述
  };
}
