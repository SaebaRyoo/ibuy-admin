import { Button, Drawer, Radio, Space, Steps } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './OrderDetails.less';
const { Step } = Steps;

type OrderDetailsProps = {
  openParams: ModalProps;
  onClose: () => void;
};

const mockDetails: API.Order = {
  id: '201807196398345',
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
  pay_status: '0', // 支付状态,0:未支付，1：已支付，2：支付失败
  is_delete: '0', //  是否删除
};
const defaultSteps = [
  {
    title: '提交订单',
    subTitle: '',
  },
  {
    title: '支付订单',
    subTitle: '',
  },
  {
    title: '平台发货',
    subTitle: '',
  },
  {
    title: '确认收货',
    subTitle: '',
  },
  {
    title: '完成评价',
    subTitle: '',
  },
];
const OrderDetails: React.FC<OrderDetailsProps> = ({ openParams, onClose }) => {
  const [current, setCurrent] = useState(0); // 0: 已经提交订单 1: 支付订单 2: 平台发货 3:确认收货 4: 完成评价
  const [steps, setSteps] = useState(defaultSteps);
  useEffect(() => {
    if (mockDetails.pay_status == '0') {
      setCurrent(0);
      setSteps((prev) => {
        const copy = [...prev];
        copy[0].subTitle = mockDetails.create_time;
        return copy;
      });
    }
  }, []);
  const { open, params } = openParams;
  return (
    <Drawer
      title="订单详情"
      placement="bottom"
      closable={false}
      open={open}
      destroyOnClose={true}
      contentWrapperStyle={{
        height: '100%',
      }}
      extra={
        <Space>
          <Button onClick={onClose}>关闭</Button>
        </Space>
      }
    >
      <Steps className={styles.steps} current={current} labelPlacement="vertical">
        {steps.map((item) => (
          <Step subTitle={item.subTitle} key={item.title} title={item.title} />
        ))}
      </Steps>
    </Drawer>
  );
};

export default OrderDetails;
