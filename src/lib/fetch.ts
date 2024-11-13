import { IArticle } from "./model";

export async function fetchArticles(): Promise<IArticle[]> {
  const response = await fetch('../assets/articles.json');
  return await response.json();
}

export async function fetchArticle(id: string): Promise<IArticle> {
  if (!id) {
    throw new Error('No article ID provided');
  }

  const response = await fetch(`/api/articles/${id}`);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
}