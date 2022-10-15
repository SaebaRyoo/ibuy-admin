import React, { ReactElement, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import { Checkbox, Modal, Upload, Form, Select, Button } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import styles from './StepsContent3.less';
import { EditableProTable } from '@ant-design/pro-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import spec from 'mock/goods/spec';

type Item = {
  id: number;
  idx: number;
  sn: string;
  key: string;
  spec: string;
  price: number;
  num: number;
  saleNum: number;
  alertNum: number;
  images: string;
  skuId: number;
};

// 已经确定的产品规格数据 spu.specItems
// '{"网络":["联通2G", "联通3G"],"手机屏幕尺寸":["5寸", "5.5寸"],"机身内存":["16G"]}';

// 一个spu(标准产品单位)下的所有规格数据,
// 用户根据选择的产品分类的template_id获取(tb_spec表)对应的数据
// 比如以下以手机这个标准产品获取的数据
// const specMap = {
//   网络: ['联通2G', '联通3G', '联通4G', '联通5G', '移动2G', '移动3G', '移动4G', '移动5G'],
//   手机屏幕尺寸: ['5寸', '5.5寸'],
//   机身内存: ['16G', '32G', '128G', '256G'],
//   像素: ['300万像素', '800万像素', '2000万像素'],
// };

// spu.paraItems
// '{"出厂年份":"2022","版本":"1"}';

// 一个spu(标准产品单位)下的所有参数数据,
// 用户根据选择的产品分类的template_id获取(tb_para表)对应的数据
// const paraMap = {
//   出厂年份: ['2001', '2002', '2003', '2004', '20021', '2022'],
//   版本: ['1.0', '2.0', '3.0'],
// };

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
      paraItems: JSON.stringify(copyData),
    }));
  };

  return (
    <Form
      className={styles.paraItems}
      name="basic"
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 6 }}
      autoComplete="off"
    >
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
  const [mainImage, setMainImage] = useState<string | undefined>(undefined);
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
        // customRequest={()=>{}} // 覆盖默认上传行为，自定义上传
        // withCredentials={true} // 允许上传时携带cookie
        itemRender={(originNode: ReactElement, file: UploadFile) => (
          <div className={styles.customPictureRender}>
            {originNode}
            {mainImage === file.uid ? (
              <span className={styles.main}>商品主图</span>
            ) : (
              <span onClick={() => setMainImage(file.uid)}>设为主图</span>
            )}
          </div>
        )}
        listType="picture-card"
        multiple={true}
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 5 ? null : uploadButton}
      </Upload>
      <div className={styles.goodsImage_footer}>
        <Button type="primary">从图库中选择</Button>
        <span>按住ctrl可同时批量选择多张图片上传，最多可以上传5张图片，建议尺寸800*800px</span>
      </div>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

/**
 * 商品描述
 */
interface StringMap {
  [key: string]: any;
}
const Editor: { modules: StringMap | undefined; formats: string[] | undefined } = {
  /*
   * Quill modules to attach to editor
   * See https://quilljs.com/docs/modules/ for complete options
   */
  modules: {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  },
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  formats: [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ],
};
const RichTextComponent: React.FC = () => {
  const [value, setValue] = useState('');
  console.log(value);
  return (
    <ReactQuill
      className={styles.richTectWrapper}
      theme="snow"
      value={value}
      onChange={setValue}
      modules={Editor.modules}
      formats={Editor.formats}
      bounds={'.app'}
      placeholder="请在这里填写你的商品描述"
    />
  );
};

/**
 * 添加商品： 步骤3 组件
 */
const Content3: React.FC<{ openType: any }> = ({ openType }) => {
  const [specColumns, setSpecColumns] = useState<any[]>([]);
  const { spu, setSpu, skuList, setSkuList, specs, paras } = useModel('goods');
  const { specItems, paraItems } = spu;
  const specMap: { [x: string]: any } = {};
  const paraMap: { [x: string]: any } = {};

  specs?.forEach((spec) => {
    specMap[spec.name] = spec.options?.split(',');
  });
  paras?.forEach((para) => {
    paraMap[para.name] = para.options?.split(',');
  });

  // 每个标准产品的规格数据是一个hashMap 字符串，需要转为object
  const specConvertData = specItems ? JSON.parse(specItems) : {};
  // 参数数据
  const paraConvertData = paraItems ? JSON.parse(paraItems) : {};
  console.log('specConvertData-----> ', specConvertData);
  // console.log('paraConvertData-----> ', paraConvertData);

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
      dataIndex: 'alertNum',
      key: 'alertNum',
      width: 120,
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项，且必须为数字', pattern: /^[0-9]+$/ }],
        };
      },
    },
    {
      title: 'SKU编号',
      dataIndex: 'skuId',
      key: 'skuId',
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
        specItems: JSON.stringify(specConvertData),
      };
    });
  };

  // spec1 _ 生成规格列表
  const genSpecList = (data: any) => {
    return Object.keys(data).map((key) => (
      <div key={key} className={styles.specListItem}>
        <span>{key}: </span>
        {/* <Checkbox.Group className={styles.specCheckboxWrapper}>
          {genSpecCheckbox(data[key], key)}
        </Checkbox.Group> */}

        <div className={styles.specCheckboxWrapper}>{genSpecCheckbox(data[key], key)}</div>
      </div>
    ));
  };

  // spec2 _ 规格列表中的checkbox
  const genSpecCheckbox = (data: string[], key: string) => {
    return data.map((item, i) => {
      // 判断某个规格是否已经被选中
      const checked = specConvertData[key]?.includes(item);
      // console.log(
      //   `item:${item} had checked:${checked}, specConvertData[key]: ${specConvertData[key]}`,
      // );
      return (
        <div key={item}>
          <Checkbox
            checked={checked}
            onChange={(e) => handleCheckbox(e.target.value, key)}
            // value={item}
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
        alertNum: 0,
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
    const dataSource: Item[] = skuList.map((sku: API.Sku, idx: number) => {
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
        alertNum: sku.alertNum,
        images: sku.images,
        spuId: sku.spuId,
        saleNum: sku.saleNum,
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
                item.alertNum = Number(record.alertNum);
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
      <GoodsParaComponent optionData={paraMap} data={paraConvertData} setSpu={setSpu} />
      <div className={styles.header}>商品相册</div>
      <GoodsImages />
      <div className={styles.header}>商品描述</div>
      <RichTextComponent />
    </div>
  );
};

export default Content3;
