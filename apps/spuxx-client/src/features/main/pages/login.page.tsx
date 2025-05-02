import { Button, Container } from '@spuxx/solid';
import { Component } from 'solid-js';

export const LoginPage: Component = () => {
  return (
    <Container class="relative text-center justify-center top-1/2 -translate-y-1/2">
      <h1>my.spuxx.dev</h1>
      <Button icon="mdi:login">Anmelden via auth.spuxx.dev</Button>
    </Container>
  );
};
