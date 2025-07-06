import { SessionService } from '@/services/session';
import { intl } from '@spuxx/js-utils';
import { Container } from '@spuxx/solid';
import { Component } from 'solid-js';

export const RootPage: Component = () => {
  SessionService.protectRoute();

  return (
    <Container class="text-center">
      <h1>
        {intl('main.page.root.title', {
          name: SessionService.session()?.given_name,
        })}
      </h1>
    </Container>
  );
};
