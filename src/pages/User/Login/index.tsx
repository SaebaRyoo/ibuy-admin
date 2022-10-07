import Footer from '@/components/Footer';
import { login } from '@/services/aitao/login/login';
import {
  AlipayCircleOutlined,
  LockOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { Alert, message, Tabs } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  // const { initialState, setInitialState } = useModel('@@initialState');

  // const fetchUserInfo = async () => {
  //   const userInfo = await initialState?.fetchUserInfo?.();

  //   if (userInfo) {
  //     await setInitialState((s) => ({ ...s, currentUser: userInfo }));
  //   }
  // };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      values.scope = 'sys';
      // 登录
      const result = await login({ ...values });

      if (result.code === 20000) {
        message.success('登录成功！');
        localStorage.setItem('satoken', result.data.saToken);
        // await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }

      console.log(result); // 如果失败去设置用户错误信息

      setUserLoginState(result);
    } catch (error) {
      console.log(error);
      message.error('登录失败，请重试！');
    }
  };

  const { code } = userLoginState;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.png" />}
          title="后台管理平台"
          initialValues={{
            autoLogin: true,
          }}
          actions={[
            '其他登录方式',
            <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.icon} />,
            <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.icon} />,
            <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.icon} />,
          ]}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          {/* <div>账户密码登录</div> */}
          {code === 20002 && <LoginMessage content="账户或密码错误(admin/ant.design)" />}
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              initialValue="admin"
              placeholder="用户名: admin or user"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              initialValue="123456"
              placeholder="密码: 123456"
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
          </>
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
