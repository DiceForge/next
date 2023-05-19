export interface SearchOptions<T> {
  page?: number;
  limit?: number;
  sort?: keyof T;
  search?: string;
}
