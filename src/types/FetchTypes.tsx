export interface DocumentData {
  id: string;
  [key: string]: any;
}

export interface PostData {
  uid: string;
  title: string;
  image: string;
  body: string;
  createdAt: string;
  createBy: string;
  tagsArray: [];
}

export interface UpdatePostData {
  title: string;
  image: string;
  body: string;
  tagsArray: string[];
  [key: `${string}.${string}`]: any;
}
