export interface CommonResult<T = any> {
  code: number;
  message: string;
  count?: number;
  data?: T;
}
