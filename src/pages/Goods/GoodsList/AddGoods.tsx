import { Button, Drawer, message, Space, Steps } from 'antd';
import React, { useEffect, useState } from 'react';
import StepsContent1 from './components/StepsContent1';
import StepsContent2 from './components/StepsContent2';
import StepsContent3 from './components/StepsContent3';
import { Add, Edit, Watch } from '@/utils/common/constant';
import { useModel } from '@umijs/max';
import { addGoods, findSpu } from '@/services/aitao/goods/goods';
import { listByPid } from '@/services/aitao/goods/category';
import { findAllBrands } from '@/services/aitao/goods/brand';
import { findAllParas } from '@/services/aitao/goods/para';
import { findAllSpecs } from '@/services/aitao/goods/spec';
import styles from './AddGoods.less';

const { Step } = Steps;

const TitleMap = {
  [Add]: '添加商品',
  [Edit]: '编辑商品',
  [Watch]: '查看商品',
};

type AddGoodsPropsType = {
  drawerOpen: ModalProps;
  setDrawerOpen: Function;
};
const AddGoods: React.FC<AddGoodsPropsType> = ({ drawerOpen, setDrawerOpen }) => {
  const [current, setCurrent] = useState(0);
  const {
    spu,
    skuList,
    setSpu,
    setCategory1List,
    setCategory2List,
    setCategory3List,
    setBrands,
    setParas,
    setSpecs,
  } = useModel('goods');
  const { open, openType, record = {} } = drawerOpen;

  // 获取Spu数据
  const fetchSpu = async () => {
    if (openType === Edit || openType === Watch) {
      const { data } = await findSpu({ id: record.id });
      setSpu(data);
      return data;
    }
    return {};
  };

  // 获取分类数据
  const fetchCategoryListByPid = async (pid: number) => {
    const { data, success } = await listByPid({ pid });
    if (success) {
      return data || [];
    }
    return [];
  };

  const fetchCategoryData = (spu: API.Spu) => {
    if (openType === Edit || openType === Watch) {
      // 根据之前选的
      fetchCategoryListByPid(0).then((list) => {
        setCategory1List(list);
      });
      if (spu.category1Id) {
        fetchCategoryListByPid(spu.category1Id).then((list) => {
          setCategory2List(list);
        });
      }
      if (spu.category2Id) {
        fetchCategoryListByPid(spu.category2Id).then((list) => {
          setCategory3List(list);
        });
      }
    }
  };

  // 获取品牌数据
  const fetchBrands = async () => {
    const { data, success } = await findAllBrands();
    if (success) {
      setBrands(data);
    }
  };
  // 获取属性数据
  const fetchSpecs = async () => {
    const { data, success } = await findAllSpecs();
    if (success) {
      setSpecs(data);
    }
  };
  // 获取参数数据
  const fetchParas = async () => {
    const { data, success } = await findAllParas();
    if (success) {
      setParas(data);
    }
  };

  useEffect(() => {
    (async () => {
      if (open) {
        fetchBrands();
        fetchSpecs();
        fetchParas();
        const spu: API.Spu = await fetchSpu();
        fetchCategoryData(spu);
      }
    })();
  }, [open]);

  const next = () => {
    const { category1Id, category2Id, category3Id, name, caption, introduction, sn } = spu;
    // 第一步判断
    if (current === 0) {
      if (category1Id && category2Id && category3Id) {
        setCurrent(current + 1);
      } else {
        message.error('请选择商品的分类');
      }
    } else if (current === 1) {
      // 第二部判断
      if (name && caption && introduction && sn) {
        setCurrent(current + 1);
      } else {
        message.error('请填写完整商品的信息');
      }
    } else if (current === 2) {
      // 第三步判断
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleClose = () => {
    setCurrent(0);
    setSpu({});
    setDrawerOpen({ open: false, openType: '' });
  };

  const steps = [
    {
      title: '选择商品分类',
      content: <StepsContent1 openType={openType} />,
    },
    {
      title: '填写商品信息',
      content: <StepsContent2 openType={openType} />,
    },
    {
      title: '填写商品属性',
      content: <StepsContent3 openType={openType} />,
    },
  ];
  return (
    <Drawer
      title={TitleMap[openType]}
      size="large"
      placement="bottom"
      closable={false}
      open={open}
      destroyOnClose={true}
      extra={
        <Space>
          <Button onClick={handleClose}>Cancel</Button>
        </Space>
      }
    >
      <Steps className={styles.steps} current={current} labelPlacement="vertical">
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className={styles.stepsContent}>{steps[current].content}</div>
      <div className={styles.stepsAction}>
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            上一步，选择商品分类
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            下一步，填写商品信息
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={async () => {
              console.log('spu----->', spu);
              console.log('skuList------>', skuList);
              const { success } = await addGoods({ spu: spu, skuList: skuList });
              if (success) {
                message.success('添加成功');
              } else {
                message.error('添加失败');
              }
              handleClose();
            }}
          >
            提交审核
          </Button>
        )}
      </div>
    </Drawer>
  );
};

export default AddGoods;
