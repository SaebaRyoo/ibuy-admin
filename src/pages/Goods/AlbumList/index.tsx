import { addAlbum, albumList, delAlbum, editAlbum } from '@/services/ibuy/goods/album';
import { handleModalOperation } from '@/utils/common/handleModalOperation';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import { history } from 'umi';
import AlbumOperateModal from './AlbumOperateModal';

const Add = 'add';
const Edit = 'edit';
/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.Album[]) => {
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
  const [selectedRowsState, setSelectedRows] = useState<API.Album[]>([]);
  const [openParam, setOpenParam] = useState<ModalProps>({ open: false, openType: '' });
  const [modal, contextHolder] = Modal.useModal();

  const columns: ProColumns<API.Album>[] = [
    {
      title: '编号',
      dataIndex: 'id',
    },
    {
      title: '相册名称',
      dataIndex: 'title',
      sorter: true,
      hideInForm: true,
    },
    {
      title: '封面',
      dataIndex: 'image',
      render: (_, record) => <img style={{ width: 80 }} src={record.image} />,
    },
    {
      title: '图片数量',
      dataIndex: 'imageItems',
      render: (_, record) => (
        <div>{record.imageItems ? JSON.parse(record.imageItems).length : 0}</div>
      ),
    },
    {
      title: '描述',
      dataIndex: 'desc',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="watch"
          onClick={() => {
            console.log(record);
            history.push('/goods/albumDetails', {
              record,
            });
          }}
        >
          查看
        </a>,
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
                  async () => await delAlbum({ id: record.id }),
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
      openType === Add ? async () => await addAlbum(values) : async () => await editAlbum(values);
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
      <ProTable<API.Album, API.PageParams>
        headerTitle="相册管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={async (params, sort, filter) => {
          const { data } = await albumList(params);
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
            新建相册
          </Button>,
        ]}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 个相册进行操作
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
      <AlbumOperateModal
        openParam={openParam}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
    </PageContainer>
  );
};

export default Goods;
