import React, { useRef, useState } from 'react';
import { removeSpu, supList } from '@/services/aitao/goods/spu';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message } from 'antd';

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

  const columns: ProColumns<API.SpuListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      tip: 'The rule name is the unique key',
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
      dataIndex: 'is_marketable',
      valueEnum: {
        0: {
          text: '已下架',
          status: 'Default',
        },
        1: {
          text: '已上架',
          status: 'Success',
        },
      },
    },
    {
      title: '销量',
      dataIndex: 'sale_num',
    },
    {
      title: '审核状态',
      dataIndex: 'status',
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
      render: (_, record) => [<a key="config">配置</a>],
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
    </PageContainer>
  );
};

export default Goods;
