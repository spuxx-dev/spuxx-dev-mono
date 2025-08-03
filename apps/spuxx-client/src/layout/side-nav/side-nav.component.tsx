import { Layout, Sidebar } from '@spuxx/solid';
import { SideNavLists } from './side-nav-lists.component';
import { LocalStorage } from '@/services/local-storage';
import { SideNavToolbar } from './side-nav-toolbar.component';

export const SideNav = () => {
  if (LocalStorage.get('sideNavOpen')) Layout.openSidebar();

  const handleContentPresentChange = (present: boolean) => {
    LocalStorage.set('sideNavOpen', present);
  };

  return (
    <Sidebar side="left" onContentPresentChange={handleContentPresentChange}>
      <SideNavToolbar />
      <Sidebar.Content>
        <nav class="all-inherit">
          <SideNavLists />
        </nav>
      </Sidebar.Content>
    </Sidebar>
  );
};
