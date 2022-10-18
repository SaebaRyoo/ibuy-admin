import { useState } from 'react';

const goods = () => {
  const [spu, setSpu] = useState<API.Spu>({});
  const [skuList, setSkuList] = useState<API.Sku[]>([]);

  // 分类State
  const [category1List, setCategory1List] = useState<API.Category[]>([]);
  const [category2List, setCategory2List] = useState<API.Category[]>([]);
  const [category3List, setCategory3List] = useState<API.Category[]>([]);

  // 品牌state
  const [brands, setBrands] = useState<API.Brand[]>([]);
  // 属性state
  const [specs, setSpecs] = useState<API.Spec[]>([]);
  // 参数state
  const [paras, setParas] = useState<API.Para[]>([]);
  return {
    spu,
    setSpu,
    skuList,
    setSkuList,
    category1List,
    category2List,
    category3List,
    setCategory1List,
    setCategory2List,
    setCategory3List,
    brands,
    setBrands,
    specs,
    setSpecs,
    paras,
    setParas,
  };
};
export default goods;
