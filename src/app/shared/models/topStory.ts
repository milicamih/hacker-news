import {Comment} from './comment';

export class TopStory {
  
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
  comment? : Comment[];
  }