import { CloudUploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Form, message, Modal, Upload, UploadFile, UploadProps } from 'antd';
import { RcFile, UploadChangeParam } from 'antd/lib/upload';
import React, { useEffect, useState } from 'react';

type UpdateModalProps = {
  openParam: ModalProps;
  albumList: API.Album[];
  handleConfirm: (value: any) => void;
  handleCancel: () => void;
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传JPG/PNG文件!');
  }
  const isLt50KB = file.size / 1024 < 50;
  if (!isLt50KB) {
    message.error('图片不能大于50kb!');
  }
  return isJpgOrPng && isLt50KB;
};
const UploadModal: React.FC<UpdateModalProps> = ({
  openParam,
  albumList,
  handleConfirm,
  handleCancel,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const { open } = openParam;

  useEffect(() => {
    return function cleanUp() {
      setLoading(false);
      setImageUrl('');
      form.resetFields();
    };
  }, [open]);

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'error') {
      message.error('上传失败');
      return;
    }
    if (info.file.status === 'done') {
      message.success('上传成功');
      // get the real url from server
      setImageUrl(info.file.response.data);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <CloudUploadOutlined />}
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  );

  const onFinish = () => {
    form.validateFields().then((values) => {
      values.image = imageUrl;
      handleConfirm(values);
    });
  };
  const normFile = (e: any) => {
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
        <Form.Item
          label="选择图片"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="只能上传jpg/png格式文件，文件不能超过50kb"
        >
          <Upload
            name="file"
            listType="picture-card"
            showUploadList={false}
            action="/api/v1/file/upload"
            headers={{
              token: localStorage.getItem('token') || '',
            }}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="logo" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UploadModal;
