import { Modal, Form, Input, Select, Radio, Button } from 'antd';
import React from 'react';
import { OpenParam } from './index';
import styles from './UpdateModal.less';

const Add = 'add';
const Update = 'update';
const TitleMap = {
  [Add]: '添加分类',
  [Update]: '编辑分类',
};

type UpdateModalProps = {
  openParam: OpenParam;
  handleConfirm: (value: any) => void;
  handleCancel: () => void;
};

const UpdateModal: React.FC<UpdateModalProps> = ({ openParam, handleConfirm, handleCancel }) => {
  const { open, openType } = openParam;
  const onFinish = (values: any) => {
    handleConfirm(values);
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Modal
      title={TitleMap[openType]}
      open={open}
      footer={
        <div className={styles.footer}>
          <Button onClick={handleCancel}>取消</Button>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </div>
      }
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="分类名称"
          name="name"
          rules={[{ required: true, message: '请填写分类名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="上级分类" name="parent_id">
          <Select
            placeholder="不选择默认为顶级分类"
            options={[
              {
                label: '图书、音像、电子书刊',
                value: 1,
              },
              {
                label: '个护化妆',
                value: 2,
              },
              {
                label: '电子产品',
                value: 3,
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="排序" name="seq">
          <Input />
        </Form.Item>
        <Form.Item label="是否显示" name="is_show">
          <Radio.Group>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="是否显示在导航栏" name="is_menu">
          <Radio.Group>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="选择模板" name="template_id">
          <Select
            options={[
              {
                label: '手机',
                value: 42,
              },
              {
                label: '电视',
                value: 43,
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateModal;
