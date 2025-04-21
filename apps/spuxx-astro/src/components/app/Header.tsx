import type { Component } from 'solid-js';
import { AppBar, ButtonLink } from '@spuxx/solid/server';

export const Header: Component = () => {
  return (
    <AppBar>
      <AppBar.Section>
        <nav>
          <ButtonLink icon="mdi:home" href="/" variant="colored" color="text-default">
            Home
          </ButtonLink>
          <ButtonLink icon="mdi:post" href="/#blog" variant="colored" color="text-default">
            Blog
          </ButtonLink>
        </nav>
        <ButtonLink
          icon="mdi:twitter"
          href="https://bsky.app/profile/spuxx.bsky.social"
          variant="colored"
          color="text-default"
          attrs={{ target: '_blank' }}
        >
          Totally not Twitter
        </ButtonLink>
        <ButtonLink
          icon="mdi:github"
          href="https://github.com/spuxx-dev"
          variant="colored"
          color="text-default"
          attrs={{ target: '_blank' }}
        >
          GitHub
        </ButtonLink>
      </AppBar.Section>
    </AppBar>
  );
};
