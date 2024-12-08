import { AuthContextProps } from '../contexts/AuthProvider';
import { ARTICLE_ENDPOINT, RANDOM_ARTICLES_ENDPOINT,  } from './constants';
import { IArticle } from './model';

async function fetchArticle(articleId: string | undefined, auth: AuthContextProps): Promise<IArticle | obj> {
  if (!articleId) {
    console.error('No article ID provided');
    return {};
  }

  if (!auth) {
    console.error('Missing bearer token');
    return {};
  }

  const bearerToken = await auth.user?.getIdToken(true);

  if (!bearerToken) {
    console.error('Missing bearer token');
    return;
  }

  try {
    const response = await fetch(`${ARTICLE_ENDPOINT}/${articleId}`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
    });
    const jsonData = await response.json();
    return jsonData?.data ?? {};
  } catch (error) {
    console.error('Failed to fetch article', error);
  }

  return {};
}

async function fetchArticles(auth: AuthContextProps | null): Promise<IArticle[]> {
  if (!auth) {
    console.error('Missing bearer token');
    return [];
  }

  const bearerToken = await auth.user?.getIdToken(true);

  if (!bearerToken) {
    console.error('Missing bearer token');
    return [];
  }

  try {
    const response = await fetch(`${RANDOM_ARTICLES_ENDPOINT}?count=100`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
    });
    const jsonData = await response.json();
    return jsonData?.data ?? [];
  } catch (error) {
    console.error('Failed to fetch article', error);
  }

  return [];
}

export { fetchArticle, fetchArticles };