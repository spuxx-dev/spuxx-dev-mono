import { CreateListButton } from '@/features/lists/components/create-list-button.component';
import { createListsStore } from '@/stores/lists.store';
import { intl } from '@spuxx/js-utils';
import { ButtonLink, Layout, Sidebar } from '@spuxx/solid';
import { Component, createEffect, For } from 'solid-js';

export const SideNavLists: Component = () => {
  const { store, fetchLists } = createListsStore();

  createEffect(() => {
    fetchLists();
  });

  return (
    <Sidebar.Group
      title={intl('layout.side-nav.lists.title')}
      icon="mdi:list-box"
    >
      <For each={store.lists}>
        {(list) => (
          <ButtonLink
            href={`/lists/${list.id}`}
            variant="colored"
            color="text-default"
            active={location.pathname === `/lists/${list.id}`}
            onClick={Layout.closeSidebarOnMobile}
            icon={list.icon}
          >
            {list.name}
          </ButtonLink>
        )}
      </For>
      <CreateListButton />
    </Sidebar.Group>
  );
};
