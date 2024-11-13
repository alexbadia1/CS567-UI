import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchArticle } from '../../lib/fetch';
import { mockFetchArticle } from '../../lib/mock';
import { STALE_TIME } from '../../lib/constants';

import './index.scss';

function Article() {
  const { id } = useParams();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['articles', `${id}`],
    queryFn: () => mockFetchArticle(id),
    staleTime: STALE_TIME,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <section className="section">
      <main className="main">
        <article className="article">
          <h1 className="article__header">{data.headline}</h1>
          <div className="article__body">
            {data.body.split('\n').map((paragraph: string, index: number) => (
              // TODO: Use better key to avoid unecessary renders
              <p key={`${data.id}-${index}`} className="article__paragraph">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </main>
    </section>
  );
}

export default Article;
