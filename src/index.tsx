import { routes } from 'constants/route';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from 'reportWebVitals';
import store from 'store';
import 'styles/index.scss';

const router = createBrowserRouter(routes.map(({ path, element }) => ({ path, element })));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
reportWebVitals();
