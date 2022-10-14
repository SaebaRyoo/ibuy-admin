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
    scope: string;
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
    success: boolean;
    code: number;
    message: string;
    data: {
      saToken: string;
      username: string;
    };
    // currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  /*******  商品相关  *************************************************************/

  type Spu = {
    id: number;
    sn?: string;
    name?: string;
    caption?: string;
    brandId?: number;
    category1Id?: number;
    category2Id?: number;
    category3Id?: number;
    templateId?: number;
    freightId?: number;
    image?: string;
    images?: string;
    saleService?: string;
    introduction?: string;
    specItems?: string;
    paraItems?: string;
    saleNum?: number;
    commentNum?: number;
    isMarketable?: string;
    isEnableSpec?: string;
    isDelete?: string;
    status?: string;
    updatedAt?: string;
    createdAt?: string;
  };

  type Sku = {
    id: number;
    sn?: string;
    name?: string;
    price?: number;
    num?: number;
    alertNum?: number;
    image?: string;
    images?: string;
    spuId?: number;
    spec: string;
    weight?: number;
    createTime?: string;
    updateTime?: string;
    categoryId?: number;
    categoryName?: string;
    brandName?: string;
    saleNum?: number;
    commentNum?: number;
    status?: string;
  };

  type Goods = {
    spu?: Spu;
    skuList?: Array<Sku>;
  };

  // 品牌
  type Brand = {
    id: number;
    name: string;
    image?: string; // 品牌图片地址
    letter?: string; // 品牌的首字母
    seq?: number; // 排序
  };

  // 图片管理
  type Album = {
    id: number;
    title?: string; // 相册名称
    image?: string; // 相册封面
    imageItems?: string; // 图片列表
    desc?: string; // 相册描述
  };

  // 分类商品类型
  type Category = {
    id: number;
    name?: string;
    goodsNum?: number;
    isShow?: string; // 是否显示
    isMenu?: string; // 是否导航
    seq?: number; // 排序
    parentId: number;
    templateId?: number; // 模板id
  };

  // 模板类型
  type Template = {
    id: number;
    name?: string;
    specNum?: number;
    paraNum?: number;
  };

  // 规格类型
  type Spec = {
    id: number;
    name?: string;
    options?: string;
    seq: number;
    templateId?: number;
  };

  // 参数类型
  type Para = {
    id: number;
    name?: string;
    options?: string;
    seq: number;
    templateId?: number;
  };

  /*******  订单相关  *************************************************************/

  // 订单表信息
  type Order = {
    id: string;
    totalNum?: number; //合计数量
    totalMoney?: number; //合计金额
    preMoney?: number; //优惠金额
    postFee?: number; // 邮费
    payMoney?: number; // 实付金额
    payType?: string; // 支付类型，1、在线支付、0 货到付款
    createTime: string; // 订单创建时间
    updateTime?: string; // 订单更新时间
    payTime?: string; //支付时间
    consignTime?: string; // 发货时间
    endTime?: string; // 交易完成时间
    closeTime?: string; // 交易关闭时间
    shippingName?: string; // 物流名称
    shippingCode?: string; // 物流单号
    shippingTaskId?: string; // 物流任务id
    shippingStatus?: string; // 0 未发货 1 已发货 2 已接收
    username?: string; // 用户名称
    buyerMessage?: string; // 买家留言
    buyerRate?: string; //是否评价
    receiverContact?: string; // 收货人
    receiverMobile?: string; // 收货人手机
    receiverAddress?: string; // 收货人地址
    sourceType?: string; //订单来源：1:web，2：app，3：微信公众号，4：微信小程序  5 H5手机页面(目前只有web)
    transactionId?: string; // 交易流水号
    orderStatus?: string; // 订单状态,0:未完成,1:已完成，2：已退货
    payStatus?: string; // 支付状态,0:未支付，1：已支付，2：支付失败
    isDelete?: string; //  是否删除
  };

  // 订单明细
  type OrderItem = {
    id: string;
    categoryId1?: number; // 一级分类
    categoryId2?: number; // 二级分类
    categoryId3?: number; // 三级分类
    spuId?: number;
    skuId?: number;
    orderId: string; // 订单ID
    name?: string;
    price?: number; // 单价
    num?: number; // 数量
    money?: number; // 总金额
    payMoney?: number; // 实付金额
    image?: string; // 图片
    weight?: number; // 重量
    postFee?: number;
    isReturn?: string; //是否退货,0:未退货，1：已退货
  };

  /*******  系统相关  *************************************************************/

  // 菜单
  type Menu_T = {
    id: string;
    name: string;
    icon: string;
    url?: string;
    parentId: string;
  };

  // 角色
  type Role = {
    id: number;
    name: string;
  };

  // 用户
  type SysUser = {
    id: number;
    username?: string;
    password?: string;
    status?: string; // 是否启用 0: 未启用 1: 已启用
  };

  /*******  其他  *************************************************************/

  // 表格数据形式
  type RuleList = {
    data?: any; // 就是后面的各种数据 Spu[] | Sku[] | Brand[] | Album[] | Category[]
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };
}
