import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import { Checkbox, Modal, Upload, Form, Select } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import styles from './StepsContent3.less';
import { EditableProTable } from '@ant-design/pro-components';

type Item = {
  id: number;
  idx: number;
  sn: string;
  key: string;
  spec: string;
  price: number;
  num: number;
  sale_num: number;
  alert_num: number;
  images: string;
  sku_id: number;
};

// 已经确定的产品规格数据 spu.spec_items
// '{"网络":["联通2G", "联通3G"],"手机屏幕尺寸":["5寸", "5.5寸"],"机身内存":["16G"]}';

// 一个spu(标准产品单位)下的所有规格数据,
// 用户根据选择的产品分类的template_id获取(tb_spec表)对应的数据
// 比如以下以手机这个标准产品获取的数据
const specMap = {
  网络: ['联通2G', '联通3G', '联通4G', '联通5G', '移动2G', '移动3G', '移动4G', '移动5G'],
  手机屏幕尺寸: ['5寸', '5.5寸'],
  机身内存: ['16G', '32G', '128G', '256G'],
  像素: ['300万像素', '800万像素', '2000万像素'],
};

// spu.para_items
// '{"出厂年份":"2022","版本":"1"}';

// 一个spu(标准产品单位)下的所有参数数据,
// 用户根据选择的产品分类的template_id获取(tb_para表)对应的数据
const paraMap = {
  出厂年份: ['2001', '2002', '2003', '2004', '20021', '2022'],
  版本: ['1.0', '2.0', '3.0'],
};

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

type GoodsParaProps = {
  optionData: { [x: string]: string[] };
  data: { [x: string]: any };
  setSpu: (arg0: any) => void;
};

/**
 * 商品属性组件
 */
const GoodsParaComponent = ({ optionData, data, setSpu }: GoodsParaProps) => {
  const handleChange = (key: string, value: any) => {
    const copyData = { ...data };
    copyData[key] = value;
    setSpu((prev: any) => ({
      ...prev,
      para_items: JSON.stringify(copyData),
    }));
  };

  return (
    <Form name="basic" labelCol={{ span: 4 }} wrapperCol={{ span: 6 }} autoComplete="off">
      {Object.keys(optionData).length > 0 &&
        Object.keys(optionData).map((key) => (
          <Form.Item key={key} label={key} name={key}>
            <Select
              value={data[key]}
              options={
                optionData[key].length > 0
                  ? optionData[key].map((value: any) => ({ label: value, value: value }))
                  : undefined
              }
              onChange={(value) => handleChange(key, value)}
            />
          </Form.Item>
        ))}
    </Form>
  );
};

/**
 * 商品相册组件
 */
const GoodsImages: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <div className={styles.goodsImages}>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        multiple={true}
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 5 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

/**
 * 添加商品： 步骤3 组件
 */
