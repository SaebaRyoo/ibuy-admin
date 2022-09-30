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

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  /*******  商品相关  *************************************************************/

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
    spec: string;
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

  type Goods = {
    spu?: SpuListItem;
    skuList?: Array<SkuListItem>;
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
    image_items?: string; // 图片列表
    desc?: string; // 相册描述
  };

  // 分类商品类型
  type Category = {
    id?: number;
    name?: string;
    goods_num?: number;
    is_show?: string; // 是否显示
    is_menu?: string; // 是否导航
    seq?: number; // 排序
    parent_id?: number;
    template_id?: number; // 模板id
  };

  // 模板类型
  type Template = {
    id?: number;
    name?: string;
    spec_num?: number;
    para_num?: number;
  };

  // 规格类型
  type Spec = {
    id?: number;
    name?: string;
    options?: string;
    seq: number;
    template_id?: number;
  };

  // 参数类型
  type Para = {
    id?: number;
    name?: string;
    options?: string;
    seq: number;
    template_id?: number;
  };

  /*******  订单相关  *************************************************************/

  // 订单表信息
  type Order = {
    id: string;
    total_num?: number; //合计数量
    total_money?: number; //合计金额
    pre_money?: number; //优惠金额
    post_fee?: number; // 邮费
    pay_money?: number; // 实付金额
    pay_type?: string; // 支付类型，1、在线支付、0 货到付款
    create_time: string; // 订单创建时间
    update_time?: string; // 订单更新时间
    pay_time?: string; //支付时间
    consign_time?: string; // 发货时间
    end_time?: string; // 交易完成时间
    close_time?: string; // 交易关闭时间
    shipping_name?: string; // 物流名称
    shipping_code?: string; // 物流单号
    shipping_task_id?: string; // 物流任务id
    shipping_status?: string; // 0 未发货 1 已发货 2 已接收
    username?: string; // 用户名称
    buyer_message?: string; // 买家留言
    buyer_rate?: string; //是否评价
    receiver_contact?: string; // 收货人
    receiver_mobile?: string; // 收货人手机
    receiver_address?: string; // 收货人地址
    source_type?: string; //订单来源：1:web，2：app，3：微信公众号，4：微信小程序  5 H5手机页面(目前只有web)
    transaction_id?: string; // 交易流水号
    order_status?: string; // 订单状态,0:未完成,1:已完成，2：已退货
    pay_status?: string; // 支付状态,0:未支付，1：已支付，2：支付失败
    is_delete?: string; //  是否删除
  };

  // 订单明细
  type OrderItem = {
    id: string;
    category_id1?: number; // 一级分类
    category_id2?: number; // 二级分类
    category_id3?: number; // 三级分类
    spu_id?: number;
    sku_id?: number;
    order_id: string; // 订单ID
    name?: string;
    price?: number; // 单价
    num?: number; // 数量
    money?: number; // 总金额
    pay_money?: number; // 实付金额
    image?: string; // 图片
    weight?: number; // 重量
    post_fee?: number;
    is_return?: string; //是否退货,0:未退货，1：已退货
  };

  // 表格数据形式
  type RuleList = {
    data?: any; // 就是后面的各种数据 SpuListItem[] | SkuListItem[] | Brand[] | Album[] | Category[]
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };
}
