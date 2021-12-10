export interface IChartComp {
  temp: number;
  humidity: number;
  wind_speed: number;
  cloud: string;
  hour: number;
  current_date: string;
}

export interface IChartInput {
  input: IChartComp[];
  tempUnit: string;
}
