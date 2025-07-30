# 开发指南

## 文件保存时校验配置

本项目配置了多种代码校验工具，确保代码质量和一致性。

### 1. VS Code 配置

#### 安装必要的扩展
- `biomejs.biome` - Biome 代码格式化和 linting
- `dbaeumer.vscode-eslint` - ESLint 支持
- `esbenp.prettier-vscode` - Prettier 格式化
- `bradlc.vscode-tailwindcss` - Tailwind CSS 支持

#### 自动配置
项目已包含 `.vscode/settings.json` 配置，会自动：
- 保存时自动格式化代码
- 保存时自动修复 linting 错误
- 保存时自动整理导入语句

### 2. 可用的脚本命令

```bash
# 检查代码问题
pnpm lint

# 自动修复代码问题
pnpm lint:fix

# 格式化代码
pnpm format

# 开发模式
pnpm amazing-web:dev
```

### 3. Pre-commit Hooks

项目配置了 husky 和 lint-staged，在 git commit 前会自动：
- 运行 Biome 检查
- 自动格式化代码
- 如果发现问题会阻止提交

### 4. 工具说明

#### Biome
- 用于代码格式化和 linting
- 配置在 `biome.json` 中
- 支持 TypeScript、JavaScript、JSX、TSX

#### ESLint
- 用于代码质量检查
- 配置在 `apps/amazing-chat-web/eslint.config.js` 中
- 主要针对 React 和 TypeScript 规则

### 5. 配置生效

1. 安装依赖：`pnpm install`
2. 安装推荐的 VS Code 扩展
3. 重启 VS Code
4. 现在保存文件时会自动进行校验和格式化

### 6. 手动运行校验

```bash
# 检查所有文件
pnpm lint

# 修复所有文件
pnpm lint:fix

# 格式化所有文件
pnpm format
``` 