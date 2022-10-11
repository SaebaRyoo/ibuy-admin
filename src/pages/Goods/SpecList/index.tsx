import React, { useRef, useState } from 'react';
import { removeSpec, specList } from '@/services/aitao/goods/spec';
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
const handleRemove = async (selectedRows: API.Spec[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeSpec({
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

export type OpenParam = {
  open: boolean;
  openType: string;
};

const Goods: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<API.Spec[]>([]);
  const [openParam, setOpenParam] = useState<OpenParam>({ open: false, openType: '' });

  const columns: ProColumns<API.Spec>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      render: (dom, entity) => {
        return <a>{dom}</a>;
      },
    },
    {
      title: '规格名称',
      dataIndex: 'name',
      sorter: true,
      hideInForm: true,
    },
    {
      title: '模板',
      dataIndex: 'templateId',
    },
    {
      title: '可选值列表',
      dataIndex: 'options',
    },
    {
      title: '排序',
      dataIndex: 'seq',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="add"
          onClick={() => {
            setOpenParam({ open: true, openType: 'edit' });
          }}
        >
          编辑
        </a>,
        <a key="watch">删除</a>,
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
      <ProTable<API.Spec, API.PageParams>
        headerTitle="规格列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={specList}
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
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 个规格进行操作
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
        openParam={openParam}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
    </PageContainer>
  );
};

export default Goods;
