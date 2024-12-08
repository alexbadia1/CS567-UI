import { useContext } from 'react';
import { RandomArticlesContext } from '../../contexts/RandomArticlesProvider';
import { Link } from 'react-router-dom';
import { IArticle } from '../../lib/model';
import { BarLoader } from 'react-spinners';

import './index.scss';

export function Feed() {
  const {
    data: randomArticles,
    isPending,
    isError,
    error,
    prefetch,
  } = useContext(RandomArticlesContext);

  if (isPending) {
    return (
      <div className="loading-container">
        <BarLoader />
      </div>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <section className="section">
      <ul className="list-view">
        {randomArticles?.map((article: IArticle) => (
          <li key={`feed-${article._id}`} className="list-view__item">
            <section className="card">
              <Link
                className="list-view__link"
                to={`/articles/${article._id}`}
                data-id={article._id}
                onMouseEnter={() => prefetch(article._id)}
                onFocus={() => prefetch(article._id)}
                onTouchStart={() => prefetch(article._id)}
                onClick={() => prefetch(article._id)}
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
