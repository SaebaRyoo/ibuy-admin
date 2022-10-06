import { message } from 'antd';

export const handleModalOperation = async (fn: () => Promise<any>, callback?: () => void) => {
  const { success } = await fn();
  if (success) {
    !!callback && callback();
    return message.success('操作成功');
  }
  message.error('操作失败');
};
