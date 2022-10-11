import { Card, List } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import cx from 'classnames';
import styles from './StepsContent1.less';
import RightOutlined from '@ant-design/icons/lib/icons/RightOutlined';
import RightCircleOutlined from '@ant-design/icons/lib/icons/RightCircleOutlined';

const data = [
  {
    name: 'Ant Design Title 1',
    id: 1,
  },
  {
    name: 'Ant Design Title 2',
    id: 2,
  },
  {
    name: 'Ant Design Title 3',
    id: 3,
  },
  {
    name: 'Ant Design Title 4',
    id: 4,
  },
];

const data2 = [
  {
    name: 'd1',
    id: 1,
  },
  {
    name: 'd2',
    id: 2,
  },
  {
    name: 'd3',
    id: 3,
  },
  {
    name: 'd4',
    id: 4,
  },
];
const data3 = [
  {
    name: 'd1',
    id: 1,
  },
  {
    name: 'd2',
    id: 2,
  },
  {
    name: 'd3',
    id: 3,
  },
  {
    name: 'd4',
    id: 4,
  },
];
type SelectListProps = {
  title?: string;
  id?: number;
  dataSource?: any[];
  changeKey?: any;
};

const SelectList: React.FC<SelectListProps> = ({ title, id, dataSource, changeKey }) => {
  const { setSpu } = useModel('goods');
  return (
    <Card
      title={title}
      bordered={false}
      style={{
        width: 200,
      }}
      bodyStyle={{
        padding: 0,
      }}
    >
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        rowKey="id"
        renderItem={(item) => (
          <List.Item
            onClick={() => {
              // 修改goods数据
              setSpu((state) => ({
                ...state,
                [changeKey + '_id']: item.id,
              }));
            }}
            className={cx(styles.listItem, {
              [styles.selectedItem]: id === item.id,
            })}
          >
            {item.name}
            {changeKey == 'category3' ? null : <RightOutlined />}
          </List.Item>
        )}
      />
    </Card>
  );
};
const Content_1: React.FC = () => {
  const { spu } = useModel('goods');
  const { category1Id, category2Id, category3Id } = spu;
  return (
    <div>
      <div className={styles.header}>选择分类</div>
      <div className={styles.contentWrapper}>
        <SelectList title="选择一级分类" id={category1Id} dataSource={data} changeKey="category1" />
        {category1Id ? (
          <>
            <RightCircleOutlined className={styles.arrow} />
            <SelectList
              title="选择二级分类"
              id={category2Id}
              dataSource={data2}
              changeKey="category2"
            />
          </>
        ) : null}
        {category2Id ? (
          <>
            <RightCircleOutlined className={styles.arrow} />
            <SelectList
              title="选择三级分类"
              id={category3Id}
              dataSource={data3}
              changeKey="category3"
            />
          </>
        ) : null}
      </div>
      <div className={styles.footer}>
        您当前选择的商品类别是：<span>数码 &gt; 手机</span>
      </div>
    </div>
  );
};

export default Content_1;
