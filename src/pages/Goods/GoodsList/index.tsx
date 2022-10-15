import React, { useRef, useState } from 'react';
import { spuList } from '@/services/aitao/goods/goods';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddGoods from './AddGoods';
import { Add, Edit, Watch } from '@/utils/common/constant';

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.Spu[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
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
  const [selectedRowsState, setSelectedRows] = useState<API.Spu[]>([]);
  const [drawerOpen, setDrawerOpen] = useState<ModalProps>({ open: false, openType: '' });

  const columns: ProColumns<API.Spu>[] = [
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
      render: (_, record) => {
        return <img style={{ maxHeight: 40 }} src={record.image} />;
      },
    },
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '货号',
      dataIndex: 'sn',
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
      title: 'SKU库存',
      dataIndex: 'abc',
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
        <a
          key="watch"
          onClick={() => {
            setDrawerOpen({ open: true, openType: Watch, record });
          }}
        >
          查看
        </a>,
        <a
          key="edit"
          onClick={() => {
            setDrawerOpen({ open: true, openType: Edit, record });
          }}
        >
          编辑
        </a>,
        // <a key="logs">日志</a>, //TODO: 待完成
        <a key="del">删除</a>,
        <a key="check">审核</a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.Spu, API.PageParams>
        headerTitle="商品管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={async (params, sort, filter) => {
          const { data } = await spuList(params);
          return {
            data: data.list || [],
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: true,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: data.total,
          };
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        toolBarRender={() => [
          <Button
            onClick={() => {
              setDrawerOpen({ open: true, openType: Add });
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
