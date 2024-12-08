export interface IArticle {
  _id: string;
  authors: string[];
  publisher: string;
  publishDate: string;
  headline: string;
  body: string;
  politicalAffiliation: string;
  factCheckUrl?: string;
}

export interface IQuestion {
  id: string;
  question: string;
  type: string;
  required: boolean;
}

export interface ISurveyResponse {
  [articleId: string]: {
    wouldCite: boolean | undefined;
  };
}