import { Layout } from '@spuxx/solid';
import { AppBar, Button } from '@spuxx/solid';

export const TopAppBar = () => {
  return (
    <AppBar>
      <AppBar.Section>
        <Button
          icon="mdi:menu"
          title="Menu"
          variant="colored"
          color="text-default"
          rounded
          onClick={Layout.toggleSidebar}
        />
      </AppBar.Section>
      <AppBar.Section>
        <a href="/">
          <Button title="Home" variant="colored" color="text-default" rounded>
            my.spuxx.dev
          </Button>
        </a>
      </AppBar.Section>
      <AppBar.Section>
        <a href="https://github.com/spuxx-dev/jslibs" target="_blank">
          <Button
            icon="mdi:github"
            title="GitHub"
            variant="colored"
            color="text-default"
            rounded
          />
        </a>
      </AppBar.Section>
    </AppBar>
  );
};
