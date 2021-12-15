export interface IChartComp {
  temp: number;
  humidity: number;
  wind_speed: number;
  weather_description: string;
  weather_name: string;
  hour: number;
  current_date: string;
}

export interface IChartInput {
  input: IChartComp[];
  tempUnit: string;
}
