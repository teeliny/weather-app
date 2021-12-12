export interface IWeatherBox {
  temp: number;
  humidity: number;
  current_date: string;
  tempUnit: string;
  id: string;
  selectedDay: string;
  handleSelectDay: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
