import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import { routes } from './constants/route';
import theme from './helpers/theme';
import reportWebVitals from './reportWebVitals';
import './styles/index.scss';

const router = createBrowserRouter(routes.map(({ path, element }) => ({ path, element })));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);
reportWebVitals();
