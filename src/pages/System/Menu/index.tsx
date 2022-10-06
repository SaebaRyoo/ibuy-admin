import React, { useState } from 'react';
import { menuList, addMenu, editMenu, delMenu } from '@/services/aitao/system/menu';
import { Button, message, Spin, Tree, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import UpdateModal from './UpdateModal';
import styles from './index.less';
import { DataNode } from 'antd/lib/tree';
import { useRequest } from '@/utils/hooks/useRequest';
import { handleModalOperation } from '@/utils/common/handleModalOperation';

const Add = 'add';
const Edit = 'edit';
// 生成Tree组件的数据结构
const createTreeData = (data: any[] = []): DataNode[] => {
  const result: DataNode[] = [];
  // 通过分割id的长度，判断当前的menu处于什么层级
  let maxLen = 1;

  data?.forEach((item: any) => {
    if (item.id.split('-').length > maxLen) {
      maxLen = item.id.split('-').length;
    }
  });
  const loop = (data: any = [], maxLen: number) => {
    const cData = [...data];
    if (maxLen === 1) {
      cData?.forEach((item: any) => {
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
    cData?.forEach((parent: any) => {
      if (parent.id.split('-').length == maxLen - 1) {
        parent.children = parent.children || [];
        cData?.forEach((child: any) => {
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

const Menu: React.FC = () => {
  const [openParms, setOpenPrams] = useState<ModalProps>({ open: false, openType: '' });
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [modal, contextHolder] = Modal.useModal();
  const [changeCount, setChangeCount] = useState<number>(0);

  const { data, loading } = useRequest<DataNode[]>(async () => {
    const { data } = await menuList();
    const treeData: DataNode[] = createTreeData(data);
    setTimeout(() => {
      const keys = data.map((item: any) => item.id);
      setExpandedKeys(keys);
    }, 100);
    return treeData;
  }, [changeCount]);

  const onExpand = (expandedKeysValue: React.Key[]) => {
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue: any) => {
    setCheckedKeys(checkedKeysValue);
  };

  const handleConfirm = async (openType: string, values: any) => {
    setOpenPrams({
      open: false,
      openType: '',
    });

    const request =
      openType === Add ? async () => await addMenu(values) : async () => await editMenu(values);
    handleModalOperation(request, () => setChangeCount((prev) => prev + 1));
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
            onClick={() => setOpenPrams({ open: true, openType: Add })}
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
                  setChangeCount((prev) => prev + 1);
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
                    setOpenPrams({ open: true, openType: Edit, nodeData: nodeData });
                  }}
                >
                  编辑
                </a>
                <a
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenPrams({ open: true, openType: Add, nodeData: nodeData });
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
                      onOk: async () => {
                        handleModalOperation(
                          async () => await delMenu({ id: nodeData.id }),
                          () => setChangeCount((prev) => prev + 1),
                        );
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
