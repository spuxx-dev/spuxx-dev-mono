import { UserAgent } from '@spuxx/browser-utils';
import { Button, ButtonLink, Layout, Sidebar } from '@spuxx/solid';
import { Component, Show } from 'solid-js';

export const SideNavToolbar: Component = () => {
  return (
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
  );
};
