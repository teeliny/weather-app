import React, { useState, useEffect } from 'react';
import TempSelector from './components/TempSelector';
import PaginationArrows from './components/PaginationArrows';
import WeatherBox from './components/WeatherBox';
import { months, convertTemp } from './utils/basicFormatter';
import data from './mockData.json';

interface ISingleStore {
  temp: number;
  humidity: number;
  wind_speed: number;
  cloud: string;
  current_date: string;
  hour: number;
}

interface IStoreData {
  [key: string]: ISingleStore[];
}

function App() {
  const [tempUnit, setTempUnit] = useState<string>('0');
  const [responseData, setResponseData] = useState<ISingleStore[]>([]);

  useEffect(() => {
    if (data.list.length > 0) {
      const requiredFields: IStoreData = {};
      const availableDates: string[] = [];
      data.list.forEach((item) => {
        const { main, weather, wind, dt_txt } = item;
        // Create date in th format, dd month year
        const full_date = new Date(dt_txt);
        const current_date = `${full_date.getDate()} ${months[full_date.getMonth()]}. ${full_date.getFullYear()}`;
        // Create a new info from item
        const presentItem: ISingleStore = {
          temp: main.temp,
          humidity: main.humidity,
          wind_speed: wind.speed,
          cloud: weather[0].description,
          hour: full_date.getHours(),
          current_date,
        }
        // Check if this current date is already store in required object
        if (requiredFields.hasOwnProperty(current_date)) {
          requiredFields[current_date].push(presentItem);
        }
        else {
          availableDates.push(current_date);
          requiredFields[current_date] = [presentItem];
        }
      })
      const dailyReports = availableDates.map(availableDate => {
        const allReports = requiredFields[availableDate];
        const sum_temp = allReports.reduce((acc, cur) => acc + cur.temp, 0);
        const sum_humidity = allReports.reduce((acc, cur) => acc + cur.humidity, 0);
        const sum_wind_speed = allReports.reduce((acc, cur) => acc + cur.wind_speed, 0);
        return {
          temp: sum_temp / allReports.length,
          humidity: sum_humidity / allReports.length,
          wind_speed: sum_wind_speed / allReports.length,
          cloud: allReports[0].cloud,
          hour: allReports[0].hour,
          current_date: allReports[0].current_date,
        }
      });
      setResponseData(dailyReports);
    }
  }, []);

  const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTempUnit(e.target.value);
  }
  console.log(responseData);
  return (
    <div className="App">
      <p>Weather App from Payoneer</p>
      <TempSelector value={tempUnit} handleChange={handleUnitChange} />
      <PaginationArrows />
      <WeatherBox />
    </div>
  );
}

export default App;
