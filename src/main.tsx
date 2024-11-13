import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './lib/store.ts';

import { Login } from './Login/index.tsx';
import { Signup } from './Signup/index.tsx';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1> TODO: Implement News Feed</h1>,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]);

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </>
);
