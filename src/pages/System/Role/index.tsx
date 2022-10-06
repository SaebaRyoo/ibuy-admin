import React, { useRef, useState } from 'react';
import { roleList, addRole, editRole, delRole } from '@/services/aitao/system/role';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import UpdateModal from './UpdateModal';
import { handleModalOperation } from '@/utils/common/handleModalOperation';

const Add = 'add';
const Edit = 'edit';
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

const Menu: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<API.Role[]>([]);
  const [openParms, setOpenPrams] = useState<ModalProps>({ open: false, openType: '' });
  const [modal, contextHolder] = Modal.useModal();

  const columns: ProColumns<API.Role>[] = [
    {
      title: '编号',
      dataIndex: 'id',
    },
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="edit"
          onClick={() => {
            setOpenPrams({ open: true, openType: Edit, record });
          }}
        >
          编辑
        </a>,
        <a
          onClick={(e) => {
            e.stopPropagation();
            modal.confirm({
              title: '删除节点',
              content: '是否要删除节点',
              onOk: async () => {
                handleModalOperation(
                  async () => await delRole({ id: record.id }),
                  () => actionRef.current?.reset && actionRef.current.reset(),
                );
              },
            });
          }}
          key="del"
        >
          删除
        </a>,
      ],
    },
  ];

  const handleConfirm = (values: any, openType: string) => {
    setOpenPrams({
      open: false,
      openType: '',
    });
    const request =
      openType === Add ? async () => await addRole(values) : async () => await editRole(values);
    handleModalOperation(request, () => actionRef.current?.reset && actionRef.current.reset());
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
        request={async (params, sort, filter) => {
          const { data } = await roleList(params);
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
              setOpenPrams({
                open: true,
                openType: Add,
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

      {/* `contextHolder` should always be placed under the context you want to access */}
      {contextHolder}
      <UpdateModal
        openParms={openParms}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
    </PageContainer>
  );
};

export default Menu;
