import React, { useRef, useState } from 'react';
import { roleList } from '@/services/aitao/system/role';
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
const handleRemove = async (selectedRows: API.Role[]) => {
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

export type OpenParms = {
  open: boolean;
  openType: string;
};

const Menu: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<API.Role[]>([]);
  const [openParms, setOpenPrams] = useState<OpenParms>({ open: false, openType: '' });

  const columns: ProColumns<API.Role>[] = [
    {
      title: '编号',
      dataIndex: 'id',
    },
    {
      title: '角色名称',
      dataIndex: 'name',
      sorter: true,
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="add"
          onClick={() => {
            setOpenPrams({ open: true, openType: 'update' });
          }}
        >
          编辑
        </a>,
        <a key="watch">删除</a>,
      ],
    },
  ];

  const handleConfirm = (values: any) => {
    setOpenPrams({
      open: false,
      openType: '',
    });
    console.log(values);
  };

  const handleCancel = () => {
    setOpenPrams({
      open: false,
      openType: '',
    });
  };

  return (
    <PageContainer>
      <ProTable<API.Role, API.PageParams>
        headerTitle="角色列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={roleList}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        toolBarRender={() => [
          <Button
            onClick={() => {
              setOpenPrams({
                open: true,
                openType: 'add',
              });
            }}
            key="button"
            icon={<PlusOutlined />}
            type="primary"
          >
            添加角色
          </Button>,
        ]}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 个角色进行操作
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

      <UpdateModal
        openParms={openParms}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
    </PageContainer>
  );
};

export default Menu;
