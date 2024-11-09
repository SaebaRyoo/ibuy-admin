import { orderList, removeOrder } from '@/services/ibuy/order/order';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import OrderDetails from './OrderDetails';

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.Order[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeOrder({
      key: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const Order: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<API.Order[]>([]);
  const [openParams, setOpenParams] = useState<ModalProps>({ open: false, params: {} });

  const btnToggle = (orderStatus?: string, payStatus?: string, shippingStatus?: string) => {
    // 订单未完成，未支付 || 订单未完成，已支付
    if ((orderStatus === '0' && payStatus === '0') || (orderStatus === '0' && payStatus === '1')) {
      return <a>取消订单</a>;
    } else if (orderStatus === '0' && payStatus === '2') {
      // 订单未完成，支付失败
      return <a>删除订单</a>;
    } else if (orderStatus === '1' && payStatus === '1') {
      // 订单已完成，支付成功
      return <a>关闭订单</a>;
    } else if (orderStatus === '0' && payStatus === '1' && shippingStatus === '0') {
      // 订单未完成，支付成功，未发货
      return <a>订单发货</a>;
    } else if (orderStatus === '0' && payStatus === '1' && shippingStatus === '1') {
      // 订单未完成，支付成功，已发货
      return <a>订单跟踪</a>;
    }
    return null;
  };
  const columns: ProColumns<API.Order>[] = [
    {
      title: '订单编号',
      dataIndex: 'id',
    },
    {
      title: '提交时间',
      dataIndex: 'createTime',
    },
    {
      title: '用户账号',
      dataIndex: 'username',
    },
    {
      title: '订单金额',
      dataIndex: 'totalMoney',
    },
    {
      title: '支付方式',
      dataIndex: 'about',
    },
    {
      title: '订单来源',
      dataIndex: 'sourceType',
      valueEnum: {
        1: {
          text: 'web',
        },
        2: {
          text: 'app',
        },
        3: {
          text: '微信公众号',
        },
        4: {
          text: '微信小程序',
        },
        5: {
          text: 'H5手机页面',
        },
      },
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
      valueEnum: {
        0: {
          text: '未支付',
          status: 'Default',
        },
        1: {
          text: '已支付',
          status: 'Success',
        },
        2: {
          text: '支付失败',
          status: 'Fault',
        },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="watch"
          onClick={() => {
            setOpenParams({
              open: true,
              params: record,
            });
          }}
        >
          查看订单
        </a>,
        btnToggle(record.orderStatus, record.payStatus, record.shippingStatus),
      ],
    },
  ];

  const onClose = () => {
    setOpenParams({
      open: false,
      params: {},
    });
  };

  return (
    <PageContainer>
      <ProTable<API.Order, API.PageParams>
        headerTitle="订单列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={orderList}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        toolBarRender={() => [
          <Button onClick={() => {}} key="button" icon={<PlusOutlined />} type="primary">
            导出订单
          </Button>,
        ]}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 个品牌进行操作
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}
      <OrderDetails openParams={openParams} onClose={onClose} />
    </PageContainer>
  );
};

export default Order;
