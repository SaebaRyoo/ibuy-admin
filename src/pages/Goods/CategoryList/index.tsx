import React, { useRef, useState } from 'react';
import { removeCategory, categoryList } from '@/services/aitao/goods/category';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Switch } from 'antd';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import UpdateModal from './UpdateModal';

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
    await removeCategory({
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

const TitleMap = {
  1: '一级分类',
  2: '二级分类',
  3: '三级分类',
};

export type OpenParam = {
  open: boolean;
  openType: string;
};

const Goods: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<API.Category[]>([]);
  const [categoryLevel, setCateGoryLevel] = useState<number>(1);
  const [openParam, setOpenParam] = useState<OpenParam>({ open: false, openType: '' });

  const columns: ProColumns<API.Category>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      render: (dom, entity) => {
        return <a>{dom}</a>;
      },
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      sorter: true,
      hideInForm: true,
    },
    {
      title: '商品数量',
      dataIndex: 'goods_num',
    },
    {
      title: '数量单位',
      dataIndex: 'num_unit',
    },
    {
      title: '是否导航',
      dataIndex: 'is_menu',
      render: (_, record) => {
        const flag = record.is_menu == '1';
        return (
          <>
            <Switch key="" defaultChecked={flag} />
          </>
        );
      },
    },
    {
      title: '是否显示',
      dataIndex: 'is_show',
      render: (_, record) => {
        const flag = record.is_show == '1';
        return (
          <>
            <Switch key="" defaultChecked={flag} />
          </>
        );
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
              setOpenParam({ open: true, openType: 'add' });
            }}
            key="add"
          >
            新增下级
          </a>
        ) : null,
        categoryLevel >= 1 && categoryLevel < 3 ? (
          <a
            onClick={(record) => {
              setCateGoryLevel((prev) => prev + 1);
            }}
            key="watch"
          >
            查看下级
          </a>
        ) : null,
        <a key="transmit">转移商品</a>,
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
      <ProTable<API.Category, API.PageParams>
        headerTitle={`分类管理/${TitleMap[categoryLevel]}`}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={categoryList}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        toolBarRender={() => [
          categoryLevel > 1 ? (
            <Button
              onClick={() => setCateGoryLevel((prev) => prev - 1)}
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

      <UpdateModal
        openParam={openParam}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
    </PageContainer>
  );
};

export default Goods;
