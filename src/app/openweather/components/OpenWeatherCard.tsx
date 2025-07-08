'use client';

import { useState, useEffect } from 'react';

// OpenWeatherMap API 响应类型
interface OpenWeatherData {
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  visibility: number;
  dt: number;
  coord: {
    lat: number;
    lon: number;
  };
}

// 5天预报数据类型
interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
      deg: number;
    };
    dt_txt: string;
  }>;
  city: {
    name: string;
    country: string;
  };
}

interface City {
  name: string;
  country: string;
  emoji: string;
}

// 预设城市列表
const cities: City[] = [
  { name: 'Beijing', country: 'CN', emoji: '🏮' },
  { name: 'Shanghai', country: 'CN', emoji: '🏢' },
  { name: 'Guangzhou', country: 'CN', emoji: '🌴' },
  { name: 'Shenzhen', country: 'CN', emoji: '🏙️' },
  { name: 'Chengdu', country: 'CN', emoji: '🐼' },
  { name: 'Hangzhou', country: 'CN', emoji: '🌸' },
  { name: 'Tokyo', country: 'JP', emoji: '🗼' },
  { name: 'Seoul', country: 'KR', emoji: '🏯' },
  { name: 'New York', country: 'US', emoji: '🗽' },
  { name: 'London', country: 'GB', emoji: '🏰' },
  { name: 'Paris', country: 'FR', emoji: '🗼' },
  { name: 'Sydney', country: 'AU', emoji: '🏖️' },
  { name: 'Moscow', country: 'RU', emoji: '🏛️' },
  { name: 'Singapore', country: 'SG', emoji: '🌺' },
  { name: 'Dubai', country: 'AE', emoji: '🏜️' },
];

