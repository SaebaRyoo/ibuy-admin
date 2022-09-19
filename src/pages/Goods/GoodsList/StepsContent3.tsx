import React, { useState } from 'react';
import { useModel } from 'umi';
import { Checkbox, Input, Select } from 'antd';
import styles from './StepsContent3.less';

// 已经确定的产品规格数据
// '{"网络":["联通2G", "联通3G", "联通4G", "联通5G"],"手机屏幕尺寸":["5寸","5.5寸"],"机身内存":["16G","32G","128G","256G"]}';

// 一个spu(标准产品单位)下的所有规格数据,
// 用户根据选择的产品分类的template_id获取对应的数据
// 比如以下以手机这个标准产品获取的数据
const specMap = {
  网络: ['联通2G', '联通3G', '联通4G', '联通5G', '移动2G', '移动3G', '移动4G', '移动5G'],
  手机屏幕尺寸: ['5寸', '5.5寸'],
  机身内存: ['16G', '32G', '128G', '256G'],
  像素: ['300万像素', '800万像素', '2000万像素'],
};

const Content2: React.FC = () => {
  const { spu, useSpu } = useModel('goods');
  const { spec_items } = spu;

  // 每个标准产品的规格数据是一个hashMap 字符串，需要转为object
  let convertData = spec_items ? JSON.parse(spec_items) : {};

  // console.log('convertData-----> ', convertData);

  const handleCheckbox = (value: string, key: string) => {
    // 如果没有数据，则初始化一个
    if (convertData[key] === undefined) {
      convertData[key] = [];
    }
    if (convertData[key]?.includes(value)) {
      convertData[key]?.forEach((val: string, i: number) => {
        if (val === value) {
          convertData[key]?.splice(i, 1);
          return;
        }
      });
    } else {
      convertData[key].push(value);
    }
    useSpu((prev) => {
      return {
        ...prev,
        spec_items: JSON.stringify(convertData),
      };
    });
  };

  // spec1 _ 生成规格列表
  const genSpecList = (data: any) => {
    const list = [];
    for (const key in data) {
      const item = (
        <div key={key} className={styles.specListItem}>
          <span>{key}: </span>
          <Checkbox.Group className={styles.specCheckboxWrapper}>
            {genSpecCheckbox(data[key], key)}
          </Checkbox.Group>
        </div>
      );

      list.push(item);
    }

    return list;
  };

  // spec2 _ 规格列表中的checkbox
  const genSpecCheckbox = (data: string[], key: string) => {
    return data.map((item, i) => {
      // 判断某个规格是否已经被选中
      const checked = convertData[key]?.includes(item);
      return (
        <div>
          <Checkbox
            checked={checked}
            onChange={(e) => handleCheckbox(e.target.value, key)}
            key={i}
            value={item}
          >
            {item}
          </Checkbox>
        </div>
      );
    });
  };

  // 生成sku表格
  // const genSkuTable = () => {
  //   return <div></div>;
  // };

  return (
    <div>
      <div className={styles.header}>商品规格</div>
      <div className={styles.specList}>{genSpecList(specMap)}</div>
      <div className={styles.specTable}></div>
      <div className={styles.header}>商品参数</div>

      <div className={styles.header}>商品相册</div>

      <div className={styles.header}>商品描述</div>
    </div>
  );
};

export default Content2;
