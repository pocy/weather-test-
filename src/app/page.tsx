import WeatherCard from './components/WeatherCard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 标题部分 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🌤️ 随机天气
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            探索世界各地的实时天气信息
          </p>
          <p className="text-sm text-gray-500">
            基于 Open-Meteo API 提供准确的天气数据
          </p>
        </div>

        {/* 天气卡片 */}
        <WeatherCard />

        {/* 导航链接 */}
        <div className="mt-8 text-center">
          <a
            href="/openweather"
            className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-colors"
          >
            ☀️ 试试 OpenWeatherMap API
          </a>
        </div>

        {/* 说明文字 */}
        <div className="mt-12 text-center">
          <div className="bg-white bg-opacity-50 rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              ✨ 功能特色
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start">
                <span className="text-2xl mr-3">🎲</span>
                <div>
                  <h3 className="font-semibold text-gray-800">随机城市</h3>
                  <p className="text-sm text-gray-600">
                    点击按钮随机选择世界各地的城市
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">🌡️</span>
                <div>
                  <h3 className="font-semibold text-gray-800">实时数据</h3>
                  <p className="text-sm text-gray-600">
                    获取当前温度、湿度、风速等信息
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">🌅</span>
                <div>
                  <h3 className="font-semibold text-gray-800">日出日落</h3>
                  <p className="text-sm text-gray-600">
                    显示当地的日出日落时间
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">📱</span>
                <div>
                  <h3 className="font-semibold text-gray-800">响应式设计</h3>
                  <p className="text-sm text-gray-600">
                    适配各种设备屏幕尺寸
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部信息 */}
        <footer className="mt-16 text-center text-gray-500">
          <p className="text-sm">
            数据来源：
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 underline ml-1"
            >
              Open-Meteo
            </a>
          </p>
          <p className="text-xs mt-2">
            免费开放的天气API，无需注册
          </p>
        </footer>
      </div>
    </div>
  );
}
