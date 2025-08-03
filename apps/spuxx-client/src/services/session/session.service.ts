import { Logger, ServiceMixin } from '@spuxx/js-utils';
import { createSignal } from 'solid-js';
import { Session } from '../api/auth/session.types';
import { Api } from '../api';
import { Config } from '@spuxx/browser-utils';
import { AppConfig } from '@/config/app.config';
import { useNavigate } from '@solidjs/router';

export class SessionService extends ServiceMixin<SessionService>() {
  private _session = createSignal<Session | null>(null);

  static get session() {
    return this.instance._session[0];
  }

  private static setSession(session: Session) {
    this.instance._session[1](session);
  }

  static get isAuthenticated() {
    const session = this.session();
    return !!session;
  }

  static get isNotAuthenticated() {
    return !this.isAuthenticated;
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
    await this.getSession();
    if (this.isNotAuthenticated) {
      navigate('/login', { replace: true });
    }
  }
}
