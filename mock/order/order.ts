import { Request, Response } from 'express';
import { parse } from 'url';

// mock tableListDataSource
const genList = (current: number, pageSize: number) => {
  const tableListDataSource: API.Order[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      id: index.toString(),
      total_num: 0, //合计数量
      total_money: 0, //合计金额
      pre_money: 0, //优惠金额
      post_fee: 0, // 邮费
      pay_money: 0, // 实付金额
      pay_type: '1', // 支付类型，1、在线支付、0 货到付款
      create_time: '2022-09-28 17:40:00', // 订单创建时间
      update_time: '2022-09-28 17:40:00', // 订单更新时间
      pay_time: '2022-09-28 17:40:00', //支付时间
      consign_time: '2022-09-28 17:40:00', // 发货时间
      end_time: '2022-09-28 17:40:00', // 交易完成时间
      close_time: '2022-09-28 17:40:00', // 交易关闭时间
      shipping_name: '邮政', // 物流名称
      shipping_code: '1111111', // 物流单号
      shipping_task_id: '2134444444', // 物流任务id
      shipping_status: ['0', '1', '2'][Math.floor(Math.random() * 3)], // 0 未发货 1 已发货 2 已接收
      username: ['张三', '李四', '王五'][Math.floor(Math.random() * 3)], // 用户名称
      buyer_message: ['东西还行', '有点小贵', 'hhhhh'][Math.floor(Math.random() * 3)], // 买家留言
      buyer_rate: ['0', '1'][Math.floor(Math.random() * 2)], //是否评价
      receiver_contact: ['小明', '小红', '小刚'][Math.floor(Math.random() * 3)], // 收货人
      receiver_mobile: ['15178788888', '15178781888', '15178748888'][Math.floor(Math.random() * 3)], // 收货人手机
      receiver_address: ['北京四合院', '上海外滩边', '杭州西湖边'][Math.floor(Math.random() * 3)], // 收货人地址
      source_type: '1', //订单来源：1:web，2：app，3：微信公众号，4：微信小程序  5 H5手机页面(目前只有web)
      transaction_id: '297489787489273489328', // 交易流水号
      order_status: ['0', '1', '2'][Math.floor(Math.random() * 3)], // 订单状态,0:未完成,1:已完成，2：已退货
      pay_status: '1', // 支付状态,0:未支付，1：已支付，2：支付失败
      is_delete: '0', //  是否删除
    });
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 100);

function getRule(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query as unknown as API.PageParams &
    API.Order & {
      sorter: any;
      filter: any;
    };

  let dataSource = [...tableListDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  if (params.sorter) {
    const sorter = JSON.parse(params.sorter);
    dataSource = dataSource.sort((prev, next) => {
      let sortNumber = 0;
      Object.keys(sorter).forEach((key) => {
        if (sorter[key] === 'descend') {
          if (prev[key] - next[key] > 0) {
            sortNumber += -1;
          } else {
            sortNumber += 1;
          }
          return;
        }
        if (prev[key] - next[key] > 0) {
          sortNumber += 1;
        } else {
          sortNumber += -1;
        }
      });
      return sortNumber;
    });
  }
  if (params.filter) {
    const filter = JSON.parse(params.filter as any) as {
      [key: string]: string[];
    };
    if (Object.keys(filter).length > 0) {
      dataSource = dataSource.filter((item) => {
        return Object.keys(filter).some((key) => {
          if (!filter[key]) {
            return true;
          }
          if (filter[key].includes(`${item[key]}`)) {
            return true;
          }
          return false;
        });
      });
    }
  }

  if (params.title) {
    dataSource = dataSource.filter((data) => data?.title?.includes(params.title || ''));
  }
  const result = {
    data: dataSource,
    total: tableListDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.current}`, 10) || 1,
  };

  return res.json(result);
}

function postRule(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter((item) => key.indexOf(item.id) === -1);
      break;
    case 'post':
      (() => {
        const i = Math.ceil(Math.random() * 10000);
        const newRule: API.Order = {
          id: i.toString(),
          total_num: 0, //合计数量
          total_money: 0, //合计金额
          pre_money: 0, //优惠金额
          post_fee: 0, // 邮费
          pay_money: 0, // 实付金额
          pay_type: '1', // 支付类型，1、在线支付、0 货到付款
          create_time: '2022-09-28 17:40:00', // 订单创建时间
          update_time: '2022-09-28 17:40:00', // 订单更新时间
          pay_time: '2022-09-28 17:40:00', //支付时间
          consign_time: '2022-09-28 17:40:00', // 发货时间
          end_time: '2022-09-28 17:40:00', // 交易完成时间
          close_time: '2022-09-28 17:40:00', // 交易关闭时间
          shipping_name: '邮政', // 物流名称
          shipping_code: '1111111', // 物流单号
          shipping_task_id: '2134444444', // 物流任务id
          shipping_status: ['0', '1', '2'][Math.floor(Math.random() * 3)], // 0 未发货 1 已发货 2 已接收
          username: ['张三', '李四', '王五'][Math.floor(Math.random() * 3)], // 用户名称
          buyer_message: ['东西还行', '有点小贵', 'hhhhh'][Math.floor(Math.random() * 3)], // 买家留言
          buyer_rate: ['0', '1'][Math.floor(Math.random() * 2)], //是否评价
          receiver_contact: ['小明', '小红', '小刚'][Math.floor(Math.random() * 3)], // 收货人
          receiver_mobile: ['15178788888', '15178781888', '15178748888'][
            Math.floor(Math.random() * 3)
          ], // 收货人手机
          receiver_address: ['北京四合院', '上海外滩边', '杭州西湖边'][
            Math.floor(Math.random() * 3)
          ], // 收货人地址
          source_type: '1', //订单来源：1:web，2：app，3：微信公众号，4：微信小程序  5 H5手机页面(目前只有web)
          transaction_id: '297489787489273489328', // 交易流水号
          order_status: ['0', '1', '2'][Math.floor(Math.random() * 3)], // 订单状态,0:未完成,1:已完成，2：已退货
          pay_status: '1', // 支付状态,0:未支付，1：已支付，2：支付失败
          is_delete: '0', //  是否删除
        };
        tableListDataSource.unshift(newRule);
        return res.json(newRule);
      })();
      return;

    case 'update':
      (() => {
        let newRule = {};
        tableListDataSource = tableListDataSource.map((item) => {
          if (item.id === key) {
            newRule = { ...item, desc, name };
            return { ...item, desc, name };
          }
          return item;
        });
        return res.json(newRule);
      })();
      return;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  res.json(result);
}

export default {
  'GET /api/mock/order': getRule,
  'POST /api/mock/order': postRule,
};
