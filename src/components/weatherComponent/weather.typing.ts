export interface IWeatherBox {
  temp: number;
  current_date: string;
  tempUnit: string;
  id: string;
  selectedDay: string;
  weather_name: string;
  weather_description: string;
  handleSelectDay: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
