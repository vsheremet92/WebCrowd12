import React, { useEffect, useState, useCallback } from "react";
import { useLocalStorage } from "react-use";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";

import "./App.css";

import type { Item } from "./item";
import { HomePage } from "./components/HomePage";
import { ItemDetail } from "./components/ItemDetail";
import { Header } from "./components/Header";

function App() {
  const [favoriteItems, setFavoriteItems] = useLocalStorage<Item[]>("favItems", []);
  const [items, setItems] = useState<Item[]>([]);

  const onAddToFavoriteItems = useCallback(
    (item: Item) => {
      setFavoriteItems([...(favoriteItems ?? []), item]);
    },
    [favoriteItems, setFavoriteItems]
  );

  const onClearFavoriteItems = useCallback(() => {
    setFavoriteItems([]);
  }, [setFavoriteItems]);

  useEffect(() => {
    fetch("https://dummyapi.io/data/v1/post?limit=20", { headers: {
      'app-id': '619926ec9514c1ec7370f29f'
    }})
      .then((res) => res.json())
      .then(res => setItems(res.data));
  }, []);

  const history = useHistory();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const onSetSearch = useCallback(
    (search: string) => {
      setSearch(search);
      if (location.pathname !== "/") {
        history.push("/");
      }
    },
    [setSearch, history, location]
  );

  return (
    <div>
      <Header
        favoriteItems={favoriteItems ?? []}
        onClearFavoriteItems={onClearFavoriteItems}
        search={search}
        onSetSearch={onSetSearch}
      />
      <Switch>
        <Route exact path="/">
          <HomePage
            items={items}
            onAddToFavoriteItems={onAddToFavoriteItems}
            search={search}
          />
        </Route>
        <Route path="/detail/:id">
          <ItemDetail items={items} onAddToFavoriteItems={onAddToFavoriteItems} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
