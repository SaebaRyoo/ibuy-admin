import React from 'react';
import { useModel } from 'umi';
import { Checkbox, Form, Input, Select } from 'antd';
import styles from './StepsContent2.less';

const Option = Select.Option;
const TextArea = Input.TextArea;

const Content2: React.FC = () => {
  const { spu, useSpu } = useModel('goods');
  const {
    category1_id,
    category2_id,
    category3_id,
    name,
    caption,
    freight_id,
    introduction,
    sn,
    sale_service,
  } = spu;

  const handleFormChange = (key: string, value: any) => {
    // 根据传入的key修改goods数据
    useSpu((state) => ({
      ...state,
      [key]: value,
    }));
  };

  return (
    <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }} autoComplete="off">
      <div className={styles.header}>基本信息</div>
      <Form.Item label="商品分类" name="abc" rules={[{ required: true }]}>
        <div>数码 &gt; 手机 &gt; 华为</div>
      </Form.Item>

      <Form.Item
        label="商品名称"
        name="name"
        rules={[{ required: true, message: '请输入商品名称' }]}
      >
        <Input
          value={name}
          onChange={(value) => {
            handleFormChange('name', value);
          }}
        />
      </Form.Item>

      <Form.Item
        label="副标题"
        name="caption"
        rules={[{ required: true, message: '请输入副标题' }]}
      >
        <Input
          value={caption}
          onChange={(value) => {
            handleFormChange('caption', value);
          }}
        />
      </Form.Item>

      <Form.Item
        label="商品品牌"
        name="brand_id"
        rules={[{ required: true, message: '请选择商品品牌' }]}
      >
        <Select
          value={caption}
          onChange={(value) => {
            handleFormChange('brand_id', value);
          }}
        >
          <Option value="1">华为</Option>
          <Option value="2">苹果</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="商品介绍"
        name="introduction"
        rules={[{ required: true, message: '请输入商品介绍' }]}
      >
        <TextArea
          value={introduction}
          placeholder="请输入内容"
          onChange={(value) => {
            handleFormChange('introduction', value);
          }}
        />
      </Form.Item>

      <Form.Item
        label="运费模板"
        name="freight_id"
        rules={[{ required: true, message: '请选择运费模板' }]}
      >
        <Select
          value={freight_id}
          onChange={(value) => {
            handleFormChange('freight_id', value);
          }}
        >
          <Option value="1">模板1</Option>
          <Option value="2">模板2</Option>
        </Select>
      </Form.Item>

      <div className={styles.header}>库存规格</div>
      <Form.Item label="商品货号" name="sn" rules={[{ required: true, message: '商品货号' }]}>
        <Input
          value={sn}
          onChange={(value) => {
            handleFormChange('sn', value);
          }}
        />
      </Form.Item>

      <Form.Item label="服务保证" name="sale_service">
        <Checkbox.Group
          options={[
            { label: '无忧退货', value: '0' },
            { label: '快速退款', value: '1' },
            { label: '免费包邮', value: '2' },
          ]}
          value={[sale_service]}
          onChange={(value) => {
            handleFormChange('sale_service', value);
          }}
        />
      </Form.Item>
    </Form>
  );
};

export default Content2;
