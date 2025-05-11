/* @refresh reload */
import { render } from 'solid-js/web';

import './styles/index.css';
import App from './App';
import { Config } from '@spuxx/browser-utils';
import { appConfig, AppConfig } from './config/app.config';
import { Intl, Logger } from '@spuxx/js-utils';
import de from '@/assets/locales/de.yaml';

Config.setup<AppConfig>({
  defaultConfig: appConfig,
  importMetaEnv: import.meta.env,
});
Logger.setLevel(Config.getConfig<AppConfig>().LOG_LEVEL);

Intl.setup({
  fallbackLocale: Config.getConfig<AppConfig>().DEFAULT_LOCALE,
  dictionaries: [
    {
      locale: 'de',
      values: de,
    },
  ],
});

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?'
  );
}

render(() => <App />, root!);
