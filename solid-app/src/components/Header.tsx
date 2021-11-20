import { Component, For } from "solid-js";
import { Link } from "solid-app-router";
import { search, onSetSearch, favoriteItems, onClearFavoriteItems } from "../store";

export const Header: Component = () => (
  <div class="bg-green-900 text-white flex flex-row w-full py-4">
    <div class="text-2xl px-10 py-2">
      <Link href="/">
        Simple Demo Application
      </Link>
    </div>
    <div class="flex-grow">
      <input
        type="text"
        value={search()}
        onKeyUp={(evt) => onSetSearch(evt.currentTarget.value)}
        placeholder="Search by name or text..."
        class="p-2 text-xl bg-white text-black rounded-lg max-w-md w-96"
      />
    </div>
    <div class="px-10 py-2 justify-end has-tooltip">
      <span class="tooltip cart">
        <div>Favorites: ({favoriteItems().length})</div>
        <For each={favoriteItems()}>
        {(i) => (
          <div class="flex flex-row my-2">
            <img src={i.image} alt="img" class="h-8 mr-2" />
            <h3 class="title text-md truncate flex-grow">{i.text}</h3>
          </div>
        )}
        </For>
        <div class="flex">
          <button
            onClick={onClearFavoriteItems}
            class="text-md px-8 py-1 mt-5 font-bold bg-green-800 text-white rounded-full"
          >
            Clear Favorites
          </button>
        </div>
      </span>
      <i class="fas fa-heart mr-2"></i>
      <span class="font-bold text-xl">{favoriteItems().length}</span>
    </div>
  </div>
);
