import { message } from 'antd';

/**
 * 该函数主要处理管理平台常用的增删改模态框的逻辑
 * @param fn 需要执行的请求
 * @param callback 请求执行完的回调
 */
export const handleModalOperation = async (fn: () => Promise<any>, callback?: () => void) => {
  const { success } = await fn();
  if (success) {
    !!callback && callback();
    return message.success('操作成功');
  }
  message.error('操作失败');
};
