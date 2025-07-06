import { RouteProps } from '@solidjs/router';
import { mainRoutes } from '@/features/main/main.routes';
import { listsRoutes } from '@/features/lists/lists.routes';

export const routes: RouteProps<string, never>[] = [
  ...mainRoutes,
  ...listsRoutes,
];
