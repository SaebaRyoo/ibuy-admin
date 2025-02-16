// https://umijs.org/config/
import { defineConfig } from '@umijs/max';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  request: {},
  initialState: {},
  model: {},
  dva: {}, // 启用dva
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  access: {},
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
    // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
    // https://ant.design/docs/react/customize-theme-variable-cn
    'root-entry-name': 'variable',
    primaryColor: 'e2285f',
  },
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV as string],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: true,
  presets: ['umi-presets-pro'],
  jsMinifier: 'terser',
  // jsMinifierOptions: {
  //   parallel: 2, // 限制 terser 的并行进程数
  //   terserOptions: {
  //     compress: {
  //       drop_console: REACT_APP_ENV !== 'dev', // 生产环境删除 console
  //     },
  //   },
  // },
  // 使用 source-map 的轻量级变体：
  devtool: REACT_APP_ENV === 'dev' ? 'eval-cheap-module-source-map' : false,

  chainWebpack(config, { webpack }) {
    // 开发环境不做优化
    if (REACT_APP_ENV === 'dev') return;

    // 排除不需要处理的依赖
    config.module
      .rule('exclude')
      .exclude.add(/\.pdf$/)
      .add(/\.mp4$/)
      .end();
    // 配置缓存
    config.cache({
      type: 'filesystem', // 使用文件系统缓存而不是内存缓存
      buildDependencies: {
        config: [__filename],
      },
      compression: 'gzip', // 压缩缓存
    });

    // 限制并行处理数量
    config.parallelism(1);

    // 优化分包配置
    config.merge({
      optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 50000, // 增加最小体积限制
          maxSize: 244000, // 添加最大体积限制
          minChunks: 2, // 降低引用次数要求
          maxInitialRequests: 6, // 限制入口的最大并行请求数
          maxAsyncRequests: 6, // 限制异步模块内部的并行最大请求数
          automaticNameDelimiter: '.',
          cacheGroups: {
            vendor: {
              // 第三方依赖
              test: /[\\/]node_modules[\\/]/,
              name(module: any) {
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                return `npm.${packageName.replace('@', '')}`;
              },
              priority: 10,
            },
            antd: {
              // antd 单独分包
              name: 'antd',
              test: /[\\/]node_modules[\\/](@ant-design|antd)[\\/]/,
              priority: 20,
            },
            commons: {
              // 其他公共模块
              name: 'commons',
              minChunks: 2,
              priority: 0,
              reuseExistingChunk: true,
            },
          },
        },
        runtimeChunk: {
          // 运行时代码单独分包
          name: 'runtime',
        },
      },
    });
  },
});
