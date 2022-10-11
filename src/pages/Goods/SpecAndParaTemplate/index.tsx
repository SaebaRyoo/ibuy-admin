import React, { useRef, useState } from 'react';
import { templateList } from '@/services/aitao/goods/template';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import UpdateModal from './UpdateModal';

export type OpenParam = {
  open: boolean;
  openType: string;
};

const Goods: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [openParam, setOpenParam] = useState<OpenParam>({ open: false, openType: '' });

  const columns: ProColumns<API.Template>[] = [
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
      title: '规格数量',
      dataIndex: 'specNum',
    },
    {
      title: '参数数量',
      dataIndex: 'paraNum',
    },
    {
      title: '设置',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [<a key="spec">规格列表</a>, <a key="para">参数列表</a>],
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
      <ProTable<API.Template, API.PageParams>
        headerTitle="模板列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={templateList}
        columns={columns}
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
            添加模板
          </Button>,
        ]}
      />
      <UpdateModal
        openParam={openParam}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
    </PageContainer>
  );
};

export default Goods;
