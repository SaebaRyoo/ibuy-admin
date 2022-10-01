import React, { useRef, useState } from 'react';
import { menuList } from '@/services/aitao/system/menu';
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
const handleRemove = async (selectedRows: API.Menu_T[]) => {
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

export type OpenMenu_Tm = {
  open: boolean;
  openType: string;
};

// type TreeItem = {
//   title: string;
//   key: string;
//   children?: TreeItem;
// };
// const createTreeData = (arr: any[]): TreeItem[] => {
//   const result: TreeItem[] = [];
//   const loop = (data: any[]) => {
//     data.forEach((item) => {
//       if (item.parent_id === '0') {
//       }
//     });
//   };
//   loop(arr);
//   return result;
// };

const Menu: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<API.Menu_T[]>([]);
  const [openParms, setOpenPrams] = useState<OpenMenu_Tm>({ open: false, openType: '' });

  const columns: ProColumns<API.Menu_T>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '菜单名称',
      dataIndex: 'name',
      sorter: true,
      hideInForm: true,
    },
    {
      title: '菜单图标',
      dataIndex: 'icon',
    },
    {
      title: 'url',
      dataIndex: 'url',
    },
    {
      title: '父节点',
      dataIndex: 'parent_id',
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
      <ProTable<API.Menu_T, API.PageParams>
        headerTitle="菜单列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={menuList}
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
            添加菜单
          </Button>,
        ]}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 个菜单进行操作
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
