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
