import { Button, message, Steps } from 'antd';
import React, { useState } from 'react';
import styles from './Steps.less';

import StepsContent1 from './StepsContent1';
import StepsContent2 from './StepsContent2';
import StepsContent3 from './StepsContent3';

const { Step } = Steps;

const GoodsSteps: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: '选择商品分类',
      content: <StepsContent1 />,
    },
    {
      title: '填写商品信息',
      content: <StepsContent2 />,
    },
    {
      title: '填写商品属性',
      content: <StepsContent3 />,
    },
  ];
  return (
    <>
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
    </>
  );
};

export default GoodsSteps;
