import { findTemplate } from '@/services/ibuy/goods/template';
import { Button, Form, Input, Modal } from 'antd';
import React, { useEffect } from 'react';

const Add = 'add';
const Edit = 'edit';
const TitleMap = {
  [Add]: '添加模板',
  [Edit]: '编辑模板',
};

type UpdateModalProps = {
  openParam: ModalProps;
  handleConfirm: (values: any, openType: string) => void;
  handleCancel: () => void;
};

const UpdateModal: React.FC<UpdateModalProps> = ({ openParam, handleConfirm, handleCancel }) => {
  const [form] = Form.useForm();
  const { open, openType, record = {} } = openParam;
  const { id } = record;

  const fetchTemplate = async () => {
    const { data = {} } = await findTemplate({ id });
    const { name } = data;

    form.setFieldsValue({
      name,
    });
  };

  useEffect(() => {
    if (openType === Edit) {
      fetchTemplate();
    }
    return function cleanUp() {
      form.resetFields();
    };
  }, [open]);

  const onFinish = (values: any) => {
    form.validateFields().then((values) => {
      values.id = id;
      handleConfirm(values, openType);
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
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="类型名称"
          name="name"
          rules={[{ required: true, message: '请填写类型名称' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateModal;
