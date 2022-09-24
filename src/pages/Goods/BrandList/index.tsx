import React, { useRef, useState } from 'react';
import { removeBrand, brandList } from '@/services/aitao/goods/brand';
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
    await removeBrand({
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

const Goods: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<API.SpuListItem[]>([]);

  const columns: ProColumns<API.SpuListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      sorter: true,
      hideInForm: true,
    },
    {
      title: '商品图片',
      dataIndex: 'image',
    },
    {
      title: '品牌首字母',
      dataIndex: 'letter',
    },
    {
      title: '排序',
      dataIndex: 'seq',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: () => [<a key="config">编辑</a>, <a key="delete">删除</a>],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.SpuListItem, API.PageParams>
        headerTitle="品牌管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={brandList}
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
