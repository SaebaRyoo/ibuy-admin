import { findAlbum } from '@/services/ibuy/goods/album';
import { CloudUploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Upload } from 'antd';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload';
import React, { useEffect, useState } from 'react';

const Add = 'add';
const Edit = 'edit';
const TitleMap = {
  [Add]: '新建相册',
  [Edit]: '编辑相册',
};

type UpdateModalProps = {
  openParam: ModalProps;
  handleConfirm: (values: any, openType: string) => void;
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
const UpdateModal: React.FC<UpdateModalProps> = ({ openParam, handleConfirm, handleCancel }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);
  const { open, openType, record = {} } = openParam;

  const { id } = record;
  const fetchAlbum = async () => {
    const { data = {} } = await findAlbum({ id });
    const { name, image, desc } = data;
    // console.log('data---->', data);

    const file = {
      url: image,
    };
    form.setFieldsValue({
      name,
      image: [file],
      desc,
    });
    setImageUrl(image);
  };
  useEffect(() => {
    if (openType === Edit) {
      fetchAlbum();
    }
    return function cleanUp() {
      setImageUrl('');
      setLoading(false);
      form.resetFields();
    };
  }, [open]);

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    console.log('info---->', info);
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
      setImageUrl(info.file.response.data.imgUrl);
    }
  };

  const onFinish = () => {
    form.validateFields().then((values) => {
      values.image = imageUrl;
      values.id = id;
      handleConfirm(values, openType);
    });
  };

  // 不加会报错 Uncaught TypeError: (fileList || []).forEach is not a function
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <CloudUploadOutlined />}
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  );
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
          <Upload
            name="file"
            listType="picture-card"
            showUploadList={false}
            action="/api/v1/file/upload"
            headers={{
              Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            }}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="logo" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item label="相册描述" name="desc">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateModal;
