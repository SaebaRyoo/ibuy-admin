import React, { useState } from 'react';
import { menuList } from '@/services/aitao/system/menu';
import { Button, message, Spin, Tree, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import UpdateModal from './UpdateModal';
import styles from './index.less';
import { DataNode } from 'antd/lib/tree';
import { useRequest } from '@/utils/useRequest';

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
          if (child.id.split('-').length === maxLen && parent.id === child.parentId) {
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

// const temp: any = [
//   {
//     id: '1',
//     name: '首页',
//     url: '/',
//     parentId: '0',
//   },
//   {
//     id: '2',
//     name: '商品管理',
//     url: '/goods',
//     parentId: '0',
//   },
//   {
//     id: '2-1',
//     name: '商品列表',
//     url: '/goods/goods',
//     parentId: '2',
//   },
//   {
//     id: '2-1-1',
//     name: '添加页面',
//     url: '/goods/goods/add',
//     parentId: '2-1',
//   },
//   {
//     id: '2-1-2',
//     name: '删除页面',
//     url: '/goods/goods/delete',
//     parentId: '2-1',
//   },
//   {
//     id: '2-2',
//     name: '品牌列表',
//     url: '/goods/brand',
//     parentId: '2',
//   },
//   {
//     id: '2-3',
//     name: '相册列表',
//     url: '/goods/album',
//     parentId: '2',
//   },
//   {
//     id: '3',
//     name: '订单管理',
//     url: '/order',
//     parentId: '0',
//   },
// ];
// const treeData: DataNode[] = createTreeData(temp);

const Menu: React.FC = () => {
  const [openParms, setOpenPrams] = useState<ModalProps>({ open: false, openType: '' });
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [modal, contextHolder] = Modal.useModal();

  const { data, loading } = useRequest<DataNode[]>(async () => {
    const { data } = await menuList();
    const treeData: DataNode[] = createTreeData(data);
    setTimeout(() => {
      const keys = data.map((item: any) => item.id);
      setExpandedKeys(keys);
    }, 100);
    return treeData;
  }, []);

  const onExpand = (expandedKeysValue: React.Key[]) => {
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue: any) => {
    setCheckedKeys(checkedKeysValue);
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
      <Spin spinning={loading}>
        <div className={styles.header}>
          <Button
            onClick={() => setOpenPrams({ open: true, openType: 'add' })}
            icon={<PlusOutlined />}
          >
            添加根节点
          </Button>
          <Button
            disabled={!(checkedKeys.length > 0)}
            onClick={() => {
              modal.confirm({
                title: '批量删除菜单',
                content: '是否要删除选中的菜单',
                onOk: () => {
                  console.log('checked----->', checkedKeys);
                },
              });
            }}
            icon={<PlusOutlined />}
          >
            批量删除
          </Button>
        </div>
        <Tree
          checkable
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          treeData={data}
          selectable={false}
          titleRender={(nodeData: any) => {
            return (
              <div className={styles.treeItem}>
                {nodeData.title}
                <a
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenPrams({ open: true, openType: 'update', nodeData: nodeData });
                  }}
                >
                  编辑
                </a>
                <a
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenPrams({ open: true, openType: 'add', nodeData: nodeData });
                  }}
                >
                  添加子节点
                </a>
                <a
                  onClick={(e) => {
                    e.stopPropagation();
                    modal.confirm({
                      title: '删除节点',
                      content: '是否要删除节点',
                      onOk: () => {
                        console.log('nodeData----->', nodeData);
                      },
                    });
                  }}
                >
                  删除
                </a>
              </div>
            );
          }}
        />
      </Spin>
      <UpdateModal
        openParms={openParms}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
      {/* `contextHolder` should always be placed under the context you want to access */}
      {contextHolder}
    </div>
  );
};

export default Menu;
