import { intl } from '@spuxx/js-utils';
import { ButtonLink, Container, Heading } from '@spuxx/solid';
import { Component } from 'solid-js';

export const NotFoundPage: Component = () => {
  return (
    <Container class="text-center">
      <Heading level={2}>{intl('main.page.not-found.title')}</Heading>
      <p>{intl('main.page.not-found.text')}</p>
      <br />
      <ButtonLink
        href="/"
        variant="contained"
        color="primary"
        icon="mdi:arrow-left"
      >
        {intl('main.page.not-found.back')}
      </ButtonLink>
    </Container>
  );
};
