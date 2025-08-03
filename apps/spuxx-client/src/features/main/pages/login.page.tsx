import { Button, Container } from '@spuxx/solid';
import { Component } from 'solid-js';
import { SessionService } from '../../../services/session';
import { useNavigate } from '@solidjs/router';
import { intl } from '@spuxx/js-utils';

export const LoginPage: Component = () => {
  const navigate = useNavigate();

  async function checkAuthentication() {
    await SessionService.getSession();
    const { isAuthenticated } = SessionService;
    if (isAuthenticated) navigate('/', { replace: true });
  }
  checkAuthentication();

  async function handleLogin() {
    SessionService.login();
  }

  return (
    <Container class="relative text-center justify-center top-1/2 -translate-y-1/2">
      <h1>my.spuxx.dev</h1>
      <Button icon="mdi:login" onClick={handleLogin}>
        {intl('main.page.login.login-via-oidc')}
      </Button>
    </Container>
  );
};
