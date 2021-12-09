import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import TempSelector from '../components/TempSelector';
import PaginationArrows from '../components/PaginationArrows';
import WeatherBox from '../components/WeatherBox';
import { months, useWindowSize } from '../utils/basicFormatter';
// import data from '../mockData.json';
import ChartComponent from '../components/ChartComponent';
import { useFetchWeatherQuery } from '../features/weather-api-slice';

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
  const days = process.env.REACT_APP_DAYS_COUNT as string;
  const appID = process.env.REACT_APP_WEATHER_KEY as string;
  const cnt = +days * 8;
  const nigString = `lat=6.537216&lon=3.3718272&APPID=${appID}&cnt=${cnt}`;
  
  const [tempUnit, setTempUnit] = useState<string>('0');
  const [dataByDate, setDataByDate] = useState<IStoreData | null>(null);
  const [responseData, setResponseData] = useState<ISingleStore[]>([]);
  const [displayData, setDisplayData] = useState<ISingleStore[]>([]);
  const [barData, setBarData] = useState<ISingleStore[]>([]);
  const [pageSize, setPageSize] = useState<number>(3);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [queryString, setQueryString] = useState(nigString);
  const screenWidth = useWindowSize();

  // Access current position of user and store query string 
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((res) => {
      const { latitude, longitude } = res.coords;
      const formedString = `lat=${latitude}&lon=${longitude}&APPID=${appID}&cnt=${cnt}`;
      setQueryString(formedString);
    });
  }

  // Calling the Query to fetch weather data
  const { data, isFetching, isError, refetch } = useFetchWeatherQuery(queryString);

  // Access relevant info from weather info and store
  useEffect(() => {
    if (!isFetching && !isError) {
      const requiredFields: IStoreData = {};
      const availableDates: string[] = [];
      
      data.list.forEach(
        (item: { main: any; weather: any; wind: any; dt_txt: string }) => {
          const { main, weather, wind, dt_txt } = item;
          // Create date in th format, dd month year
          const full_date = new Date(dt_txt);
          const current_date = `${full_date.getDate()} ${
            months[full_date.getMonth()]
          }. ${full_date.getFullYear()}`;
          // Create a new info from item
          const presentItem: ISingleStore = {
            temp: main.temp - 273,
            humidity: main.humidity,
            wind_speed: wind.speed,
            cloud: weather[0].description,
            hour: full_date.getHours(),
            current_date,
          };
          // Check if this current date is already store in required object
          if (requiredFields.hasOwnProperty(current_date)) {
            requiredFields[current_date].push(presentItem);
          } else {
            availableDates.push(current_date);
            requiredFields[current_date] = [presentItem];
          }
        },
      );
      const dailyReports = availableDates.map((availableDate) => {
        const allReports = requiredFields[availableDate];
        const sum_temp = allReports.reduce((acc, cur) => acc + cur.temp, 0);
        const sum_humidity = allReports.reduce(
          (acc, cur) => acc + cur.humidity,
          0,
        );
        const sum_wind_speed = allReports.reduce(
          (acc, cur) => acc + cur.wind_speed,
          0,
        );
        return {
          temp: sum_temp / allReports.length,
          humidity: sum_humidity / allReports.length,
          wind_speed: sum_wind_speed / allReports.length,
          cloud: allReports[0].cloud,
          hour: allReports[0].hour,
          current_date: allReports[0].current_date,
        };
      });
      setResponseData(dailyReports);
      setDataByDate(requiredFields);
    }
  }, [data, isError, isFetching]);

  // Check screen size and use it to set page size
  useEffect(() => {
    if (screenWidth > 768) setPageSize(3)
    else setPageSize(1)
  }, [screenWidth]);

  // Watch out for changes in the day selected from box and set bar data
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

  const handleRefetch = () => {
    refetch();
  }
  // End of functions to handle clicks

  return (
    <MainWrapper>
      <p>Weather App from Payoneer</p>
      <TempSelector value={tempUnit} handleChange={handleUnitChange} />
      <PaginationArrows
        handleLeft={handleBackwardArrow}
        handleRight={handleForwardArrow}
        handleRefetch={handleRefetch}
        pageIndex={pageIndex}
        maxPage={Math.floor(responseData.length / pageSize)}
      />
      <DisplayDiv>
        {displayData.map((singleData) => (
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
        {barData.length > 0 && (
          <ChartComponent input={barData} tempUnit={tempUnit} />
        )}
      </ChartWrapper>
    </MainWrapper>
  );
}

export default WeatherScreen;

