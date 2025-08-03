import '@spuxx/browser-utils/styles';
import '@spuxx/browser-utils/themes';
import './styles/index.css';

import { type Component } from 'solid-js';
import { AppRouter } from './router/router';
import { bootstrap } from './bootstrap';

const App: Component = () => {
  bootstrap();
  return <AppRouter />;
};

export default App;
