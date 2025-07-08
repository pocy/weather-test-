# 🌤️ 天气应用

这是一个基于 Next.js 开发的天气应用，支持两种天气API：

- **Open-Meteo API** - 免费开源天气API，无需注册
- **OpenWeatherMap API** - 专业天气数据服务，需要API Key

## 📋 功能特性

### 🎲 随机天气 (Open-Meteo)
- 随机选择世界各地城市
- 实时天气数据
- 日出日落时间
- 完全免费，无需API Key

### ☀️ OpenWeatherMap 天气
- 更详细的天气信息
- 5天天气预报
- 气压、云量、能见度等数据
- 高质量的天气图标

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置 OpenWeatherMap API Key (可选)

如果你想使用 OpenWeatherMap 功能，需要配置API Key：

1. 前往 [OpenWeatherMap](https://openweathermap.org/api) 注册并获取免费API Key
2. 在项目根目录创建 `.env.local` 文件
3. 添加以下内容：

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```

**注意：** 将 `your_api_key_here` 替换为你的实际API Key

### 3. 启动开发服务器

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📱 页面说明

### 主页 (/)
- 使用 Open-Meteo API
- 随机展示世界各地天气
- 无需配置，开箱即用

### OpenWeatherMap 页面 (/openweather)
- 使用 OpenWeatherMap API
- 更详细的天气信息
- 5天天气预报
- 需要配置API Key

## 🌍 支持的城市

应用预设了以下城市：
- 🇨🇳 中国：北京、上海、广州、深圳、成都、杭州
- 🇯🇵 日本：东京
- 🇰🇷 韩国：首尔
- 🇺🇸 美国：纽约
- 🇬🇧 英国：伦敦
- 🇫🇷 法国：巴黎
- 🇦🇺 澳大利亚：悉尼
- 🇷🇺 俄罗斯：莫斯科
- 🇸🇬 新加坡：新加坡
- 🇦🇪 阿联酋：迪拜

## 🛠️ 技术栈

- **Next.js 14** - React 框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Open-Meteo API** - 免费天气API
- **OpenWeatherMap API** - 专业天气API

## 📦 部署

推荐使用 [Vercel](https://vercel.com) 部署：

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 如果使用 OpenWeatherMap，在环境变量中设置 `NEXT_PUBLIC_OPENWEATHER_API_KEY`

## 🔧 开发

### 项目结构

```
src/
├── app/
│   ├── components/
│   │   └── WeatherCard.tsx          # Open-Meteo 天气组件
│   ├── openweather/
│   │   ├── components/
│   │   │   └── OpenWeatherCard.tsx  # OpenWeatherMap 天气组件
│   │   └── page.tsx                 # OpenWeatherMap 页面
│   ├── page.tsx                     # 主页
│   └── layout.tsx                   # 布局
└── ...
```

### 环境变量

```env
# OpenWeatherMap API Key (可选)
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issues 和 Pull Requests！

## 📞 联系

如有问题，请通过 GitHub Issues 联系。
