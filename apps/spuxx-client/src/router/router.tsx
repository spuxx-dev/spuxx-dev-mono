import { Route, Router } from '@solidjs/router';
import { For, type ParentComponent } from 'solid-js';
import { routes } from './routes';
import { AppLayout } from '@/layout';

export const AppRouter: ParentComponent = () => {
  return (
    <Router root={AppLayout}>
      <For each={routes}>
        {(route) => <Route path={route.path} component={route.component} />}
      </For>
    </Router>
  );
};
