import React, { useState, useEffect } from 'react';
import ErrorComponent from '../../components/ErrorComponent';
import TempSelector from '../../components/tempComponent/TempSelector';
import PaginationArrows from '../../components/paginationComponent/PaginationArrows';
import WeatherBox from '../../components/weatherComponent/WeatherBox';
import { months } from '../../utils/formatter/basicFormatter';
import ChartComponent from '../../components/chartComponent/ChartComponent';
import { useFetchWeatherQuery } from '../../features/weather/weather-api-slice';
import LoadingComponent from '../loadingPage/LoadingScreen';
import { useAppSelector } from '../../app/hooks';
import { IChartComp, IRequiredFields } from './weatherPage.typing';
import {
  CardsWrapper,
  ChartWrapper,
  MainWrapper,
} from './weatherPage.style';

function WeatherScreen() {
  const days = process.env.REACT_APP_DAYS_COUNT as string;
  const appID = process.env.REACT_APP_WEATHER_KEY as string;
  const cnt = +days * 8;
  const nigString = `lat=6.537216&lon=3.3718272&APPID=${appID}&cnt=${cnt}`;

  const myView = useAppSelector((state) => state.screen.mobile_view);
  
  const [queryString, setQueryString] = useState(nigString);
  const [errorMessage, setErrorMessage] = useState('');
  const [tempUnit, setTempUnit] = useState<string>('0');
  const [dataByDate, setDataByDate] = useState<IRequiredFields | null>(null);
  const [responseData, setResponseData] = useState<IChartComp[]>([]);
  const [displayData, setDisplayData] = useState<IChartComp[]>([]);
  const [barData, setBarData] = useState<IChartComp[]>([]);
  const [pageSize, setPageSize] = useState<number>(3);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [selectedDay, setSelectedDay] = useState<string>('');
  // const screenWidth = useWindowSize();

  // Access current position of user and store query string 
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((res) => {
      const { latitude, longitude } = res.coords;
      const formedString = `lat=${latitude}&lon=${longitude}&APPID=${appID}&cnt=${cnt}`;
      setQueryString(formedString);
    });
  }

  // Calling the Query to fetch weather data
  const { data, isFetching, isError, refetch, error } = useFetchWeatherQuery(queryString);

  // Access relevant info from weather info and store
  useEffect(() => {
    if (!isFetching && !isError) {
      const requiredFields: IRequiredFields = {};
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
          const presentItem: IChartComp = {
            temp: main.temp - 273,
            humidity: main.humidity,
            wind_speed: wind.speed,
            weather_description: weather[0].description,
            weather_name: weather[0].main,
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
          weather_description: allReports[0].weather_description,
          weather_name: allReports[0].weather_name,
          hour: allReports[0].hour,
          current_date: allReports[0].current_date,
        };
      });
      setResponseData(dailyReports);
      setDataByDate(requiredFields);
    }
  }, [data, isError, isFetching]);

  // Handle error from the query call
  useEffect(() => {
    if (error) {
      const parsedError = JSON.parse(JSON.stringify(error));
      if (!parsedError.data) {
        setErrorMessage('Oops! Network Error. Check your network and try again.');
      }
      else {
        setErrorMessage('Invalid query string supplied. Check the API key and try again');
      }
    }
  }, [error]);

  // Check screen size and use it to set page size
  useEffect(() => {
    if (!myView) {
      setPageSize(3);
    }
    else {
      setPageSize(1);
    }
  }, [myView]);

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
    <React.Fragment>
      {isFetching ? (
        <LoadingComponent />
      ) : isError ? (
        <ErrorComponent message={errorMessage} />
      ) : (
        <MainWrapper>
          <h1>Weather Forecast of your Location</h1>
          <TempSelector
            value={tempUnit}
            handleChange={handleUnitChange}
            handleRefetch={handleRefetch}
          />
          <PaginationArrows
            handleLeft={handleBackwardArrow}
            handleRight={handleForwardArrow}
            handleRefetch={handleRefetch}
            pageIndex={pageIndex}
            maxPage={Math.floor(responseData.length / pageSize)}
          />
          <CardsWrapper>
            {displayData.map((singleData) => (
              <WeatherBox
                key={singleData.current_date}
                id={singleData.current_date}
                temp={singleData.temp}
                weather_name={singleData.weather_name}
                weather_description={singleData.weather_description}
                current_date={singleData.current_date}
                tempUnit={tempUnit}
                selectedDay={selectedDay}
                handleSelectDay={handleSelectDay}
              />
            ))}
          </CardsWrapper>
          <ChartWrapper>
            {barData.length > 0 && (
              <ChartComponent input={barData} tempUnit={tempUnit} />
            )}
          </ChartWrapper>
        </MainWrapper>
      )}
    </React.Fragment>
  );
}

export default WeatherScreen;
