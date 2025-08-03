import { Button, ButtonLink, Layout, Sidebar } from '@spuxx/solid';
import { UserAgent } from '@spuxx/browser-utils';
import { Show } from 'solid-js';
import { SideNavLists } from './side-nav-lists.component';
import { LocalStorage } from '@/services/local-storage';
import { SessionService } from '@/services/session';

export const SideNav = () => {
  if (LocalStorage.get('sideNavOpen')) Layout.openSidebar();

  const handleContentPresentChange = (present: boolean) => {
    LocalStorage.set('sideNavOpen', present);
  };

  return (
    <Show when={SessionService.isAuthenticated}>
      <Sidebar side="left" onContentPresentChange={handleContentPresentChange}>
        <Sidebar.Toolbar>
          <Show when={!UserAgent.isDesktop}>
            <Button
              icon="mdi:backburger"
              title="Close"
              variant="colored"
              color="text-default"
              onClick={Layout.closeSidebar}
            />
          </Show>
          <ButtonLink
            icon="mdi:home"
            title="Home"
            href="/"
            variant="colored"
            color="text-default"
            onClick={Layout.closeSidebarOnMobile}
          />
          <ButtonLink
            icon="mdi:login"
            title="Login"
            href="/login"
            variant="colored"
            color="text-default"
            onClick={Layout.closeSidebarOnMobile}
          />
          <Button
            icon="mdi:account"
            title="Account"
            variant="colored"
            color="text-default"
          />
          <Button
            icon="mdi:gear"
            title="Settings"
            variant="colored"
            color="text-default"
          />
        </Sidebar.Toolbar>
        <Sidebar.Content>
          <nav class="all-inherit">
            <SideNavLists />
          </nav>
        </Sidebar.Content>
      </Sidebar>
    </Show>
  );
};
