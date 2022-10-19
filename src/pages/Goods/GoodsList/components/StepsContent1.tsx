import { Card, List } from 'antd';
import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';
import cx from 'classnames';
import styles from './StepsContent1.less';
import { RightOutlined, RightCircleOutlined } from '@ant-design/icons';
import { listByPid } from '@/services/aitao/goods/category';
import { Watch } from '@/utils/common/constant';

// const data = [
//   {
//     name: 'Ant Design Title 1',
//     id: 1,
//   },
//   {
//     name: 'Ant Design Title 2',
//     id: 2,
//   },
//   {
//     name: 'Ant Design Title 3',
//     id: 3,
//   },
//   {
//     name: 'Ant Design Title 4',
//     id: 4,
//   },
// ];

// const data2 = [
//   {
//     name: 'd1',
//     id: 1,
//   },
//   {
//     name: 'd2',
//     id: 2,
//   },
//   {
//     name: 'd3',
//     id: 3,
//   },
//   {
//     name: 'd4',
//     id: 4,
//   },
// ];
// const data3 = [
//   {
//     name: 'd1',
//     id: 1,
//   },
//   {
//     name: 'd2',
//     id: 2,
//   },
//   {
//     name: 'd3',
//     id: 3,
//   },
//   {
//     name: 'd4',
//     id: 4,
//   },
// ];

const Category1 = 'category1';
const Category2 = 'category2';
const Category3 = 'category3';

type SelectListProps = {
  title?: string;
  id?: number;
  dataSource?: any[];
  changeKey: string;
  isWatch: boolean;
  handleOnClick: (id: number, changeKey: string) => void;
};

const SelectList: React.FC<SelectListProps> = ({
  title,
  id,
  dataSource,
  changeKey,
  isWatch,
  handleOnClick,
}) => {
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
        className={styles.list}
        rowKey="id"
        renderItem={(item) => (
          <List.Item
            onClick={() => {
              if (isWatch) return;
              handleOnClick(item.id, changeKey);
            }}
            className={cx(styles.listItem, {
              [styles.selectedItem]: id === item.id,
            })}
          >
            {item.name}
            {changeKey == Category3 ? null : <RightOutlined />}
          </List.Item>
        )}
      />
    </Card>
  );
};

const Content_1: React.FC<{ openType: any }> = ({ openType }) => {
  const {
    spu,
    setSpu,
    category1List,
    setCategory1List,
    category2List,
    setCategory2List,
    category3List,
    setCategory3List,
  } = useModel('goods');
  const { category1Id, category2Id, category3Id } = spu;

  const c1 = category1List.find((item) => item.id === category1Id);
  const c2 = category2List.find((item) => item.id === category2Id);
  const c3 = category3List.find((item) => item.id === category3Id);

  // 查看模式
  const isWatch = openType === Watch;

  // 根据pid获取分类列表
  const fetchCategoryListByPid = async (pid: number) => {
    const { data, success } = await listByPid({ pid });
    if (success) {
      return data || [];
    }
    return [];
  };

  useEffect(() => {
    (async () => {
      // 获取一级列表
      const data = await fetchCategoryListByPid(0);
      setCategory1List(data);
    })();
  }, []);

  const handleOnClick = async (clickId: number, changeKey: string) => {
    // 修改goods数据
    setSpu((state) => ({
      ...state,
      [changeKey + 'Id']: clickId,
    }));

    // 请求数据
    if (changeKey === Category1) {
      const data = await fetchCategoryListByPid(clickId);
      setCategory2List(data);
    }

    if (changeKey === Category2) {
      const data = await fetchCategoryListByPid(clickId);
      setCategory3List(data);
    }
  };

  return (
    <div>
      <div className={styles.header}>选择分类</div>
      <div className={styles.contentWrapper}>
        <SelectList
          title="选择一级分类"
          id={category1Id}
          dataSource={category1List}
          handleOnClick={handleOnClick}
          changeKey={Category1}
          isWatch={isWatch}
        />
        {category1Id ? (
          <>
            <RightCircleOutlined className={styles.arrow} />
            <SelectList
              title="选择二级分类"
              id={category2Id}
              dataSource={category2List}
              handleOnClick={handleOnClick}
              changeKey={Category2}
              isWatch={isWatch}
            />
          </>
        ) : null}
        {category2Id ? (
          <>
            <RightCircleOutlined className={styles.arrow} />
            <SelectList
              title="选择三级分类"
              id={category3Id}
              dataSource={category3List}
              handleOnClick={handleOnClick}
              changeKey={Category3}
              isWatch={isWatch}
            />
          </>
        ) : null}
      </div>
      <div className={styles.footer}>
        您当前选择的商品类别是：
        {c1 && <span>{c1.name}</span>}
        {c2 && <span> &gt; {c2.name}</span>}
        {c3 && <span> &gt; {c3.name}</span>}
      </div>
    </div>
  );
};

export default Content_1;
