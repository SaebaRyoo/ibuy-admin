import { PlusOutlined } from '@ant-design/icons';
import { Modal, Form, Input, Button, Upload } from 'antd';
import React from 'react';
import { OpenParam } from './index';

const Add = 'add';
const Update = 'update';
const TitleMap = {
  [Add]: '添加品牌',
  [Update]: '编辑参数',
};

type UpdateModalProps = {
  openParam: OpenParam;
  handleConfirm: (value: any) => void;
  handleCancel: () => void;
};

const UpdateModal: React.FC<UpdateModalProps> = ({ openParam, handleConfirm, handleCancel }) => {
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
          label="品牌名称"
          name="name"
          rules={[{ required: true, message: '请填写品牌名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="品牌首字母" name="letter">
          <Input />
        </Form.Item>
        <Form.Item
          label="品牌LOGO"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: '请上传品牌logo' }]}
          extra="只能上传jpg/png格式文件，文件不能超过50kb"
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

export default UpdateModal;
