import { useState, useEffect } from 'react';
// utils/hooks.js
export function useRequest<T>(fn: () => Promise<any>, dependencies: any) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);

  const request = async () => {
    setLoading(true);
    const fnData: any = await fn();
    setData(fnData);
    setLoading(false);
  };

  useEffect(() => {
    request();
  }, dependencies);

  return { data, loading };
}
