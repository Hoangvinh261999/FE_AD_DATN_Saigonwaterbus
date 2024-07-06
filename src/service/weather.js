import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rain, setRain] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=10.8167&longitude=106.6833&current=temperature_2m,rain'
        );
        setTemperature(response.data.current.temperature_2m);
        setRain(response.data.current.rain)
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='flex'>
      <text className='text-sm content-center'>Tp.HCM <text className='font-bold text-sky-500'>{temperature} °C</text></text>
      <span className="flex text-sm mx-2 ">
        {rain === 0 ? (
          <img className='flex'
            src="/clouds.png" 
            alt="Sunny Icon" 
          />
        ) : (
          'Có mưa'
        )}
      </span> 
    </div>
  );
};

export default Weather;
