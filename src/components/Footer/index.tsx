import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} 爱桃商城`}
      links={[
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/SaebaRyoo/aitao-admin-web',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
