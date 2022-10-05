import { PlusOutlined } from '@ant-design/icons';
import { Modal, Form, Input, Button, Upload } from 'antd';
import React from 'react';

const Add = 'add';
const Edit = 'edit';
const TitleMap = {
  [Add]: '新建相册',
  [Edit]: '编辑相册',
};

const UpdateModal: React.FC<CustomModalProps> = ({ openParam, handleConfirm, handleCancel }) => {
  const [form] = Form.useForm();
  const { open, openType } = openParam;
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
      title={openType && TitleMap[openType]}
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
          label="相册名称"
          name="name"
          rules={[{ required: true, message: '请填写相册名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="相册封面"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="只能上传jpg/png格式文件，文件不能超过50kb"
        >
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="相册描述" name="desc">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="排序" name="seq">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateModal;
