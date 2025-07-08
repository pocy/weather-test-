'use client';

import { useState, useEffect } from 'react';

interface WeatherData {
  current: {
    temperature_2m: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    weather_code: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
  };
  daily: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
    sunrise: string[];
    sunset: string[];
  };
  timezone: string;
}

interface City {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  emoji: string;
}

// 预设一些城市
const cities: City[] = [
  { name: '北京', latitude: 39.9042, longitude: 116.4074, country: '中国', emoji: '🏮' },
  { name: '上海', latitude: 31.2304, longitude: 121.4737, country: '中国', emoji: '🏢' },
  { name: '广州', latitude: 23.1291, longitude: 113.2644, country: '中国', emoji: '🌴' },
  { name: '深圳', latitude: 22.5431, longitude: 114.0579, country: '中国', emoji: '🏙️' },
  { name: '成都', latitude: 30.5728, longitude: 104.0668, country: '中国', emoji: '🐼' },
  { name: '杭州', latitude: 30.2741, longitude: 120.1551, country: '中国', emoji: '🌸' },
  { name: '东京', latitude: 35.6762, longitude: 139.6503, country: '日本', emoji: '🗼' },
  { name: '首尔', latitude: 37.5665, longitude: 126.9780, country: '韩国', emoji: '🏯' },
  { name: '纽约', latitude: 40.7128, longitude: -74.0060, country: '美国', emoji: '🗽' },
  { name: '伦敦', latitude: 51.5074, longitude: -0.1278, country: '英国', emoji: '🏰' },
  { name: '巴黎', latitude: 48.8566, longitude: 2.3522, country: '法国', emoji: '🗼' },
  { name: '悉尼', latitude: -33.8688, longitude: 151.2093, country: '澳大利亚', emoji: '🏖️' },
  { name: '莫斯科', latitude: 55.7558, longitude: 37.6176, country: '俄罗斯', emoji: '🏛️' },
  { name: '新加坡', latitude: 1.3521, longitude: 103.8198, country: '新加坡', emoji: '🌺' },
  { name: '迪拜', latitude: 25.2048, longitude: 55.2708, country: '阿联酋', emoji: '🏜️' },
];

// 天气代码映射
const weatherCodeMap: { [key: number]: { description: string; icon: string } } = {
  0: { description: '晴朗', icon: '☀️' },
  1: { description: '主要晴朗', icon: '🌤️' },
  2: { description: '部分多云', icon: '⛅' },
  3: { description: '阴天', icon: '☁️' },
  45: { description: '雾', icon: '🌫️' },
  48: { description: '雾凇', icon: '🌫️' },
  51: { description: '轻微毛毛雨', icon: '🌦️' },
  53: { description: '中等毛毛雨', icon: '🌦️' },
  55: { description: '密集毛毛雨', icon: '🌦️' },
  56: { description: '轻微冻雨', icon: '🌧️' },
  57: { description: '密集冻雨', icon: '🌧️' },
  61: { description: '轻雨', icon: '🌧️' },
  63: { description: '中雨', icon: '🌧️' },
  65: { description: '大雨', icon: '🌧️' },
  66: { description: '轻微冻雨', icon: '🌧️' },
  67: { description: '大冻雨', icon: '🌧️' },
  71: { description: '轻雪', icon: '🌨️' },
  73: { description: '中雪', icon: '🌨️' },
  75: { description: '大雪', icon: '❄️' },
  77: { description: '雪粒', icon: '🌨️' },
  80: { description: '轻阵雨', icon: '🌦️' },
  81: { description: '中阵雨', icon: '🌦️' },
  82: { description: '大阵雨', icon: '⛈️' },
  85: { description: '轻雪阵雨', icon: '🌨️' },
  86: { description: '大雪阵雨', icon: '❄️' },
  95: { description: '雷暴', icon: '⛈️' },
  96: { description: '雷暴伴轻冰雹', icon: '⛈️' },
  99: { description: '雷暴伴大冰雹', icon: '⛈️' },
};

