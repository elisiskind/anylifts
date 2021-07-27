export interface DataContext<T> {
  loading: boolean;
  data: T | null;
}
