# Ibuy B2C 购物商城后台管理系统

基于 Ant Design Pro 和 Nest.js 开发的电商后台管理系统，提供完整的商品管理、订单管理、用户管理等功能。

## 🌟 系统特点

- **现代技术栈**: 基于 Ant Design Pro 和 Nest.js 构建
- **完整功能**: 覆盖电商后台所需的各项核心功能
- **权限管理**: 基于 RBAC 的权限控制系统
- **可配置**: 灵活的菜单配置和角色权限设置
- **标准化**: 统一的接口规范和错误处理机制

## 🚀 核心功能

- **商品管理**

  - 商品分类管理
  - 商品上下架
  - 商品信息编辑
  - 库存管理
  - SKU 管理

- **订单管理**

  - 订单列表查询
  - 订单状态更新
  - 发货管理
  - 退款处理
  - 售后服务

- **用户管理**

  - 用户列表
  - 用户详情
  - 账号状态管理
  - 会员等级设置

- **系统设置**
  - 角色权限管理
  - 管理员账号管理
  - 系统参数配置
  - 操作日志查询

## 🛠️ 技术栈

- **前端技术**

  - React 18
  - Ant Design Pro
  - UmiJS
  - TypeScript
  - Axios

- **后端技术**
  - Nest.js
  - TypeORM
  - MySQL
  - Redis
  - JWT

## 📦 快速开始

### 环境要求

- Node.js >= 16
- Postgres >= 17
- Redis >= 7
- minio = latest
- rabbitmq >= 4.0 (只运行管理后台时可选)
- elasticsearch >= 8.14.2 (只运行管理后台时可选)
- kibana >= 8.14.2 (可选)

### 项目依赖

要想本地运行管理平台，除了上面的各个服务，还需要启动 [ibuy-admin-backend](https://github.com/SaebaRyoo/ibuy-portal-backend)的后端项目

### 安装步骤

1. 克隆项目

```bash
git clone https://github.com/SaebaRyoo/ibuy-admin.git
cd ibuy-admin
```

2. 安装依赖

```bash
npm install
# 或
yarn install
```

3. 配置环境变量

```bash
# 编辑 .env 文件，配置数据库等必要参数
PORT=3001
```

4. 启动开发服务器

```bash
npm start
# 或
yarn start
```

5. 访问系统打开浏览器访问 http://localhost:3001

## 📁 项目结构

```
/
├── config/                 # 项目配置文件
├── src/
│   ├── pages/             # 页面组件
│   ├── services/          # API 服务
│   ├── models/            # 数据模型
│   ├── components/        # 公共组件
│   └── utils/             # 工具函数
├── mock/                  # 模拟数据
└── tests/                 # 测试文件
```

## 🌐 部署指南

### 构建生产环境

```bash
npm run build
# 或
yarn build
```

### Nginx 配置

项目包含基础的 Nginx 配置文件，位于 `nginx/default.conf`。

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 🔗 相关项目

- [商城前台](https://github.com/SaebaRyoo/ibuy-portal)
- [商城后端](https://github.com/SaebaRyoo/ibuy-portal-backend)
- [后台管理系统后端](https://github.com/SaebaRyoo/ibuy-admin-backend)
