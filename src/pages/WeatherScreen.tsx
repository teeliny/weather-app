import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import TempSelector from '../components/TempSelector';
import PaginationArrows from '../components/PaginationArrows';
import WeatherBox from '../components/WeatherBox';
import { months, useWindowSize } from '../utils/basicFormatter';
import data from '../mockData.json';
import ChartComponent from '../components/ChartComponent';

const DisplayDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: '8px';
  align-items: center;
  margin: 2rem auto;
`;

const ChartWrapper = styled.div`
  height: 300px;
  margin: 0 2rem;
`;

const MainWrapper = styled.div`
  margin: 0 1rem;
`;

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

function WeatherScreen() {
  const [tempUnit, setTempUnit] = useState<string>('0');
  const [dataByDate, setDataByDate] = useState<IStoreData | null>(null);
  const [responseData, setResponseData] = useState<ISingleStore[]>([]);
  const [displayData, setDisplayData] = useState<ISingleStore[]>([]);
  const [barData, setBarData] = useState<ISingleStore[]>([]);
  const [pageSize, setPageSize] = useState<number>(3);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [selectedDay, setSelectedDay] = useState<string>('');
  const screenWidth = useWindowSize();

  useEffect(() => {
    if (selectedDay.length > 0 && dataByDate) {
      setBarData(dataByDate[selectedDay]);
    }
  }, [selectedDay, dataByDate]);

  // Extract the data to display based on page index
  useEffect(() => {
    const sectionData = responseData.slice(pageSize * (pageIndex - 1), pageSize * pageIndex);
    setDisplayData(sectionData);
    if (sectionData[0]?.current_date) setSelectedDay(sectionData[0].current_date);
  }, [pageIndex, pageSize, responseData]);

  // Check screen size and use it to set page size
  useEffect(() => {
    if (screenWidth > 768) setPageSize(3)
    else setPageSize(1)
  }, [screenWidth])

  // Functions to handle clicks starts
  const handleForwardArrow = () => {
    if (pageIndex < Math.floor(responseData.length / pageSize)) {
      setPageIndex(pageIndex + 1);
    }
  }
  const handleBackwardArrow = () => {
    if (pageIndex > 1) {
      setPageIndex(pageIndex - 1);
    }
  }
  const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTempUnit(e.target.value);
  }
  const handleSelectDay = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setSelectedDay(e.currentTarget.id);
  }
  // End of functions to handle clicks

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
          temp: main.temp - 273,
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
      setDataByDate(requiredFields);
    }
  }, []);

  // console.log(barData);
  return (
    <MainWrapper>
      <p>Weather App from Payoneer</p>
      <TempSelector value={tempUnit} handleChange={handleUnitChange} />
      <PaginationArrows
        handleLeft={handleBackwardArrow}
        handleRight={handleForwardArrow}
        pageIndex={pageIndex}
        maxPage={Math.floor(responseData.length / pageSize)}
      />
      <DisplayDiv>
        {displayData.map(singleData => (
          <WeatherBox
            key={singleData.current_date}
            id={singleData.current_date}
            temp={singleData.temp}
            humidity={singleData.humidity}
            current_date={singleData.current_date}
            tempUnit={tempUnit}
            handleSelectDay={handleSelectDay}
          />
        ))}
      </DisplayDiv>
      <ChartWrapper>
        {barData.length > 0 && <ChartComponent input={barData} tempUnit={tempUnit} />}
      </ChartWrapper>
    </MainWrapper>
  );
}

export default WeatherScreen;

