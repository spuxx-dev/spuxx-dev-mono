import { RouteProps } from '@solidjs/router';
import { ListPage } from './pages/list.page';

export const listsRoutes: RouteProps<string, never>[] = [
  {
    path: '/list/:id',
    component: ListPage,
  },
];
