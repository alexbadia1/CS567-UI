import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext, AuthContextProps } from './AuthProvider';

import { fetchArticle } from '../lib/fetch';
import { IArticle } from '../lib/model';
import { ARTICLE_STALE_TIME } from '../lib/constants';

interface FocusedArticleContextProps {
  data: IArticle | undefined;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  setFocusedArticleId: (newFocusedArticleId: string | undefined) => void;
} 

const FocusedArticleContext = createContext<FocusedArticleContextProps>(null!);

interface FocusedArticleProviderProps {
  children: React.ReactNode;
}

const FocusedArticleProvider = ({ children }: FocusedArticleProviderProps) => {
  
  const auth: AuthContextProps = useContext(AuthContext);
  const [articleId, setFocusedArticleId] = useState<string | undefined>(undefined);

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['articles', `${articleId}`],
    queryFn: () => fetchArticle(articleId, auth),
    staleTime: ARTICLE_STALE_TIME,
    enabled: false,
  });

  useEffect(() => {
    if (articleId) {
      refetch();
    }
  }, [articleId, auth]);

  const initialValue = {
    data,
    isPending,
    isError,
    error,
    setFocusedArticleId,
  };

  return (
    <FocusedArticleContext.Provider value={initialValue}>
      {children}
    </FocusedArticleContext.Provider>
  );
};

export {
  FocusedArticleContext,
  FocusedArticleProvider
};