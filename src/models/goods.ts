import { useState } from 'react';

const goods = () => {
  const [spu, setSpu] = useState<API.SpuListItem>({});
  const [skuList, setSkuList] = useState<API.SkuListItem[]>([]);
  return { spu, setSpu, skuList, setSkuList };
};
export default goods;
