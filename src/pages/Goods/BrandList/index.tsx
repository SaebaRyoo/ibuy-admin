import { addBrand, brandList, delBrand, editBrand } from '@/services/ibuy/goods/brand';
import { handleModalOperation } from '@/utils/common/handleModalOperation';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import UpdateModal from './UpdateModal';

const Add = 'add';
const Edit = 'edit';
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
  const [selectedRowsState, setSelectedRows] = useState<API.Brand[]>([]);
  const [openParam, setOpenParam] = useState<ModalProps>({ open: false, openType: '' });
  const [modal, contextHolder] = Modal.useModal();

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
      render: (_, record) => {
        return <img style={{ maxHeight: 40 }} src={record.image} />;
      },
    },
    {
      title: '相关',
      dataIndex: 'about',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="edit"
          onClick={() => {
            setOpenParam({ open: true, openType: Edit, record });
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
                  async () => await delBrand({ id: record.id }),
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
    setOpenParam({
      open: false,
      openType: '',
    });
    const request =
      openType === Add ? async () => await addBrand(values) : async () => await editBrand(values);
    handleModalOperation(request, () => actionRef.current?.reset && actionRef.current.reset());
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
        request={async (params, sort, filter) => {
          const { data } = await brandList(params);
          return {
            data: data.data || [],
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
              setOpenParam({
                open: true,
                openType: Add,
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
      {contextHolder}
      <UpdateModal
        openParam={openParam}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
    </PageContainer>
  );
};

export default Goods;
