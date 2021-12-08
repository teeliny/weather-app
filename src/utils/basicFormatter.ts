interface ISingleStore {
  temp: number;
  humidity: number;
  wind_speed: number;
  cloud: string;
  hour: number;
}

interface IStoreData {
  [key: string]: ISingleStore[];
}
interface IInput {
  main: { temp: number; humidity: number };
  weather: { description: string }[];
  wind: { speed: number },
  dt_txt: string;
}

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

export function convertTemp(tempUnit: string, temp: number) {
  if (tempUnit === '1') {
    return ((9 * temp / 5) + 32);
  }
  else return temp;
}

export function intervalFormatter(input: IInput[]) {
  const requiredFields: IStoreData = {};
  input.forEach((item) => {
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
    }
    // Check if this current date is already store in required object
    if (requiredFields.hasOwnProperty(current_date)) {
      requiredFields[current_date].push(presentItem);
    }
    else {
      requiredFields[current_date] = [presentItem];
    }
  })
  return requiredFields;
}