import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Navbar } from './components/Navbar/index.tsx';
import { Feed } from './pages/Feed/index.tsx';
import { Login } from './pages/Login/index.tsx';
import { Signup } from './pages/Signup/index.tsx';
import Article from './pages/Article/index.tsx';

import './index.css';

const queryClient = new QueryClient();

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/articles/:id" element={<Article />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </>
);