const Content3: React.FC = () => {
  const [specColumns, setSpecColumns] = useState<any[]>([]);
  const { spu, setSpu, skuList, setSkuList } = useModel('goods');
  const { spec_items, para_items } = spu;

  // 每个标准产品的规格数据是一个hashMap 字符串，需要转为object
  const specConvertData = spec_items ? JSON.parse(spec_items) : {};
  // 参数数据
  const paraConvertData = para_items ? JSON.parse(para_items) : {};
  // console.log('specConvertData-----> ', specConvertData);
  console.log('paraConvertData-----> ', paraConvertData);

  const otherColumns = [
    {
      title: '销售价格',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项，且必须为数字', pattern: /^[0-9]+$/ }],
        };
      },
    },
    {
      title: '商品库存',
      dataIndex: 'num',
      width: 120,
      key: 'num',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项，且必须为数字', pattern: /^[0-9]+$/ }],
        };
      },
    },
    {
      title: '库存预警值',
      dataIndex: 'alert_num',
      key: 'alert_num',
      width: 120,
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项，且必须为数字', pattern: /^[0-9]+$/ }],
        };
      },
    },
    {
      title: 'SKU编号',
      dataIndex: 'sku_id',
      key: 'sku_id',
      editable: false,
      width: 200,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text: any, record: Item, _: any, action: { startEditable: (arg0: any) => void }) =>
        null,
    },
  ];

  const handleCheckbox = (value: string, key: string) => {
    // 如果没有数据，则初始化一个
    if (specConvertData[key] === undefined) {
      specConvertData[key] = [];
    }
    if (specConvertData[key]?.includes(value)) {
      specConvertData[key]?.forEach((val: string, i: number) => {
        if (val === value) {
          specConvertData[key]?.splice(i, 1);
          if (specConvertData[key].length <= 0) {
            delete specConvertData[key];
          }
          return;
        }
      });
    } else {
      specConvertData[key].push(value);
    }

    // 根据选择的规格数据, 初始化sku数据
    genSkuData(specConvertData);

    // 设置spu数据
    setSpu((prev) => {
      return {
        ...prev,
        spec_items: JSON.stringify(specConvertData),
      };
    });
  };

  // spec1 _ 生成规格列表
  const genSpecList = (data: any) => {
    return Object.keys(data).map((key) => (
      <div key={key} className={styles.specListItem}>
        <span>{key}: </span>
        <Checkbox.Group className={styles.specCheckboxWrapper}>
          {genSpecCheckbox(data[key], key)}
        </Checkbox.Group>
      </div>
    ));
  };

  // spec2 _ 规格列表中的checkbox
  const genSpecCheckbox = (data: string[], key: string) => {
    return data.map((item, i) => {
      // 判断某个规格是否已经被选中
      const checked = specConvertData[key]?.includes(item);
      return (
        <div key={item}>
          <Checkbox
            checked={checked}
            onChange={(e) => handleCheckbox(e.target.value, key)}
            value={item}
          >
            {item}
          </Checkbox>
        </div>
      );
    });
  };

  // 生成sku初始数据
  const genSkuData = (data: any) => {
    const specList: any[] = [];
    const columns: any[] = [];
    Object.keys(data).forEach((key) => {
      columns.push({
        title: key,
        dataIndex: key,
        key: key,
        editable: false,
      });
      specList.push(data[key]);
    });

    if (Object.keys(specConvertData).length > 0) {
      setSpecColumns(columns);
    } else {
      setSpecColumns([]);
    }

    // sku表格生成就是一个笛卡尔乘积(x和y两个集合的笛卡尔积)
    const skuGroup = specList.reduce(
      (x, y) => {
        const arr: any[] = [];
        x.forEach((xItem: any[]) => y.forEach((yItem: any) => arr.push(xItem.concat([yItem]))));
        return arr;
      },
      [[]],
    );

    // 根据生成的sku数据再生sku成初始化数据
    const list = skuGroup.map((sku: any) => {
      const spec = {};
      sku.forEach((x: any, i: string | number) => {
        spec[columns[i].title] = x;
      });
      return {
        spec: JSON.stringify(spec),
        price: 0,
        num: 0,
        alert_num: 0,
        id: null,
        images: null,
      };
    });

    setSkuList(list);
  };

  // 生成sku表格
  const genSkuTable = () => {
    const skuColumns = specColumns.concat(otherColumns);
    const editableKeys: React.Key[] | undefined = [];
    const dataSource: Item[] = skuList.map((sku: API.SkuListItem, idx: number) => {
      const spec = sku.spec ? JSON.parse(sku.spec) : '{}';
      editableKeys.push(sku.spec);
      const obj: Item = {
        id: sku.id,
        idx: idx,
        sn: sku.sn,
        key: sku.spec,
        spec: sku.spec,
        name: sku.name,
        price: sku.price,
        num: sku.num,
        alert_num: sku.alert_num,
        images: sku.images,
        spu_id: sku.spu_id,
        sale_num: sku.sale_num,
        ...spec,
      };

      return obj;
    });
    return (
      <EditableProTable<Item>
        rowKey="key"
        loading={false}
        columns={skuColumns}
        recordCreatorProps={false}
        // request={async () => ({
        //   data: defaultData,
        //   total: 3,
        //   success: true,
        // })}
        value={dataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          actionRender: (row, config) => {
            return [<a key="delete">删除</a>, <a key="images">图片上传</a>];
          },
          onValuesChange: (record) => {
            const copyData = [...skuList];
            copyData.forEach((item) => {
              if (item.spec === record.spec) {
                item.price = Number(record.price);
                item.num = Number(record.num);
                item.alert_num = Number(record.alert_num);
              }
            });
            setSkuList(copyData);
          },
        }}
      />
    );
  };

  return (
    <div>
      <div className={styles.header}>商品规格</div>
      <div className={styles.specList}>{genSpecList(specMap)}</div>
      <div className={styles.specTable}>{genSkuTable()}</div>
      <div className={styles.header}>商品参数</div>
      <div className={styles.paraItems}>
        <GoodsParaComponent optionData={paraMap} data={paraConvertData} setSpu={setSpu} />
      </div>
      <div className={styles.header}>商品相册</div>
      <GoodsImages />
      <div className={styles.header}>商品描述</div>
    </div>
  );
};

export default Content3;
