import { findBrand } from '@/services/ibuy/goods/brand';
import { CloudUploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Upload } from 'antd';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload';
import React, { useEffect, useState } from 'react';
const Add = 'add';
const Edit = 'edit';
const TitleMap = {
  [Add]: '添加品牌',
  [Edit]: '编辑参数',
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
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const { open, openType, record = {} } = openParam;
  const { id } = record;
  const fetchBrand = async () => {
    const { data = {} } = await findBrand({ id });
    const { name, letter, image } = data;
    // console.log('data---->', data);

    const file = {
      url: image,
    };
    form.setFieldsValue({
      name,
      letter,
      image: [file],
    });
    setImageUrl(image);
  };

  useEffect(() => {
    if (openType === Edit) {
      fetchBrand();
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
      setImageUrl(info.file.response.data);
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

export default UpdateModal;
