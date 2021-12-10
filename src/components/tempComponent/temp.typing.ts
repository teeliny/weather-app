export interface ITempSelector {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  handleRefetch: () => void;
}
