export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
