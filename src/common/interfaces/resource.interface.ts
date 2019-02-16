import { IPermission } from './permission.interface';

export interface IResource {
  name: string;
  readonly identify: string;
  permissions: IPermission[];
}
