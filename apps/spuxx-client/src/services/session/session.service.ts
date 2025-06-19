import { Logger, ServiceMixin } from '@spuxx/js-utils';
import { createSignal } from 'solid-js';
import { Session } from '../api/auth/session.types';
import { Api } from '../api';
import { Config } from '@spuxx/browser-utils';
import { AppConfig } from '@/config/app.config';
import { useNavigate } from '@solidjs/router';
import { createListsStore } from '@/stores/lists.store';

export class SessionService extends ServiceMixin<SessionService>() {
  private _session = createSignal<Session | null>(null);

  static get session() {
    return this.instance._session[0];
  }

  private static setSession(session: Session) {
    this.instance._session[1](session);
  }

  static async isAuthenticated() {
    try {
      const session = await SessionService.getSession();
      return !!session;
    } catch (error) {
      return false;
    }
  }

  static async isNotAuthenticated() {
    return !(await SessionService.isAuthenticated());
  }

  static async getSession() {
    if (this.session()?.sub) {
      return this.session();
    }
    const session: Session | undefined = await Api.getSession().promise;
    if (!session) return;
    Logger.debug(
      `Logged in as ${session.preferred_username}.`,
      SessionService.name
    );
    SessionService.setSession(session);
    return session;
  }

  static login() {
    const { API_URL } = Config.getConfig<AppConfig>();
    const returnTo = encodeURI(`${window.location.origin}`);
    window.location.href = `${API_URL}/auth/login?returnTo=${returnTo}`;
  }

  static async terminate() {
    const { API_URL } = Config.getConfig<AppConfig>();
    const returnTo = encodeURI(`${window.location.origin}`);
    window.location.href = `${API_URL}/auth/logout?returnTo=${returnTo}`;
  }

  static async protectRoute() {
    const navigate = useNavigate();
    if (!(await this.isAuthenticated())) {
      navigate('/login', { replace: true });
    }
  }
}
