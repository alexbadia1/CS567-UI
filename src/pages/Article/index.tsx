import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';

import { fetchArticle } from '../../lib/fetch';
import { mockFetchArticle } from '../../lib/mock';
import { STALE_TIME } from '../../lib/constants';

import './index.scss';

enum SurveyAction {
  CANCEL,
  SUBMIT,
}

export function Article() {
  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['articles', `${id}`],
    queryFn: () => mockFetchArticle(id),
    staleTime: STALE_TIME,
  });

  const openModal = () => setShowModal(true);
  const closeModal = (action: SurveyAction) => setShowModal(false);

  const handleFactcheck = () => {
    window.open('https://www.snopes.com/', '_blank');
  };

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
            <div className="margin-24" />
            <div className="margin-24" />
            {/* <Button
              classnames="primary-button"
              text="FACT-CHECK ARTICLE"
              onClick={() => handleFactcheck()}
            />
             */}
            <div className="button-container">
              <Button
                classnames="primary-button"
                text="FACT-CHECK ARTICLE"
                onClick={() => handleFactcheck()}
              />
              <Button
                classnames="primary-button"
                text="TAKE SURVEY"
                onClick={openModal}
              />
            </div>
            <div className="margin-24" />
          </div>
        </article>
      </main>
      {/* <footer>
        <Button
          classnames="accent-button"
          text="TAKE SURVEY"
          onClick={openModal}
        />
      </footer> */}

      <Modal
        show={showModal}
        onCancel={() => closeModal(SurveyAction.CANCEL)}
        onSubmit={() => closeModal(SurveyAction.SUBMIT)}
      >
        <span className="modal-title">Survey</span>
        <span className="modal-subtitle">
          <i>
            Note: You can revisit this article to change your answers at any
            time.
          </i>
        </span>
        <div className="modal-form-field">
          <fieldset>
            <legend>
              Would you cite this article?<span className="required">*</span>
            </legend>
            <div>
              <input type="radio" id="yes" name="drone" value="yes" />
              <label htmlFor="yes">Yes</label>
            </div>
            <div>
              <input type="radio" id="no" name="drone" value="no" />
              <label htmlFor="no">No</label>
            </div>
          </fieldset>
        </div>
      </Modal>
    </section>
  );
}
