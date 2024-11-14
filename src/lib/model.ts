export interface IArticle {
  id: string;
  headline: string;
  subheadline?: string;
  body: string;
  factCheckUrl: string;
}

export interface IQuestion {
  id: string;
  question: string;
  type: string;
  required: boolean;
}