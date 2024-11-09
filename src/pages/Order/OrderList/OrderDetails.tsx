import { orderItemList } from '@/services/ibuy/order/orderItem';
import { ExclamationCircleOutlined, TagOutlined } from '@ant-design/icons';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Drawer, Space, Steps } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './OrderDetails.less';
const { Step } = Steps;

type OrderDetailsProps = {
  openParams: ModalProps;
  onClose: () => void;
};

const mockDetails: API.Order = {
  id: '201807196398345',
  totalNum: 0, //合计数量
  totalMoney: 0, //合计金额
  preMoney: 0, //优惠金额
  postFee: 0, // 邮费
  payMoney: 0, // 实付金额
  payType: '1', // 支付类型，1、在线支付、0 货到付款
  createTime: '2022-09-28 17:40:00', // 订单创建时间
  updateTime: '2022-09-28 17:40:00', // 订单更新时间
  payTime: '2022-09-28 17:40:00', //支付时间
  consignTime: '2022-09-28 17:40:00', // 发货时间
  endTime: '2022-09-28 17:40:00', // 交易完成时间
  closeTime: '2022-09-28 17:40:00', // 交易关闭时间
  shippingName: '邮政', // 物流名称
  shippingCode: '1111111', // 物流单号
  shippingTaskId: '2134444444', // 物流任务id
  shippingStatus: ['0', '1', '2'][Math.floor(Math.random() * 3)], // 0 未发货 1 已发货 2 已接收
  username: ['张三', '李四', '王五'][Math.floor(Math.random() * 3)], // 用户名称
  buyerMessage: ['东西还行', '有点小贵', 'hhhhh'][Math.floor(Math.random() * 3)], // 买家留言
  buyerRate: ['0', '1'][Math.floor(Math.random() * 2)], //是否评价
  receiverContact: ['小明', '小红', '小刚'][Math.floor(Math.random() * 3)], // 收货人
  receiverMobile: ['15178788888', '15178781888', '15178748888'][Math.floor(Math.random() * 3)], // 收货人手机
  receiverAddress: ['北京四合院', '上海外滩边', '杭州西湖边'][Math.floor(Math.random() * 3)], // 收货人地址
  sourceType: '1', //订单来源：1:web，2：app，3：微信公众号，4：微信小程序  5 H5手机页面(目前只有web)
  transactionId: '297489787489273489328', // 交易流水号
  orderStatus: ['0', '1', '2'][Math.floor(Math.random() * 3)], // 订单状态,0:未完成,1:已完成，2：已退货
  payStatus: '0', // 支付状态,0:未支付，1：已支付，2：支付失败
  isDelete: '0', //  是否删除
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

const columns: ProColumns<API.OrderItem>[] = [
  {
    title: '商品图片',
    dataIndex: 'image',
    render: (_, record) => {
      return <img style={{ width: 100 }} src={record.image} />;
    },
  },
  {
    title: '商品名称',
    dataIndex: 'name',
  },
  {
    title: '价格',
    dataIndex: 'price',
  },
  {
    title: '属性',
    dataIndex: 'about',
  },
  {
    title: '数量',
    dataIndex: 'num',
  },
  {
    title: '库存',
    dataIndex: '---',
  },
  {
    title: '总金额',
    dataIndex: 'money',
  },
];

const OrderItemDetails: React.FC<OrderDetailsProps> = ({ openParams, onClose }) => {
  const [current, setCurrent] = useState(0); // 0: 已经提交订单 1: 支付订单 2: 平台发货 3:确认收货 4: 完成评价
  const [steps, setSteps] = useState(defaultSteps);
  useEffect(() => {
    if (mockDetails.payStatus == '0') {
      setCurrent(0);
      setSteps((prev) => {
        const copy = [...prev];
        copy[0].subTitle = mockDetails.createTime;
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
      headerStyle={{
        paddingLeft: 200,
        paddingRight: 200,
      }}
      contentWrapperStyle={{
        height: '100%',
      }}
      extra={
        <Space>
          <Button onClick={onClose}>关闭</Button>
        </Space>
      }
    >
      <div className={styles.container}>
        <Steps className={styles.steps} current={current} labelPlacement="vertical">
          {steps.map((item) => (
            <Step subTitle={item.subTitle} key={item.title} title={item.title} />
          ))}
        </Steps>

        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <span>
              <ExclamationCircleOutlined />
              当前订单状态：已完成
            </span>
            <div>
              <Button className={styles.btn}>修改发票</Button>
              <Button className={styles.btn}>修改收货人信息</Button>
              <Button className={styles.btn}>修改商品信息</Button>
              <Button className={styles.btn}>修改费用信息</Button>
              <Button className={styles.btn}>关闭订单</Button>
              <Button className={styles.btn}>取消订单</Button>
              <Button className={styles.btn}>删除订单</Button>
              <Button className={styles.btn}>订单跟踪</Button>
              <Button className={styles.btn}>发送站内信</Button>
              <Button className={styles.btn}>备注订单</Button>
            </div>
          </div>

          <div className={styles.contentDetailsWrapper}>
            <p className={styles.title}>
              <TagOutlined />
              基本信息
            </p>
            <div className={styles.details}>
              <div className={styles.detailsCell}>
                <p>订单编号</p>
                <div>{mockDetails.id}</div>
              </div>
              <div className={styles.detailsCell}>
                <p>发货流水号</p>
                <div>{mockDetails.transactionId}</div>
              </div>
              <div className={styles.detailsCell}>
                <p>用户账号</p>
                <div>
                  {mockDetails.username} <span>查看</span>
                </div>
              </div>
              <div className={styles.detailsCell}>
                <p>支付方式</p>
                <div>未支付</div>
              </div>
              <div className={styles.detailsCell}>
                <p>订单来源</p>
                <div>{mockDetails.sourceType}</div>
              </div>
              <div className={styles.detailsCell}>
                <p>订单类型</p>
                <div>普通订单、秒杀订单</div>
              </div>
              <div className={styles.detailsCell}>
                <p>配送方式</p>
                <div>京东物流</div>
              </div>
              <div className={styles.detailsCell}>
                <p>物流单号</p>
                <div>{mockDetails.shippingCode}</div>
              </div>
              <div className={styles.detailsCell}>
                <p>自动确认收货时间</p>
                <div>15天</div>
              </div>
              <div className={styles.detailsCell}>
                <p>活动信息</p>
                <div>满100减10</div>
              </div>
              <div className={styles.detailsCell}>
                <p></p>
                <div></div>
              </div>
              <div className={styles.detailsCell}>
                <p></p>
                <div></div>
              </div>
            </div>

            <p className={styles.title}>
              <TagOutlined />
              收货人信息
            </p>
            <div className={styles.details}>
              <div style={{ width: 300 }} className={styles.detailsCell}>
                <p>收货人</p>
                <div>{mockDetails.receiverContact}</div>
              </div>
              <div style={{ width: 300 }} className={styles.detailsCell}>
                <p>收手机号码</p>
                <div>{mockDetails.receiverMobile}</div>
              </div>
              <div style={{ width: 300 }} className={styles.detailsCell}>
                <p>邮政编码</p>
                <div>1234</div>
              </div>
              <div style={{ width: 300 }} className={styles.detailsCell}>
                <p>收货地址</p>
                <div>{mockDetails.receiverAddress}</div>
              </div>
            </div>
            <p className={styles.title}>
              <TagOutlined />
              商品信息
            </p>
            <ProTable<API.OrderItem, API.PageParams>
              rowKey="id"
              options={false}
              search={false}
              request={orderItemList}
              columns={columns}
              pagination={false}
              tableStyle={{ width: 1201, borderColor: 'rgba(228, 228, 228, 1)' }}
              bordered
            />
            <p className={styles.goodsTotMoney}>
              合计: <span>¥{mockDetails.totalMoney}</span>
            </p>

            <p className={styles.title}>
              <TagOutlined />
              费用信息
            </p>
            <div className={styles.details}>
              <div style={{ width: 300 }} className={styles.detailsCell}>
                <p>商品合计</p>
                <div>{mockDetails.totalMoney}</div>
              </div>
              <div style={{ width: 300 }} className={styles.detailsCell}>
                <p>运费</p>
                <div>{mockDetails.postFee}</div>
              </div>
              <div style={{ width: 300 }} className={styles.detailsCell}>
                <p>优惠券</p>
                <div>-¥{mockDetails.preMoney}</div>
              </div>
              <div style={{ width: 300 }} className={styles.detailsCell}>
                <p>活动优惠</p>
                <div>-¥0.00</div>
              </div>
              <div style={{ width: 300 }} className={styles.detailsCell}>
                <p>应付金额</p>
                <div>-¥{mockDetails.payMoney}</div>
              </div>
              <div style={{ width: 300 }} className={styles.detailsCell}>
                <p></p>
                <div></div>
              </div>
              <div style={{ width: 300 }} className={styles.detailsCell}>
                <p></p>
                <div></div>
              </div>
              <div style={{ width: 300 }} className={styles.detailsCell}>
                <p></p>
                <div></div>
              </div>
            </div>
            <p className={styles.title}>
              <TagOutlined />
              操作信息
            </p>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default OrderItemDetails;
