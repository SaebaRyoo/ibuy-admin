import { findPara } from '@/services/ibuy/goods/para';
import { findAllTemplates } from '@/services/ibuy/goods/template';
import { Button, Form, Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';

const Add = 'add';
const Edit = 'edit';
const TitleMap = {
  [Add]: '添加参数',
  [Edit]: '编辑参数',
};

type UpdateModalProps = {
  openParam: ModalProps;
  handleConfirm: (values: any, openType: string) => void;
  handleCancel: () => void;
};

const UpdateModal: React.FC<UpdateModalProps> = ({ openParam, handleConfirm, handleCancel }) => {
  const [form] = Form.useForm();
  const [templates, setTemplates] = useState<API.Template[]>([]);
  const { open, openType, record = {} } = openParam;
  const { id } = record;

  const fetchBrand = async () => {
    const { data = {} } = await findPara({ id });
    const { name, options, templateId, seq } = data;

    form.setFieldsValue({
      name,
      options,
      templateId,
      seq,
    });
  };

  const fetchAll = async () => {
    const { data = [], success } = await findAllTemplates();
    if (success) {
      setTemplates(data);
    }
  };

  useEffect(() => {
    fetchAll();
    if (openType === Edit) {
      fetchBrand();
    }
    return function cleanUp() {
      form.resetFields();
    };
  }, [open]);

  const onFinish = () => {
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
        scrollToFirstError
      >
        <Form.Item
          label="参数名称"
          name="name"
          rules={[{ required: true, message: '请填写参数名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="模板"
          name="templateId"
          rules={[{ required: true, message: '请选择模板' }]}
        >
          <Select
            disabled={openType === Edit}
            options={templates?.map((template) => ({ label: template.name, value: template.id }))}
          />
        </Form.Item>
        <Form.Item
          label="参数列表"
          name="options"
          tooltip="每个被 ',' 隔开的字符代表参数数组中的一个可选项"
        >
          <Input.TextArea placeholder="每写一个规格都需要一个英文的 ',' 隔开" />
        </Form.Item>
        <Form.Item label="排序" name="seq" tooltip="排序级别最高的属性可单独上传属性图片">
          <Input placeholder="默认为0，不排序" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateModal;
