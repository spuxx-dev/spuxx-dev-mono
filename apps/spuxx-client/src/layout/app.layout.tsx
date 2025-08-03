import { Component, ParentProps, Show } from 'solid-js';
import { TopAppBar } from './app-bars/top-app-bar.component';
import { BottomAppBar } from './app-bars/bottom-app-bar.component';
import { SideNav } from './side-nav';
import { SessionService } from '@/services/session';

export const AppLayout: Component<ParentProps> = (props) => {
  return (
    <>
      <TopAppBar />
      <Show when={SessionService.isAuthenticated}>
        <SideNav />
      </Show>
      <main>{props.children}</main>
      <BottomAppBar />
    </>
  );
};
