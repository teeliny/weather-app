export interface IChartComp {
  temp: number;
  humidity: number;
  wind_speed: number;
  cloud: string;
  hour: number;
  current_date: string;
}

export interface IRequiredFields {
  [key: string]: IChartComp[];
}
export interface IIntervalFormatter {
  main: { temp: number; humidity: number };
  weather: { description: string }[];
  wind: { speed: number };
  dt_txt: string;
}
