import React, { useRef, useState } from 'react';
import { removeSpu, supList } from '@/services/aitao/goods/spu';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddGoods from './AddGoods';

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.SpuListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeSpu({
      id: selectedRows.map((row) => row.id),
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

const Goods: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<API.SpuListItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const columns: ProColumns<API.SpuListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      render: (dom, entity) => {
        return <a>{dom}</a>;
      },
    },
    {
      title: '商品图片',
      dataIndex: 'image',
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      sorter: true,
      hideInForm: true,
    },
    {
      title: '货号',
      dataIndex: 'sn',
    },
    {
      title: '副标题',
      dataIndex: 'caption',
    },
    {
      title: '标签',
      dataIndex: 'isMarketable',
      render: (_, record) => {
        // flag为true，则表示已上架
        const flag = record.isMarketable == '1';
        return (
          <>
            {flag ? '已上架' : '已下架'}&nbsp;&nbsp;
            <Switch key="" defaultChecked={flag} />
          </>
        );
      },
    },
    {
      title: '销量',
      dataIndex: 'saleNum',
    },
    {
      title: '审核状态',
      dataIndex: 'status',
      tip: '商品需要已审核才能售卖',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '未审核',
          status: 'Default',
        },
        1: {
          text: '已审核',
          status: 'Success',
        },
        2: {
          text: '审核未通过',
          status: 'Fault',
        },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a key="watch">查看</a>,
        <a key="edit">编辑</a>,
        <a key="logs">日志</a>,
        <a key="del">删除</a>,
        <a key="check">审核</a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.SpuListItem, API.PageParams>
        headerTitle="商品管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={supList}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        toolBarRender={() => [
          <Button
            onClick={() => {
              setDrawerOpen(true);
            }}
            key="button"
            icon={<PlusOutlined />}
            type="primary"
          >
            添加商品
          </Button>,
        ]}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 个商品进行操作
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
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <AddGoods drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </PageContainer>
  );
};

export default Goods;
