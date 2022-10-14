import { useState } from 'react';

const goods = () => {
  const [spu, setSpu] = useState<API.Spu>({});
  const [skuList, setSkuList] = useState<API.Sku[]>([]);
  return { spu, setSpu, skuList, setSkuList };
};
export default goods;
