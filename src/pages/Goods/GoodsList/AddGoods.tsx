import { Button, Drawer, message, Space, Steps } from 'antd';
import React, { useState } from 'react';
import StepsContent1 from './components/StepsContent1';
import StepsContent2 from './components/StepsContent2';
import StepsContent3 from './components/StepsContent3';

import styles from './AddGoods.less';
import { Add, Edit, Watch } from '@/utils/common/constant';
import { useModel } from '@umijs/max';

const { Step } = Steps;

const TitleMap = {
  [Add]: '添加商品',
  [Edit]: '编辑商品',
  [Watch]: '查看商品',
};

export type AddGoodsPropsType = {
  drawerOpen: ModalProps;
  setDrawerOpen: Function;
};
const AddGoods: React.FC<AddGoodsPropsType> = ({ drawerOpen, setDrawerOpen }) => {
  const [current, setCurrent] = useState(0);
  const { spu } = useModel('goods');

  const { open, openType } = drawerOpen;

  const next = () => {
    const { category1Id, category2Id, category3Id, name, caption, freightId, introduction, sn } =
      spu;
    // 第一步判断
    if (current === 0) {
      if (category1Id && category2Id && category3Id) {
        setCurrent(current + 1);
      } else {
        message.error('请选择商品的分类');
      }
    } else if (current === 1) {
      // 第二部判断
      if (name && caption && freightId && introduction && sn) {
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
          <Button onClick={() => setDrawerOpen({ open: false, openType: '' })}>Cancel</Button>
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
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            提交审核
          </Button>
        )}
      </div>
    </Drawer>
  );
};

export default AddGoods;
