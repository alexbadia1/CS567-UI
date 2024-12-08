import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FocusedArticleContext } from '../../contexts/FocusedArticleProvider';
import { SurveyContext } from '../../contexts/SurveyProvider';

import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { PIXEL_OFFSET } from '../../lib/constants';

import './index.scss';

enum SurveyAction {
  CANCEL,
  SUBMIT,
}

function isVisible(sectionRef: React.RefObject<HTMLElement>) {
  if (!sectionRef?.current) return false;
  const rect = sectionRef.current.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  return rect.top >= 0 && rect.bottom - PIXEL_OFFSET <= windowHeight;
}

export function Article() {
  // Context
  const { id: articleId } = useParams();
  const {
    data: article,
    isPending,
    isError,
    error,
    setFocusedArticleId,
  } = useContext(FocusedArticleContext);
  const { survey, submitSurvey } = useContext(SurveyContext);

  // State
  const [showModal, setShowModal] = useState(false);
  const [didFactCheck, setDidFactCheck] = useState(false);
  const [surveyDisabled, setSurveyDisabled] = useState(true);
  const scrollInfo = useRef({ progress: 0 });
  const surveyRef = useRef<any>({ wouldCite: null });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => setFocusedArticleId(articleId), [articleId]);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef?.current) {
        const { scrollTop, scrollHeight, clientHeight } = sectionRef.current;
        const totalScrollableHeight = scrollHeight - clientHeight;
        const progress = (scrollTop / totalScrollableHeight) * 100;
        scrollInfo.current.progress = Math.max(
          scrollInfo.current.progress,
          progress
        );
        if (didFactCheck && scrollInfo.current.progress > 75) {
          setSurveyDisabled(false);
        }
      }
    };

    if (isVisible(sectionRef)) {
      scrollInfo.current.progress = 100;
      if (didFactCheck) {
        setSurveyDisabled(false);
      }
    }

    const element = sectionRef?.current;
    element?.addEventListener('scroll', handleScroll);
    return () => element?.removeEventListener('scroll', handleScroll);
  }, [sectionRef?.current, article, didFactCheck]);

  const closeModal = (action: SurveyAction) => {
    if (action === SurveyAction.SUBMIT) {
      submitSurvey(articleId!, surveyRef.current.wouldCite);
    }
    setShowModal(false);
  };

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <section className="section" ref={sectionRef}>
      <main className="main">
        <article className="article">
          <h1 className="article__header">{article?.headline}</h1>
          <div className="article__body">
            {article?.body
              ?.split('\n')
              ?.map((paragraph: string, index: number) => (
                <p
                  key={`${article?._id}-p-${index}`}
                  className="article__paragraph"
                >
                  {paragraph}
                </p>
              ))}
            <div className="margin-24" />
            <div className="margin-24" />
            <Button
              classnames="primary-button"
              text="FACT-CHECK ARTICLE"
              onClick={() => {
                setDidFactCheck(true);
                if (scrollInfo.current.progress > 75) {
                  setSurveyDisabled(false);
                }
                window.open(
                  article?.factCheckUrl ?? 'https://www.snopes.com/',
                  '_blank'
                );
              }}
            />
            <div className="margin-24" />
            <Button
              classnames="accent-button"
              text="TAKE SURVEY"
              onClick={() => setShowModal(true)}
              disabled={surveyDisabled}
            />
            <div className="margin-24" />
          </div>
        </article>
      </main>

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
              <input
                type="radio"
                id="yes"
                name="drone"
                value="yes"
                onClick={() => {
                  surveyRef.current.wouldCite = true;
                }}
                defaultChecked={survey[articleId!]?.wouldCite === true}
              />
              <label htmlFor="yes">Yes</label>
            </div>
            <div>
              <input
                type="radio"
                id="no"
                name="drone"
                value="no"
                onClick={() => {
                  surveyRef.current.wouldCite = false;
                }}
                defaultChecked={survey[articleId!]?.wouldCite === false}
              />
              <label htmlFor="no">No</label>
            </div>
          </fieldset>
        </div>
      </Modal>
    </section>
  );
}
