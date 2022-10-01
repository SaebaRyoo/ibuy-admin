import { Modal, Form, Input, Button, Select } from 'antd';
import React from 'react';

const Add = 'add';
const Update = 'update';
const TitleMap = {
  [Add]: '添加参数',
  [Update]: '编辑参数',
};

type UpdateModalProps = {
  openParms: ModalProps;
  handleConfirm: (values: any) => void;
  handleCancel: () => void;
};

const UpdateModal: React.FC<UpdateModalProps> = ({ openParms, handleConfirm, handleCancel }) => {
  const [form] = Form.useForm();
  const { open, openType } = openParms;
  const onFinish = () => {
    form.validateFields().then((values) => {
      handleConfirm(values);
      console.log('Success:', values);
    });
  };

  return (
    <Modal
      title={TitleMap[openType]}
      open={open}
      footer={
        <div>
          <Button onClick={handleCancel}>取消</Button>
          <Button onClick={onFinish} type="primary" htmlType="submit">
            确定
          </Button>
        </div>
      }
    >
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        scrollToFirstError
      >
        <Form.Item label="菜单ID" name="id" rules={[{ required: true, message: '请填写菜单ID' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="菜单名称"
          name="name"
          rules={[{ required: true, message: '请填写菜单名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="菜单图标" name="icon">
          <Select
            options={[
              { label: 'home', value: 'home' },
              { label: 'order', value: 'order' },
              { label: 'menu', value: 'menu' },
            ]}
          />
        </Form.Item>
        <Form.Item label="父节点" name="url">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateModal;
