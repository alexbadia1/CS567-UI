import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';

import { AuthProvider } from './contexts/AuthProvider';
import { RandomArticlesProvider } from './contexts/RandomArticlesProvider';
import { FocusedArticleProvider } from './contexts/FocusedArticleProvider';
import { SurveyProvider } from './contexts/SurveyProvider';
import { AuthRedirect } from './components/AuthRedirect';
import { ContentRedirect } from './components/ContentRedirect';

import { Navbar } from './components/Navbar';
import { Feed } from './pages/Feed';
import { Article } from './pages/Article';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Fallback } from './pages/Fallback';

import { ARTICLE_BY_ID_PATH, FEED_PATH, LOGIN_PATH, SIGNUP_PATH } from './lib/constants';

import './index.scss';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <SurveyProvider>
          <RandomArticlesProvider>
            <FocusedArticleProvider>
              <BrowserRouter>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Navigate to={FEED_PATH} />} />
                  <Route element={<ContentRedirect/>}>
                    <Route path={LOGIN_PATH} element={<Login />} />
                    <Route path={SIGNUP_PATH} element={<Signup />} />
                  </Route>
                  <Route element={<AuthRedirect />}>
                    <Route path={FEED_PATH} element={<Feed />} />
                    <Route path={ARTICLE_BY_ID_PATH} element={<Article />} />
                  </Route>
                  <Route path="*" element={<Fallback />} />
                </Routes>
              </BrowserRouter>
            </FocusedArticleProvider>
          </RandomArticlesProvider>
        </SurveyProvider>
      </QueryClientProvider>
    </AuthProvider>
  </>
);
