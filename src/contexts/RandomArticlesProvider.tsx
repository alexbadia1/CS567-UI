import React, { createContext, useContext, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthContext, AuthContextProps } from './AuthProvider';
import { ARTICLE_STALE_TIME } from '../lib/constants';
import { IArticle } from '../lib/model';
import { fetchArticle, fetchArticles } from '../lib/fetch';

interface RandomArticlesContextProps {
  data: IArticle[] | undefined;
  isPending: boolean;
  isError: boolean;
  error: any;
  prefetch: (articleId: string) => Promise<void>;
} 

const RandomArticlesContext = createContext<RandomArticlesContextProps>(null!);

interface RandomArticlesProviderProps {
  children: React.ReactNode;
}

const RandomArticlesProvider = ({ children }: RandomArticlesProviderProps) => {
  const queryClient = useQueryClient();
  const auth: AuthContextProps = useContext(AuthContext);
  
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['articles'],
    queryFn: () => fetchArticles(auth),
    staleTime: ARTICLE_STALE_TIME,
    enabled: false,
  });

  const prefetch = (articleId: string) => queryClient.prefetchQuery({
    queryKey: ['articles', `${articleId}`],
    queryFn: () => fetchArticle(articleId, auth),
    staleTime: ARTICLE_STALE_TIME,
  });

  useEffect(() => {
    if (auth && auth?.user) {
      refetch();
    }
  }, [auth, refetch]);

  const initialValue = { 
    data,
    isPending,
    isError,
    error,
    prefetch
  };
  
  return (
    <RandomArticlesContext.Provider value={initialValue}>
      {children}
    </RandomArticlesContext.Provider>
  );
};

export {
  RandomArticlesContext,
  RandomArticlesProvider,
};
