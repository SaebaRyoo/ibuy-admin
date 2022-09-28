import { PlusOutlined } from '@ant-design/icons';
import { Modal, Form, Input, Button, Upload, Select } from 'antd';
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

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <Modal
      title="上传图片"
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
        <Form.Item label="选择相册" name="name" rules={[{ required: true, message: '请选择相册' }]}>
          <Select
            options={[
              { label: '相册1', value: 1 },
              { label: '相册2', value: 2 },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="选择图片"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="只能上传jpg/png格式文件，文件不能超过100kb"
        >
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UploadModal;
