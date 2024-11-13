import React, { useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IArticle } from '../../lib/model';
import { Link } from 'react-router-dom';
import { fetchArticle } from '../../lib/fetch';
import { mockFetchArticle, mockFetchArticles } from '../../lib/mock';
import { STALE_TIME } from '../../lib/constants';

import './index.scss';
import { Card } from '../../components/Card';

export function Feed() {
  const queryClient = useQueryClient();
  const observer = useRef<IntersectionObserver | null>(null);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['articles'],
    queryFn: mockFetchArticles,
    staleTime: STALE_TIME,
  });

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    if (isMobile && data) {
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            if (id) {
              queryClient.prefetchQuery({
                queryKey: ['articles', `${id}`],
                queryFn: () => mockFetchArticle(id),
                staleTime: STALE_TIME,
              });
            }
          }
        });
      });

      data.forEach((article: IArticle) => {
        const element = document.querySelector(`[data-id="${article.id}"]`);
        if (element) {
          observer?.current?.observe(element);
        }
      });
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [data, queryClient]);

  const prefetch = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: ['articles', `${id}`],
      queryFn: () => mockFetchArticle(id),
      staleTime: STALE_TIME,
    });
  };

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <section className="section">
      <ul className="list-view">
        {data.map((article: IArticle) => (
          <li key={article.id} className="list-view__item">
            <section className="card">
              <Link
                className="list-view__link"
                to={`/articles/${article.id}`}
                data-id={article.id}
                onMouseEnter={() => prefetch(article.id)}
                onFocus={() => prefetch(article.id)}
                onTouchStart={() => prefetch(article.id)}
                onClick={() => prefetch(article.id)}
              >
                {article.headline}
              </Link>
            </section>
          </li>
        ))}
      </ul>
    </section>
  );
}
