import { ConfigProvider, theme } from 'antd';
import { Route, Router } from 'electron-router-dom';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import About from './about/About';
import './assets/main.css';
import { THEME_DARK_VALUE, THEME_DEFAULT_VALUE } from './settings/Appearance';
import Settings from './settings/Settings';

function Main(): JSX.Element {
  const [localTheme, setLocalTheme] = useState<string>(THEME_DEFAULT_VALUE);

  const setBg =
    localTheme === THEME_DARK_VALUE ? <style>{'html,body {background: #000;}'}</style> : <></>;
  const themeAlgorithm =
    localTheme === THEME_DARK_VALUE ? theme.darkAlgorithm : theme.defaultAlgorithm;

  window.api.setThemeReply((t) => setLocalTheme(t ?? THEME_DEFAULT_VALUE));

  useEffect(() => {
    window.api.getTheme.then((t) => {
      const currentTheme = t ?? THEME_DEFAULT_VALUE;
      setLocalTheme(currentTheme);
    });
  }, []);

  return (
    <React.StrictMode>
      {setBg}
      <ConfigProvider theme={{ algorithm: themeAlgorithm }}>
        <Router
          main={<Route path="/" element={<App />} />}
          about={<Route path="/" element={<About />} />}
          settings={<Route path="/" element={<Settings />} />}
        />
      </ConfigProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Main />);
