import { PageContainer } from '@ant-design/pro-components';
import { Card, Typography } from 'antd';
import React from 'react';

const Welcome: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Typography.Text strong>欢迎，这里是图表页</Typography.Text>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
