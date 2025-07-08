import OpenWeatherCard from './components/OpenWeatherCard';
import Link from 'next/link';

export default function OpenWeatherPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 标题部分 */}
        <div className="text-center mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4"
          >
            ← 返回首页
          </Link>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            ☀️ OpenWeatherMap 天气
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            使用 OpenWeatherMap API 获取详细天气信息
          </p>
          <p className="text-sm text-gray-500">
            更丰富的天气数据和预报功能
          </p>
        </div>

        {/* 天气卡片 */}
        <OpenWeatherCard />

        {/* 说明文字 */}
        <div className="mt-12 text-center">
          <div className="bg-white bg-opacity-50 rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              🌟 OpenWeatherMap 特色
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start">
                <span className="text-2xl mr-3">🌍</span>
                <div>
                  <h3 className="font-semibold text-gray-800">全球覆盖</h3>
                  <p className="text-sm text-gray-600">
                    支持全球20万+城市的天气数据
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">📊</span>
                <div>
                  <h3 className="font-semibold text-gray-800">详细数据</h3>
                  <p className="text-sm text-gray-600">
                    气压、云量、能见度等详细信息
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">🔄</span>
                <div>
                  <h3 className="font-semibold text-gray-800">5天预报</h3>
                  <p className="text-sm text-gray-600">
                    未来5天的天气预报信息
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">🎯</span>
                <div>
                  <h3 className="font-semibold text-gray-800">精准定位</h3>
                  <p className="text-sm text-gray-600">
                    支持城市名称和坐标查询
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
              href="https://openweathermap.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-700 underline ml-1"
            >
              OpenWeatherMap
            </a>
          </p>
          <p className="text-xs mt-2">
            专业的天气数据服务提供商
          </p>
        </footer>
      </div>
    </div>
  );
} 