export interface Band {
  _id?: string;
  createdAt: Date;
  name: string;
  userIds: string[];
}

export interface Song {
  _id?: string;
  bandId: string;
  createdAt: Date;
  title?: string;
  text?: string;
  audioIds?: any[];
}

export interface Audio {
  url?: string;

}
