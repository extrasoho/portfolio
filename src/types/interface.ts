export interface IAsset {
  type: string;
  url: string;
}

export interface IProject {
  id: number;
  tag: string; // Main category tag
  asssets: IAsset[]; // Note: keeping the typo from the JSON for now
  project_title: string;
  client: string;
  overview: string;
  contribution: string[];
  deliverables: string[];
  impact: string[];
  tags: string[];
}

export interface ITickerImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

export interface ITickerProps {
  images?: ITickerImage[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}
