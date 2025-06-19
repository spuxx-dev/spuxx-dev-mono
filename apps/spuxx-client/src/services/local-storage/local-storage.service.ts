import { LocalStorageMixin } from '@spuxx/browser-utils';

export interface ILocalStorage {
  sideNavOpen: boolean;
}

export class LocalStorage extends LocalStorageMixin<ILocalStorage>({
  key: 'spuxx-client',
  defaultValues: {
    sideNavOpen: false,
  },
}) {}
