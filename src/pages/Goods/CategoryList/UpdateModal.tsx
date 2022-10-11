import { Modal, Form, Input, Select, Radio, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { findAll, findCategory } from '@/services/aitao/goods/category';

const Add = 'add';
const Edit = 'edit';
const TitleMap = {
  [Add]: '添加分类',
  [Edit]: '编辑分类',
};

type UpdateModalProps = {
  openParam: ModalProps;
  handleConfirm: (values: any, openType: string) => void;
  handleCancel: () => void;
};

const UpdateModal: React.FC<UpdateModalProps> = ({ openParam, handleConfirm, handleCancel }) => {
  const [form] = Form.useForm();
  const [list, setList] = useState<API.Category[]>([]);

  const { open, openType, id, curType = false } = openParam;

  const fetchCategory = async () => {
    // 根据id获取分类详情
    const { data = {} } = await findCategory({ id });
    const { name, goodsNum, isShow, isMenu, seq, templateId, parentId } = data;
    form.setFieldsValue({
      name,
      goodsNum,
      isShow,
      isMenu,
      seq,
      parentId,
      templateId,
    });
  };

  const fetchList = async () => {
    // 获取分类列表
    const result = await findAll();
    if (curType) {
      // 当使用新增下一级的时候，新添加的分类的父节点就是当前分类的id
      form.setFieldsValue({
        parentId: id,
      });
    }
    setList(result ? result.data : []);
  };

  useEffect(() => {
    open && fetchList();
    if (openType === Edit) {
      open && fetchCategory();
    }
    return function cleanUp() {
      form.resetFields();
    };
  }, [open]);

  const onFinish = () => {
    form.validateFields().then((values) => {
      if (openType === Edit) {
        values.id = id;
      }
      values.parentId = values.parentId === undefined ? 0 : values.parentId;
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
        autoComplete="off"
      >
        <Form.Item
          label="分类名称"
          name="name"
          rules={[{ required: true, message: '请填写分类名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="上级分类" name="parentId">
          <Select
            disabled={curType}
            showSearch
            optionFilterProp="label"
            filterOption={(input, option) =>
              (option!.label as unknown as string).toLowerCase().includes(input.toLowerCase())
            }
            placeholder="不选择默认为顶级分类"
            options={list.map((item) => ({ label: `${item.name}/${item.id}`, value: item.id }))}
          />
        </Form.Item>
        <Form.Item label="排序" name="seq">
          <Input />
        </Form.Item>
        <Form.Item label="是否显示" name="isShow">
          <Radio.Group>
            <Radio value={'1'}>是</Radio>
            <Radio value={'0'}>否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="是否显示在导航栏" name="isMenu">
          <Radio.Group>
            <Radio value={'1'}>是</Radio>
            <Radio value={'0'}>否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="选择模板" name="templateId">
          <Select
            options={[
              {
                label: '手机',
                value: 42,
              },
              {
                label: '电视',
                value: 43,
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateModal;
