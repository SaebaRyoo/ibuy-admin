import { findSkuBySpuId } from '@/services/ibuy/goods/goods';
import { findAllTemplates, findParaAndSpecByTemplateId } from '@/services/ibuy/goods/template';
import { Edit, Watch } from '@/utils/common/constant';
import { uuid } from '@/utils/common/uuid';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { EditableProTable } from '@ant-design/pro-components';
import { Button, Checkbox, Form, message, Modal, Select, Tooltip, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import React, { ReactElement, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useModel } from 'umi';
import styles from './StepsContent3.less';

type Item = {
  id: number;
  idx: number;
  sn: string;
  key: string;
  spec: any;
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

/**
 * 添加商品： 步骤3 组件
 */
const Content3: React.FC<{ openType: any }> = ({ openType }) => {
  // 模板相关state
  const [templates, setTemplates] = useState<API.Template[]>([]);
  const [selectedTemplate, setTemplate] = useState<number>();
  const [specColumns, setSpecColumns] = useState<any[]>([]);
  const { spu, setSpu, skuList, setSkuList, specs, paras, setSpecs, setParas } = useModel('goods');
  const { id, specItems, paraItems } = spu;
  const specMap: { [x: string]: any } = {};
  const paraMap: { [x: string]: any } = {};

  // console.log('skuList-----> ', skuList);

  const fetchAll = async () => {
    const { data = [], success } = await findAllTemplates();
    if (success) {
      setTemplates(data);
    }
  };
  // 查看模式
  const isWatch = openType === Watch;

  // 生成Map
  specs?.forEach((spec) => {
    specMap[spec.name] = spec.options?.split(',');
  });
  paras?.forEach((para) => {
    paraMap[para.name] = para.options?.split(',');
  });

  // console.log('specMap--->', specMap);
  // console.log('specItems-----> ', specItems);
  // console.log('paraItems-----> ', paraItems);

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
      dataIndex: 'id',
      key: 'id',
      width: 250,
      // formItemProps: () => {
      //   return {
      //     rules: [{ required: true, message: '此项为必填项' }],
      //   };
      // },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 120,
      render: (text: any, record: Item, _: any, action: { startEditable: (arg0: any) => void }) =>
        null,
    },
  ];

  useEffect(() => {
    (async () => {
      fetchAll();
      if (openType === Watch || openType === Edit) {
        // 查看和编辑模式下获取sku数据
        setTemplate(spu.templateId);
        const { data, success } = await findSkuBySpuId({ spuId: id });

        const specItemsKey = Object.keys(specItems ?? {});
        if (success) {
          const columns: any[] = [];
          // 生成columns
          specItemsKey.forEach((key) => {
            columns.push({
              title: key,
              dataIndex: key,
              key: key,
              editable: false,
            });
          });

          if (specItemsKey.length > 0) {
            setSpecColumns(columns);
          } else {
            setSpecColumns([]);
          }
          // 保存sku数据
          setSkuList(data);
        }
      }
    })();
  }, []);

  const handleCheckbox = (checkedValues: any[], key: string) => {
    // console.log('checked = ', checkedValues, '----- key = ', key);
    const copyData = { ...(specItems ?? {}) };

    if (copyData[key] === undefined) {
      copyData[key] = [];
    }
    copyData[key] = checkedValues;
    // 设置spu数据
    setSpu((prev) => {
      return {
        ...prev,
        specItems: copyData,
      };
    });
    // 设置sku的数据
    genSkuData(copyData);
  };

  // spec1 _ 生成规格列表
  const genSpecList = (specMap: any) => {
    return Object.keys(specMap).map((key) => (
      <div key={key} className={styles.specListItem}>
        <span>{key}: </span>
        <Checkbox.Group
          disabled={isWatch}
          className={styles.specCheckboxWrapper}
          options={specMap[key].map((item: any) => ({ label: item, value: item }))}
          value={(specItems ?? {})[key]}
          onChange={(checkedValues) => handleCheckbox(checkedValues, key)}
        />
      </div>
    ));
  };

  // 生成sku初始数据
  const genSkuData = (newSpecItems: any) => {
    console.log('newSpecItems-->', newSpecItems);
    const specList: any[] = [];
    const columns: any[] = [];
    Object.keys(newSpecItems).forEach((key) => {
      const specItem = newSpecItems[key];
      // 排除掉空数组
      if (Array.isArray(specItem) && specItem.length > 0) {
        columns.push({
          title: key,
          dataIndex: key,
          key: key,
          editable: false,
        });
        specList.push(specItem);
      }
    });

    if (Object.keys(specItems ?? {}).length > 0) {
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
        spec,
        sn: uuid(),
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
      const spec = sku.spec;
      editableKeys.push(JSON.stringify(sku.spec));
      const obj: Item = {
        id: sku.id,
        idx: idx,
        sn: sku.sn,
        key: JSON.stringify(sku.spec),
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

    // console.log('editableKeys--->', editableKeys);
    return (
      <EditableProTable<Item>
        rowKey="key"
        loading={false}
        columns={skuColumns}
        recordCreatorProps={false}
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
      {/*
        TODO: 选择商品模板，商品模板绑定了spu所具有的spec和para。
        后续的 商品规格 和 商品属性 都应该依据这个template来查找对应的数据，
        但是目前的数据源是查找的所有的spec和para，这也需要修改
       */}
      <div className={styles.header}>商品模板</div>

      <div className={styles.specList}>
        <Select
          options={templates?.map((template) => ({ label: template.name, value: template.id }))}
          value={selectedTemplate}
          placeholder="请选择商品模板"
          onChange={async (value) => {
            setSpu((prev: any) => ({
              ...prev,
              templateId: value,
            }));
            setTemplate(value);
            if (value) {
              const { data, success } = await findParaAndSpecByTemplateId({ id: value });
              if (success) {
                setSpecs(data.spec);
                setParas(data.para);
              }
            }
          }}
        />
      </div>
      <div className={styles.header}>
        商品规格
        <Tooltip placement="top" title="请注意，在编辑规格的时候sku信息会重新生成">
          <ExclamationCircleOutlined style={{ color: 'green', marginLeft: 12 }} />
        </Tooltip>
      </div>
      <div className={styles.specList}>{genSpecList(specMap)}</div>
      <div className={styles.specTable}>{genSkuTable()}</div>
      <div className={styles.header}>商品参数</div>
      <GoodsParaComponent
        isWatch={isWatch}
        optionData={paraMap}
        data={paraItems ?? {}}
        setSpu={setSpu}
      />
      <div className={styles.header}>商品相册</div>
      <GoodsImages isWatch={isWatch} />
      <div className={styles.header}>商品描述</div>
      <RichTextComponent isWatch={isWatch} />
    </div>
  );
};

type GoodsParaProps = {
  optionData: { [x: string]: string[] };
  data: { [x: string]: any };
  isWatch: boolean;
  setSpu: (arg0: any) => void;
};

/**
 * 商品属性组件
 */
const GoodsParaComponent = ({ optionData, data, setSpu, isWatch }: GoodsParaProps) => {
  // console.log('data---->', data);
  const [form] = Form.useForm();
  const handleChange = (key: string, value: any) => {
    const copyData = { ...data };
    copyData[key] = value;
    setSpu((prev: any) => ({
      ...prev,
      paraItems: copyData,
    }));
  };

  // 初始化数据
  useEffect(() => {
    Object.keys(optionData).length > 0 &&
      Object.keys(optionData).map((key) => {
        form.setFieldValue(key, data[key]);
      });
  }, []);

  return (
    <Form
      className={styles.paraItems}
      form={form}
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
              disabled={isWatch}
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
const GoodsImages: React.FC<{ isWatch: boolean }> = ({ isWatch }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [mainImage, setMainImage] = useState<string | undefined>(undefined);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { spu, setSpu } = useModel('goods');

  // 获取相册初始化数据
  useEffect(() => {
    let images: any = spu.images
      ? spu.images.split(',').map((image) => ({ url: image, name: image, status: 'done' }))
      : [];
    setFileList(images);
  }, []);

  const handleCancel = () => setPreviewOpen(false);

  // 上传前的验证
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传JPG/PNG文件!');
    }
    return isJpgOrPng;
  };

  // 预览
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    const newImages = newFileList.map((file) =>
      file.response && file.response.data ? file.response.data : file.url,
    );
    setSpu((prev: any) => ({
      ...prev,
      images: newImages.join(),
    }));
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <div className={styles.goodsImages}>
      <Upload
        name="file"
        action={`/api/v1/file/upload`}
        headers={{
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        }}
        beforeUpload={beforeUpload}
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
        disabled={isWatch}
      >
        {fileList.length >= 5 ? null : uploadButton}
      </Upload>
      <div className={styles.goodsImage_footer}>
        <Button disabled={isWatch} type="primary">
          从图库中选择
        </Button>
        <span>按住ctrl可同时批量选择多张图片上传，最多可以上传5张图片，建议尺寸800*800px</span>
      </div>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

/**
 * 商品描述组件
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
const RichTextComponent: React.FC<{ isWatch: boolean }> = ({ isWatch }) => {
  const [value, setValue] = useState('');
  const { spu, setSpu } = useModel('goods');

  // 获取相册初始化数据
  useEffect(() => {
    setValue(spu.introduction || '');
  }, []);

  const handleChange = (value: React.SetStateAction<string>) => {
    setSpu((prev: any) => ({
      ...prev,
      introduction: value,
    }));
    setValue(value);
  };

  return (
    <ReactQuill
      className={styles.richTectWrapper}
      theme="snow"
      value={value}
      onChange={handleChange}
      modules={Editor.modules}
      formats={Editor.formats}
      bounds={'.app'}
      placeholder="请在这里填写你的商品描述"
    />
  );
};

export default Content3;
