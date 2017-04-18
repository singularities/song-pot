export interface Song {
  _id?: string;
  createdAt: Date;
  title?: string;
  text?: string;
  audioIds?: any[];
}

export interface Audio {
  url?: string;

}
