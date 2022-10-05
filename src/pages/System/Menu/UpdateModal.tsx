import { Modal, Form, Input, Button, Select } from 'antd';
import React, { useEffect } from 'react';

const Add = 'add';
const Edit = 'edit';
const TitleMap = {
  [Add]: '添加菜单',
  [Edit]: '编辑编辑',
};

type UpdateModalProps = {
  openParms: ModalProps;
  handleConfirm: (openType: string, values: any) => void;
  handleCancel: () => void;
};

const UpdateModal: React.FC<UpdateModalProps> = ({ openParms, handleConfirm, handleCancel }) => {
  const [form] = Form.useForm();
  const { open, openType, nodeData = {} } = openParms;

  useEffect(() => {
    const { id, title, icon, url } = nodeData;
    if (openType === Edit) {
      form.setFieldsValue({
        id: id,
        name: title,
        icon: icon,
        url: url,
      });
    }

    return function cleanUp() {
      form.resetFields();
    };
  }, [open]);

  const onFinish = () => {
    form.validateFields().then((values) => {
      if (openType === Add) {
        values.parentId = nodeData.id;
      }
      // values.id = nodeData.id + '-' + values.id;
      handleConfirm(openType, values);
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
          // extra="在添加菜单时，你写的id只需要填‘1’， ‘2’， ‘3’或者其他的合法字符,程序会自动加上父节点前缀，比如选中在2-1节点下创建子节点，那么最终创建的节点id为2-1-1"
          label="菜单ID"
          name="id"
          rules={[{ required: true, message: '请填写菜单ID' }]}
        >
          <Input disabled={openType === Edit} />
        </Form.Item>
        <Form.Item
          label="菜单名称"
          name="name"
          rules={[{ required: true, message: '请填写菜单名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="菜单图标" name="icon">
          <Select
            options={[
              { label: 'home', value: 'home' },
              { label: 'order', value: 'order' },
              { label: 'menu', value: 'menu' },
            ]}
          />
        </Form.Item>
        <Form.Item label="url" name="url">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateModal;
