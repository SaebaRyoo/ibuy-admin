import { Modal, Form, Button, Select } from 'antd';
import React, { useEffect } from 'react';

type TransferModalProps = {
  openParam: ModalProps;
  albumList: API.Album[];
  handleConfirm: (value: any, selectedUid: string[]) => void;
  handleCancel: () => void;
};
const TransferModal: React.FC<TransferModalProps> = ({
  openParam,
  albumList,
  handleConfirm,
  handleCancel,
}) => {
  const [form] = Form.useForm();
  const { open, selectedUid = [] } = openParam;
  const onFinish = () => {
    form.validateFields().then((values) => {
      handleConfirm(values, selectedUid);
    });
  };

  useEffect(() => {
    return function cleanUp() {
      form.resetFields();
    };
  }, [open]);

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
          <Select options={albumList?.map((album) => ({ label: album.title, value: album.id }))} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TransferModal;