export default function OpenWeatherCard() {
  const [currentWeather, setCurrentWeather] = useState<OpenWeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [cityInput, setCityInput] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);

  // 从环境变量获取API Key
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    if (key && key !== 'your_api_key_here') {
      setApiKey(key);
    } else {
      setError('请设置 OpenWeatherMap API Key');
      setLoading(false);
    }
  }, []);

  const getWeatherIcon = (iconCode: string) => {
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    return iconUrl;
  };

  const getRandomCity = () => {
    const randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex];
  };

  const fetchWeatherData = async (city: City) => {
    if (!apiKey) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // 获取当前天气
      const currentResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.country}&appid=${apiKey}&units=metric&lang=zh_cn`
      );

      if (!currentResponse.ok) {
        throw new Error('获取天气数据失败');
      }

      const currentData = await currentResponse.json();

      // 获取5天预报
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city.name},${city.country}&appid=${apiKey}&units=metric&lang=zh_cn`
      );

      if (!forecastResponse.ok) {
        throw new Error('获取预报数据失败');
      }

      const forecastData = await forecastResponse.json();

      setCurrentWeather(currentData);
      setForecast(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
    } finally {
      setLoading(false);
    }
  };

  // 搜索用户输入的城市
  const searchCity = async (cityName: string) => {
    if (!apiKey || !cityName.trim()) return;
    
    setIsSearching(true);
    setError(null);
    
    try {
      // 获取当前天气
      const currentResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName.trim()}&appid=${apiKey}&units=metric&lang=zh_cn`
      );

      if (!currentResponse.ok) {
        if (currentResponse.status === 404) {
          throw new Error('找不到该城市，请检查城市名称是否正确');
        }
        throw new Error('获取天气数据失败');
      }

      const currentData = await currentResponse.json();

      // 获取5天预报
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName.trim()}&appid=${apiKey}&units=metric&lang=zh_cn`
      );

      if (!forecastResponse.ok) {
        throw new Error('获取预报数据失败');
      }

      const forecastData = await forecastResponse.json();

      setCurrentWeather(currentData);
      setForecast(forecastData);
      // 搜索成功后清空输入框
      setCityInput('');
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
    } finally {
      setIsSearching(false);
    }
  };

  const refreshWeather = () => {
    const randomCity = getRandomCity();
    fetchWeatherData(randomCity);
  };

  const handleCitySearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityInput.trim()) {
      searchCity(cityInput);
    }
  };

  useEffect(() => {
    if (apiKey) {
      refreshWeather();
    }
  }, [apiKey]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 搜索栏在加载时也显示 */}
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">🔍 搜索城市天气</h3>
            <p className="text-sm text-gray-600">
              输入城市名称获取天气信息，支持中英文（如：北京、Tokyo、New York）
            </p>
          </div>
          <form onSubmit={handleCitySearch} className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="输入城市名称（如：北京、Tokyo、New York）"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                disabled={isSearching}
              />
            </div>
            <button
              type="submit"
              disabled={isSearching || !cityInput.trim()}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              {isSearching ? '搜索中...' : '🔍 搜索'}
            </button>
          </form>
          
          {/* 快捷搜索按钮 */}
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">🔥 热门城市：</p>
            <div className="flex flex-wrap gap-2">
              {['北京', 'Shanghai', 'Tokyo', 'New York', 'London', 'Paris', 'Sydney', 'Dubai'].map((city) => (
                <button
                  key={city}
                  onClick={() => searchCity(city)}
                  disabled={isSearching}
                  className="bg-gray-100 hover:bg-orange-100 text-gray-700 px-3 py-1 rounded-full text-sm transition-colors disabled:opacity-50"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* 加载指示器 */}
        <div className="bg-gradient-to-br from-orange-400 to-red-600 rounded-2xl p-8 shadow-xl">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-lg">
              {isSearching ? '正在搜索城市天气...' : '正在获取天气数据...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 搜索栏在错误时也显示 */}
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">🔍 搜索城市天气</h3>
            <p className="text-sm text-gray-600">
              输入城市名称获取天气信息，支持中英文（如：北京、Tokyo、New York）
            </p>
          </div>
          <form onSubmit={handleCitySearch} className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="输入城市名称（如：北京、Tokyo、New York）"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                disabled={isSearching}
              />
            </div>
            <button
              type="submit"
              disabled={isSearching || !cityInput.trim()}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              {isSearching ? '搜索中...' : '🔍 搜索'}
            </button>
          </form>
          
          {/* 快捷搜索按钮 */}
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">🔥 热门城市：</p>
            <div className="flex flex-wrap gap-2">
              {['北京', 'Shanghai', 'Tokyo', 'New York', 'London', 'Paris', 'Sydney', 'Dubai'].map((city) => (
                <button
                  key={city}
                  onClick={() => searchCity(city)}
                  disabled={isSearching}
                  className="bg-gray-100 hover:bg-orange-100 text-gray-700 px-3 py-1 rounded-full text-sm transition-colors disabled:opacity-50"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* 错误信息 */}
        <div className="bg-gradient-to-br from-red-400 to-pink-600 rounded-2xl p-8 shadow-xl">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">❌</div>
            <p className="text-lg mb-4">获取天气数据失败</p>
            <p className="text-sm opacity-80 mb-4">{error}</p>
            {error.includes('API Key') && (
              <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
                <p className="text-sm">
                  请创建 <code className="bg-black bg-opacity-20 px-2 py-1 rounded">.env.local</code> 文件，
                  并添加：
                </p>
                <code className="block bg-black bg-opacity-20 px-4 py-2 rounded mt-2 text-sm">
                  NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
                </code>
              </div>
            )}
            <div className="space-x-4">
              <button
                onClick={refreshWeather}
                className="bg-white text-red-500 px-6 py-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                随机重试
              </button>
              {cityInput && (
                <button
                  onClick={() => searchCity(cityInput)}
                  className="bg-white bg-opacity-20 text-white px-6 py-2 rounded-full hover:bg-opacity-30 transition-colors"
                >
                  重新搜索
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentWeather || !forecast) {
    return null;
  }

  const currentWeatherInfo = currentWeather.weather[0];
  const cityInfo = cities.find(c => c.name.toLowerCase() === currentWeather.name.toLowerCase()) || cities[0];

  // 获取每日预报（每天取中午12点的数据）
  const dailyForecast = forecast.list.filter(item => 
    item.dt_txt.includes('12:00:00')
  ).slice(0, 5);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 城市搜索栏 */}
      <div className="bg-white rounded-2xl p-6 shadow-xl">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">🔍 搜索城市天气</h3>
          <p className="text-sm text-gray-600">
            输入城市名称获取天气信息，支持中英文（如：北京、Tokyo、New York）
          </p>
        </div>
        <form onSubmit={handleCitySearch} className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              placeholder="输入城市名称（如：北京、Tokyo、New York）"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              disabled={isSearching}
            />
          </div>
          <button
            type="submit"
            disabled={isSearching || !cityInput.trim()}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            {isSearching ? '搜索中...' : '🔍 搜索'}
          </button>
        </form>
        
        {/* 快捷搜索按钮 */}
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">🔥 热门城市：</p>
          <div className="flex flex-wrap gap-2">
            {['北京', 'Shanghai', 'Tokyo', 'New York', 'London', 'Paris', 'Sydney', 'Dubai'].map((city) => (
              <button
                key={city}
                onClick={() => searchCity(city)}
                disabled={isSearching}
                className="bg-gray-100 hover:bg-orange-100 text-gray-700 px-3 py-1 rounded-full text-sm transition-colors disabled:opacity-50"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 当前天气卡片 */}
      <div className="bg-gradient-to-br from-orange-400 to-red-600 rounded-2xl p-8 shadow-xl text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 左侧：主要天气信息 */}
          <div className="text-center md:text-left">
                         <div className="flex items-center justify-center md:justify-start mb-6">
               <span className="text-4xl mr-3">{cityInfo.emoji}</span>
               <div>
                 <h2 className="text-3xl font-bold">{currentWeather.name}</h2>
                 <p className="text-lg opacity-80">{currentWeather.sys.country}</p>
                 <div className="flex items-center text-sm opacity-70 mt-1">
                   <span className="mr-2">📍</span>
                   <span>坐标: {currentWeather.coord.lat.toFixed(2)}, {currentWeather.coord.lon.toFixed(2)}</span>
                 </div>
               </div>
             </div>

            <div className="flex items-center justify-center md:justify-start mb-6">
              <img 
                src={getWeatherIcon(currentWeatherInfo.icon)} 
                alt={currentWeatherInfo.description}
                className="w-20 h-20 mr-4"
              />
              <div>
                <div className="text-5xl font-bold">
                  {Math.round(currentWeather.main.temp)}°C
                </div>
                <div className="text-xl capitalize">
                  {currentWeatherInfo.description}
                </div>
              </div>
            </div>

            <div className="text-lg opacity-90">
              体感温度 {Math.round(currentWeather.main.feels_like)}°C
            </div>
          </div>

          {/* 右侧：详细信息 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-sm opacity-80">最高温</div>
              <div className="text-2xl font-bold">
                {Math.round(currentWeather.main.temp_max)}°C
              </div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-sm opacity-80">最低温</div>
              <div className="text-2xl font-bold">
                {Math.round(currentWeather.main.temp_min)}°C
              </div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-sm opacity-80">湿度</div>
              <div className="text-2xl font-bold">
                {currentWeather.main.humidity}%
              </div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-sm opacity-80">气压</div>
              <div className="text-2xl font-bold">
                {currentWeather.main.pressure} hPa
              </div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-sm opacity-80">风速</div>
              <div className="text-2xl font-bold">
                {Math.round(currentWeather.wind.speed * 3.6)} km/h
              </div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-sm opacity-80">云量</div>
              <div className="text-2xl font-bold">
                {currentWeather.clouds.all}%
              </div>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="text-center mt-8">
          <button
            onClick={refreshWeather}
            className="bg-white text-orange-600 px-6 py-3 rounded-full hover:bg-gray-100 transition-colors font-semibold shadow-lg mr-4"
          >
            🎲 随机城市
          </button>
          <button
            onClick={() => setCityInput('')}
            className="bg-white bg-opacity-20 text-white px-6 py-3 rounded-full hover:bg-opacity-30 transition-colors font-semibold"
          >
            🔄 清空搜索
          </button>
        </div>
      </div>

      {/* 5天预报卡片 */}
      <div className="bg-white rounded-2xl p-8 shadow-xl">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          📅 5天天气预报
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {dailyForecast.map((day, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-2">
                {new Date(day.dt * 1000).toLocaleDateString('zh-CN', {
                  month: 'short',
                  day: 'numeric',
                  weekday: 'short'
                })}
              </div>
              <img 
                src={getWeatherIcon(day.weather[0].icon)} 
                alt={day.weather[0].description}
                className="w-12 h-12 mx-auto mb-2"
              />
              <div className="text-lg font-bold text-gray-800">
                {Math.round(day.main.temp)}°C
              </div>
              <div className="text-sm text-gray-600 capitalize">
                {day.weather[0].description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 