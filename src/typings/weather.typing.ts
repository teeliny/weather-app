export interface IWeatherBox {
  temp: number;
  humidity: number;
  current_date: string;
  tempUnit: string;
  id: string;
  handleSelectDay: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export interface ITempSelector {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  handleRefetch: () => void;
}

export interface IPaginationArrow {
  handleLeft: () => void;
  handleRight: () => void;
  handleRefetch: () => void;
  pageIndex: number;
  maxPage: number;
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

export interface SizeState {
  mobile_view: boolean;
}
