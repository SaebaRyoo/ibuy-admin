import React, { useRef, useState } from 'react';
import { removeBrand, brandList } from '@/services/aitao/goods/brand';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import UpdateModal from './UpdateModal';

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.Brand[]) => {
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

export type OpenParam = {
  open: boolean;
  openType: string;
};

const Goods: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<API.Brand[]>([]);
  const [openParam, setOpenParam] = useState<OpenParam>({ open: false, openType: '' });

  const columns: ProColumns<API.Brand>[] = [
    {
      title: '编号',
      dataIndex: 'id',
    },
    {
      title: '品牌名称',
      dataIndex: 'name',
      sorter: true,
      hideInForm: true,
    },
    {
      title: '品牌首字母',
      dataIndex: 'letter',
    },
    {
      title: '品牌图片',
      dataIndex: 'image',
    },
    {
      title: '相关',
      dataIndex: 'about',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: () => [
        <a
          key="config"
          onClick={() => {
            setOpenParam({ open: true, openType: 'update' });
          }}
        >
          编辑
        </a>,
        <a key="delete">删除</a>,
      ],
    },
  ];

  const handleConfirm = (value: any) => {
    setOpenParam({
      open: false,
      openType: '',
    });
    console.log(value);
  };

  const handleCancel = () => {
    setOpenParam({
      open: false,
      openType: '',
    });
  };
  return (
    <PageContainer>
      <ProTable<API.Brand, API.PageParams>
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
        toolBarRender={() => [
          <Button
            onClick={() => {
              setOpenParam({
                open: true,
                openType: 'add',
              });
            }}
            key="button"
            icon={<PlusOutlined />}
            type="primary"
          >
            添加分类
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
      <UpdateModal
        openParam={openParam}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
    </PageContainer>
  );
};

export default Goods;
