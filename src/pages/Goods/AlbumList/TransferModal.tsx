import { Modal, Form, Button, Select } from 'antd';
import React from 'react';

const UploadModal: React.FC<CustomModalProps> = ({ openParam, handleConfirm, handleCancel }) => {
  const [form] = Form.useForm();
  const { open } = openParam;
  const onFinish = () => {
    form.validateFields().then((values) => {
      handleConfirm(values);
      console.log('Success:', values);
    });
  };

  return (
    <Modal
      title="转移图片到指定相册"
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
          label="选择相册"
          name="name"
          rules={[{ required: true, message: '请选择转移相册' }]}
        >
          <Select
            options={[
              { label: '相册1', value: 1 },
              { label: '相册2', value: 2 },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UploadModal;
