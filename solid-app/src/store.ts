import { createSignal, createResource } from "solid-js";
import { Item } from "./item";

export const [favoriteItems, setFavoriteItems] = createSignal<Item[]>([]);
export const onAddToFavoriteItems = (i: Item) => setFavoriteItems([...favoriteItems(), i]);
export const onClearFavoriteItems = () => setFavoriteItems([]);

export const [search, setSearch] = createSignal("");
export const onSetSearch = (s: string) => setSearch(s);


export const [items] = createResource<Item[]>(() =>
  fetch("https://dummyapi.io/data/v1/post?limit=20", {
    headers: {
      'app-id': '619926ec9514c1ec7370f29f'
    }
  })
  .then((res) => res.json())
  .then((result) => result.data),
  {
    initialValue: []
  }
);
