import { RouteProps } from '@solidjs/router';
import { RootPage } from './pages/root.page';
import { LoginPage } from './pages/login.page';
import { NotFoundPage } from './pages/not-found.page';

export const mainRoutes: RouteProps<string, never>[] = [
  {
    path: '/',
    component: RootPage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/*',
    component: NotFoundPage,
  },
];
