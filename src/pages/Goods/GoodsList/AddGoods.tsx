import { Button, Drawer, Space } from 'antd';
import React from 'react';
import Steps from './components/Steps';

export type AddGoodsPropsType = {
  drawerOpen: boolean;
  setDrawerOpen: Function;
};
const AddGoods: React.FC<AddGoodsPropsType> = ({ drawerOpen, setDrawerOpen }) => {
  return (
    <Drawer
      title="添加商品操作"
      size="large"
      placement="bottom"
      closable={false}
      open={drawerOpen}
      destroyOnClose={true}
      extra={
        <Space>
          <Button onClick={() => setDrawerOpen(false)}>Cancel</Button>
        </Space>
      }
    >
      <Steps />
    </Drawer>
  );
};

export default AddGoods;