export default function WeatherCard() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [currentCity, setCurrentCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async (city: City) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,wind_speed_10m,wind_direction_10m,weather_code,relative_humidity_2m,apparent_temperature,is_day&daily=temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset&timezone=auto`
      );

      if (!response.ok) {
        throw new Error('获取天气数据失败');
      }

      const data = await response.json();
      setWeatherData(data);
      setCurrentCity(city);
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
    } finally {
      setLoading(false);
    }
  };

  const getRandomCity = () => {
    const randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex];
  };

  const refreshWeather = () => {
    const randomCity = getRandomCity();
    fetchWeatherData(randomCity);
  };

  useEffect(() => {
    refreshWeather();
  }, []);

  if (loading) {
    return (
      <div className="max-w-md mx-auto bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl p-8 shadow-xl">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">正在获取天气数据...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto bg-gradient-to-br from-red-400 to-pink-600 rounded-2xl p-8 shadow-xl">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">❌</div>
          <p className="text-lg mb-4">获取天气数据失败</p>
          <p className="text-sm opacity-80 mb-4">{error}</p>
          <button
            onClick={refreshWeather}
            className="bg-white text-red-500 px-6 py-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  if (!weatherData || !currentCity) {
    return null;
  }

  const weatherInfo = weatherCodeMap[weatherData.current.weather_code] || {
    description: '未知天气',
    icon: '❓',
  };

  const isDay = weatherData.current.is_day === 1;
  const gradientClass = isDay
    ? 'from-blue-400 to-blue-600'
    : 'from-purple-600 to-indigo-800';

  return (
    <div className={`max-w-md mx-auto bg-gradient-to-br ${gradientClass} rounded-2xl p-8 shadow-xl text-white`}>
      <div className="text-center">
        {/* 城市信息 */}
        <div className="flex items-center justify-center mb-6">
          <span className="text-4xl mr-2">{currentCity.emoji}</span>
          <div>
            <h2 className="text-2xl font-bold">{currentCity.name}</h2>
            <p className="text-sm opacity-80">{currentCity.country}</p>
          </div>
        </div>

        {/* 主要天气信息 */}
        <div className="mb-8">
          <div className="text-8xl mb-4">{weatherInfo.icon}</div>
          <div className="text-6xl font-bold mb-2">
            {Math.round(weatherData.current.temperature_2m)}°C
          </div>
          <div className="text-xl mb-2">{weatherInfo.description}</div>
          <div className="text-sm opacity-80">
            体感温度 {Math.round(weatherData.current.apparent_temperature)}°C
          </div>
        </div>

        {/* 详细信息 */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="text-sm opacity-80">湿度</div>
            <div className="text-2xl font-bold">
              {weatherData.current.relative_humidity_2m}%
            </div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="text-sm opacity-80">风速</div>
            <div className="text-2xl font-bold">
              {Math.round(weatherData.current.wind_speed_10m)} km/h
            </div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="text-sm opacity-80">最高温</div>
            <div className="text-2xl font-bold">
              {Math.round(weatherData.daily.temperature_2m_max[0])}°C
            </div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="text-sm opacity-80">最低温</div>
            <div className="text-2xl font-bold">
              {Math.round(weatherData.daily.temperature_2m_min[0])}°C
            </div>
          </div>
        </div>

        {/* 刷新按钮 */}
        <button
          onClick={refreshWeather}
          className="bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-gray-100 transition-colors font-semibold shadow-lg"
        >
          🎲 随机换个城市
        </button>

        {/* 时间信息 */}
        <div className="mt-6 text-sm opacity-80">
          <div>
            🌅 日出: {new Date(weatherData.daily.sunrise[0]).toLocaleTimeString('zh-CN', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
          <div>
            🌅 日落: {new Date(weatherData.daily.sunset[0]).toLocaleTimeString('zh-CN', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 