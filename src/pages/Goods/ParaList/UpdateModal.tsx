import { Modal, Form, Input, Button } from 'antd';
import React from 'react';
import { OpenParam } from './index';

const Add = 'add';
const Edit = 'edit';
const TitleMap = {
  [Add]: '添加参数',
  [Edit]: '编辑参数',
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
          label="参数名称"
          name="name"
          rules={[{ required: true, message: '请填写参数名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="参数列表" name="options" tooltip="一行代表参数数组中的一个可选值">
          <Input.TextArea placeholder="每写一个参数都需要换行" />
        </Form.Item>
        <Form.Item label="排序" name="seq" tooltip="排序级别最高的属性可单独上传属性图片">
          <Input placeholder="默认为0，不排序" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateModal;
