import {
  addCategory,
  categoryList,
  delCategory,
  editCategory,
} from '@/services/ibuy/goods/category';
import { handleModalOperation } from '@/utils/common/handleModalOperation';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import UpdateModal from './UpdateModal';

const Add = 'add';
const Edit = 'edit';
type PageParams = {
  current?: number;
  pageSize?: number;
  parentId: number;
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.Category[]) => {
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

const TitleMap = {
  1: '一级分类',
  2: '二级分类',
  3: '三级分类',
};

const Goods: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [modal, contextHolder] = Modal.useModal();
  const [selectedRowsState, setSelectedRows] = useState<API.Category[]>([]);
  const [categoryLevel, setCateGoryLevel] = useState<number>(1);
  const [openParam, setOpenParam] = useState<ModalProps>({ open: false, openType: '' });
  // 设置额外的参数parentId, 查询当前分类的下一级
  const [extraParams, setExtraParams] = useState<{ parentId: number }>({ parentId: 0 });
  // 记录当前层级的parentId,用来返回上一级
  const [pidList, setCurrentLevelParentId] = useState<number[]>([0]);

  const columns: ProColumns<API.Category>[] = [
    {
      title: '编号',
      dataIndex: 'id',
    },
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '商品数量',
      dataIndex: 'goodsNum',
    },
    {
      title: '数量单位',
      dataIndex: 'num_unit',
    },
    {
      title: '是否导航',
      dataIndex: 'isMenu',
      render: (_, record) => {
        const flag = record.isMenu == '1';
        return <div>{flag ? '是' : '否'}</div>;
      },
    },
    {
      title: '是否显示',
      dataIndex: 'isShow',
      render: (_, record) => {
        const flag = record.isShow == '1';
        return <div>{flag ? '是' : '否'}</div>;
      },
    },
    {
      title: '排序',
      dataIndex: 'seq',
    },
    {
      title: '设置',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        categoryLevel >= 1 && categoryLevel < 3 ? (
          <a
            onClick={() => {
              setOpenParam({ open: true, openType: 'add', id: record.id, curType: true });
            }}
            key="add"
          >
            新增下级
          </a>
        ) : null,
        categoryLevel >= 1 && categoryLevel < 3 ? (
          <a
            onClick={() => {
              setCateGoryLevel((prev) => prev + 1);
              setExtraParams({ parentId: record.id });
              setCurrentLevelParentId((prev) => {
                const copy = [...prev];
                copy.push(record.parentId);
                return copy;
              });
            }}
            key="watch"
          >
            查看下级
          </a>
        ) : null,
        // TODO: 转移商品暂不实现
        // <a key="transfer">转移商品</a>,
      ],
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="add"
          onClick={() => {
            setOpenParam({ open: true, openType: 'edit', id: record.id });
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
                  async () => await delCategory({ id: record.id }),
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
      openType === Add
        ? async () => await addCategory(values)
        : async () => await editCategory(values);
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
      <ProTable<API.Category, PageParams>
        headerTitle={`分类管理/${TitleMap[categoryLevel]}`}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        params={extraParams}
        request={async (params, sort, filter) => {
          // console.log('params----->', params);
          const { data } = await categoryList(params);
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
          categoryLevel > 1 ? (
            <Button
              onClick={() => {
                setCateGoryLevel((prev) => prev - 1);
                const last = pidList[pidList.length - 1];
                setCurrentLevelParentId((prev) => {
                  const copy = [...prev];
                  copy.splice(copy.length - 1, 1);
                  return copy;
                });
                setExtraParams({ parentId: last });
              }}
              key="button"
              icon={<ArrowLeftOutlined />}
              type="primary"
            >
              返回上一级
            </Button>
          ) : null,
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
