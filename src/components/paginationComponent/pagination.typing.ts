export interface IPaginationArrow {
  handleLeft: () => void;
  handleRight: () => void;
  handleRefetch: () => void;
  pageIndex: number;
  maxPage: number;
}
