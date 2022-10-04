import React, { useRef, useState } from 'react';
import { menuList } from '@/services/aitao/system/menu';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Tree } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import UpdateModal from './UpdateModal';
import { DataNode } from 'antd/lib/tree';

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

const createTreeData = (data: any[]): DataNode[] => {
  const result: DataNode[] = [];

  // 通过分割id的长度，判断当前的menu处于什么层级
  let maxLen = 1;

  data.forEach((item: any) => {
    if (item.id.split('-').length > maxLen) {
      maxLen = item.id.split('-').length;
    }
  });

  const loop = (data: any, maxLen: number) => {
    const cData = [...data];
    if (maxLen === 1) {
      cData.forEach((item: any) => {
        if (maxLen === item.id.split('-').length) {
          result.push({
            ...item,
            title: item.name,
            key: item.id,
          });
        }
      });
      return;
    }
    cData.forEach((parent: any) => {
      if (parent.id.split('-').length == maxLen - 1) {
        parent.children = parent.children || [];
        cData.forEach((child: any) => {
          if (child.id.split('-').length === maxLen && parent.id === child.parent_id) {
            parent.children.push({
              ...child,
              title: child.name,
              key: child.id,
            });
          }
        });
      }
    });
    const nextLen = maxLen - 1;

    loop(cData, nextLen);
  };
  loop(data, maxLen);
  return result;
};

const temp: any = [
  {
    id: '1',
    name: '首页',
    url: '/',
    parent_id: '0',
  },
  {
    id: '2',
    name: '商品管理',
    url: '/goods',
    parent_id: '0',
  },
  {
    id: '2-1',
    name: '商品列表',
    url: '/goods/goods',
    parent_id: '2',
  },
  {
    id: '2-1-1',
    name: '添加页面',
    url: '/goods/goods/add',
    parent_id: '2-1',
  },
  {
    id: '2-1-2',
    name: '删除页面',
    url: '/goods/goods/delete',
    parent_id: '2-1',
  },
  {
    id: '2-2',
    name: '品牌列表',
    url: '/goods/brand',
    parent_id: '2',
  },
  {
    id: '2-3',
    name: '相册列表',
    url: '/goods/album',
    parent_id: '2',
  },
  {
    id: '3',
    name: '订单管理',
    url: '/order',
    parent_id: '0',
  },
];
const treeData: DataNode[] = createTreeData(temp);

const Menu: React.FC = () => {
  const [openParms, setOpenPrams] = useState<OpenMenu_Tm>({ open: false, openType: '' });

  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue: any) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

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
    <div>
      <Tree
        checkable
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={treeData}
      />
      <UpdateModal
        openParms={openParms}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default Menu;
