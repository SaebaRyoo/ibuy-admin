import { useState } from 'react';

const goods = () => {
  const [spu, useSpu] = useState<API.SpuListItem>({});
  const [sku, useSku] = useState<API.SkuListItem>({});
  return { spu, useSpu, sku, useSku };
};
export default goods;
