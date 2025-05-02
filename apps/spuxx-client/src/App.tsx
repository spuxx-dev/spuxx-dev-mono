import '@spuxx/browser-utils/styles';
import '@spuxx/browser-utils/themes';
import './styles/index.css';

import { type Component } from 'solid-js';
import { AppLayout } from './layout';
import { AppRouter } from './router/router';

const App: Component = () => {
  return (
    <AppLayout>
      <AppRouter />
    </AppLayout>
  );
};

export default App;
