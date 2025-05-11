import { RouteProps } from '@solidjs/router';
import { mainRoutes } from '@/features/main/main.routes';

export const routes: RouteProps<string, never>[] = [...mainRoutes];
