import { RouteProps } from '@solidjs/router';
import { RootPage } from './pages/root.page';
import { LoginPage } from './pages/login.page';

export const mainRoutes: RouteProps<string, never>[] = [
  {
    path: '/',
    component: RootPage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
];
