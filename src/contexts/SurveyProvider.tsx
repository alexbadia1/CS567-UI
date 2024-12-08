import { createContext, useContext, useState } from 'react';
import { ISurveyResponse } from '../lib/model';
import { PROFILE_ENDPOINT } from '../lib/constants';
import { AuthContext } from './AuthProvider';
import { toast } from 'react-toastify';

interface SurveyContextProps {
  survey: ISurveyResponse;
  submitSurvey: (articleId: string, wouldCite: boolean) => void;
}

const SurveyContext = createContext<SurveyContextProps>(null!);

interface SurveyProviderProps {
  children: React.ReactNode;
}

function SurveyProvider({ children }: SurveyProviderProps) {
  const auth = useContext(AuthContext);
  const [survey, setSurvey] = useState<ISurveyResponse>({} as ISurveyResponse);

  // TODO: Make this more robust
  const submitSurvey = async (articleId: string, wouldCite: boolean) => {
    const updatedSurvey = {
      ...survey,
      [articleId!]: {
        wouldCite: wouldCite,
      },
    };

    const bearerToken = await auth.user?.getIdToken(true);

    if (!bearerToken) {
      toast.error('You must be logged in to submit a survey');
      return;
    }

    fetch(PROFILE_ENDPOINT, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        survey: updatedSurvey,
      }),
    }).then((response) => {
      if (response.ok) {
        toast.success('Survey submitted!');
      } else {
        toast.error('Failed to submit survey!');
      }
    });

    setSurvey(updatedSurvey);
  };

  const initialValue: SurveyContextProps = {
    survey,
    submitSurvey,
  };

  return (
    <SurveyContext.Provider value={initialValue}>
      {children}
    </SurveyContext.Provider>
  );
}

export { SurveyContext, SurveyProvider };
