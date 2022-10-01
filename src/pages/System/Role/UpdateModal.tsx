import { Modal, Form, Input, Button, Select } from 'antd';
import React from 'react';

const Add = 'add';
const Update = 'update';
const TitleMap = {
  [Add]: '添加角色',
  [Update]: '编辑角色',
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
        <Form.Item
          label="角色名称"
          name="name"
          rules={[{ required: true, message: '请填写角色名称' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateModal;
