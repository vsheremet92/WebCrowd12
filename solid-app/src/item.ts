interface ItemOwner {
  firstName: string;
  id: string;
  lastName: string; 
  picture: string;
  title: string;
}

export interface Item {
  id: string;
  image: string;
  likes: number;
  publishDate: string;
  tags: string[];
  text: string;
  owner: ItemOwner;
}
