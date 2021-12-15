import { useState, useLayoutEffect } from 'react';
import {
  IChartComp,
  IRequiredFields,
  IIntervalFormatter,
} from './formatter.typing';

export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

// Time format for chart 
export const timeFormats: { [key: string]: string } = {
  '0': '12:00 AM',
  '3': '03:00 AM',
  '6': '06:00 AM',
  '9': '09:00 AM',
  '12': '12:00 PM',
  '15': '03:00 PM',
  '18': '06:00 PM',
  '21': '09:00 PM',
};

const imgObjects: { [key: string]: string } = {
  'broken clouds': `${process.env.PUBLIC_URL}/assets/img/broken-cloud.jpg`,
  'clear sky': `${process.env.PUBLIC_URL}/assets/img/clear-sky.JPG`,
  clouds: `${process.env.PUBLIC_URL}/assets/img/cloudy.JPG`,
  'few clouds': `${process.env.PUBLIC_URL}/assets/img/few-cloud.JPG`,
  foggy: `${process.env.PUBLIC_URL}/assets/img/foggy.JPG`,
  'heavy rain': `${process.env.PUBLIC_URL}/assets/img/heavy-rain.JPG`,
  'light rain': `${process.env.PUBLIC_URL}/assets/img/light-rain.JPG`,
  'light snow': `${process.env.PUBLIC_URL}/assets/img/light-snow.JPG`,
  'most snow': `${process.env.PUBLIC_URL}/assets/img/most-snow.JPG`,
  'mostly sunny': `${process.env.PUBLIC_URL}/assets/img/mostly-sunny.JPG`,
  'overcast clouds': `${process.env.PUBLIC_URL}/assets/img/overcast-cloud.JPG`,
  'partly clouds': `${process.env.PUBLIC_URL}/assets/img/partly-cloud.JPG`,
  'scatter clouds': `${process.env.PUBLIC_URL}/assets/img/scatter-cloud.JPG`,
  snow: `${process.env.PUBLIC_URL}/assets/img/snow.JPG`,
  storm: `${process.env.PUBLIC_URL}/assets/img/storm.JPG`,
  sunny: `${process.env.PUBLIC_URL}/assets/img/sunny.JPG`,
  wind: `${process.env.PUBLIC_URL}/assets/img/wind.JPG`,
};

export function fetchImageURL(name: string, description: string) {
  console.log(name);
  if (imgObjects[description.toLowerCase()]) {
    return imgObjects[description.toLowerCase()];
  }
  else {
    const check = Object.keys(imgObjects);
    for (let i = 0; i < check.length; i++) {
      if ((check[i].toLowerCase()).includes(name.toLowerCase())) {
        return imgObjects[check[i]];
      }
    }
    return imgObjects['cloudy'];
  }
}

// Function to covert temp to Fahrenheit
export function convertTemp(tempUnit: string, temp: number) {
  if (tempUnit === '1') {
    return ((9 * temp / 5) + 32);
  }
  else return temp;
}

// Function to format and extract necessary fields from response data
export function intervalFormatter(input: IIntervalFormatter[]) {
  const requiredFields: IRequiredFields = {};
  input.forEach((item) => {
    const { main, weather, wind, dt_txt } = item;
    // Create date in th format, dd month year
    const full_date = new Date(dt_txt);
    const current_date = `${full_date.getDate()} ${
      months[full_date.getMonth()]
    }. ${full_date.getFullYear()}`;
    // Create a new info from item
    const presentItem: IChartComp = {
      temp: main.temp,
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
      requiredFields[current_date] = [presentItem];
    }
  });
  return requiredFields;
}

// Function to monitor window width
export function useWindowSize() {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateWidth);
    updateWidth();
    return () => window.removeEventListener('resize', updateWidth);
  }, [])
  return width;
}