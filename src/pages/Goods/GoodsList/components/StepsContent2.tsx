import { Edit, Watch } from '@/utils/common/constant';
import { Checkbox, Form, Input, Select } from 'antd';
import React, { useEffect } from 'react';
import { useModel } from 'umi';
import styles from './StepsContent2.less';

const Option = Select.Option;
const TextArea = Input.TextArea;

const Content2: React.FC<{ openType: any }> = ({ openType }) => {
  const [form] = Form.useForm();
  const { spu, setSpu, category1List, category2List, category3List, brands } = useModel('goods');
  const {
    name,
    caption,
    brandId,
    freightId,
    introduction,
    sn,
    saleService,
    category1Id,
    category2Id,
    category3Id,
  } = spu;

  const c1 = category1List.find((item) => item.id === category1Id);
  const c2 = category2List.find((item) => item.id === category2Id);
  const c3 = category3List.find((item) => item.id === category3Id);

  // 查看模式
  const isWatch = openType === Watch;

  useEffect(() => {
    // 编辑和查看时的数据回显
    if (openType === Edit || openType === Watch) {
      form.setFieldsValue({
        name,
        caption,
        brandId,
        freightId,
        introduction,
        sn,
        saleService,
      });
    }
  }, []);

  const handleFormChange = (key: string, value: any) => {
    // 根据传入的key修改goods数据
    setSpu((state) => ({
      ...state,
      [key]: value,
    }));
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      autoComplete="off"
    >
      <div className={styles.header}>基本信息</div>
      <Form.Item label="商品分类" name="abc" rules={[{ required: true }]}>
        <div>
          {c1?.name} &gt; {c2?.name} &gt; {c3?.name}
        </div>
      </Form.Item>

      <Form.Item
        label="商品名称"
        name="name"
        rules={[{ required: true, message: '请输入商品名称' }]}
      >
        <Input
          value={name}
          disabled={isWatch}
          onChange={(e) => {
            handleFormChange('name', e.target.value);
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
          disabled={isWatch}
          onChange={(e) => {
            handleFormChange('caption', e.target.value);
          }}
        />
      </Form.Item>

      <Form.Item
        label="商品品牌"
        name="brandId"
        rules={[{ required: true, message: '请选择商品品牌' }]}
      >
        <Select
          value={caption}
          disabled={isWatch}
          onChange={(value) => {
            handleFormChange('brandId', value);
          }}
          showSearch
          options={brands.map((brand: { name: any; id: any }) => ({
            label: brand.name,
            value: brand.id,
          }))}
        />
      </Form.Item>

      {/* <Form.Item
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
      </Form.Item> */}

      <Form.Item label="运费模板" name="freightId">
        <Select
          value={freightId}
          disabled={isWatch}
          onChange={(value) => {
            handleFormChange('freightId', value);
          }}
        >
          <Option value="1">包邮</Option>
          <Option value="2">6块</Option>
        </Select>
      </Form.Item>

      <div className={styles.header}>库存规格</div>
      <Form.Item label="商品货号" name="sn" rules={[{ required: true, message: '商品货号' }]}>
        <Input
          value={sn}
          disabled={isWatch}
          onChange={(e) => {
            handleFormChange('sn', e.target.value);
          }}
        />
      </Form.Item>

      <Form.Item label="服务保证" name="saleService">
        <Checkbox.Group
          disabled={isWatch}
          options={[
            { label: '无忧退货', value: '0' },
            { label: '快速退款', value: '1' },
            { label: '免费包邮', value: '2' },
          ]}
          value={saleService ? [saleService] : []}
          onChange={(value) => {
            handleFormChange('saleService', value);
          }}
        />
      </Form.Item>
    </Form>
  );
};

export default Content2;
