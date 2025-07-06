import { RouteProps } from '@solidjs/router';
import { ListPage } from './pages/list.page';

export const listsRoutes: RouteProps<string, never>[] = [
  {
    path: '/lists/:id',
    component: ListPage,
  },
];
