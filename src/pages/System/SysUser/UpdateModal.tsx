import { Modal, Form, Input, Button } from 'antd';
import React, { useEffect } from 'react';

const Add = 'add';
const Edit = 'edit';
const TitleMap = {
  [Add]: '添加角色',
  [Edit]: '编辑角色',
};

type UpdateModalProps = {
  openParms: ModalProps;
  handleConfirm: (values: any, openType: string) => void;
  handleCancel: () => void;
};

const UpdateModal: React.FC<UpdateModalProps> = ({ openParms, handleConfirm, handleCancel }) => {
  const [form] = Form.useForm();
  const { open, openType, record = {} } = openParms;
  const onFinish = () => {
    form.validateFields().then((values) => {
      values.id = record.id;
      handleConfirm(values, openType);
    });
  };
  useEffect(() => {
    const { username, password } = record;
    if (openType === Edit) {
      form.setFieldsValue({
        username,
        password,
      });
    }

    return function cleanUp() {
      form.resetFields();
    };
  }, [open]);

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
          label="用户名称"
          name="username"
          rules={[{ required: true, message: '请填写用户名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="用户密码"
          name="password"
          rules={[{ required: true, message: '请填写用户密码' }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateModal;
