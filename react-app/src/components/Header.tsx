import React from "react";
import { Link } from "react-router-dom";
import type { Item } from "../item";

export const Header: React.FunctionComponent<{
  favoriteItems: Item[];
  onClearFavoriteItems: () => void;
  search: string;
  onSetSearch: (search: string) => void;
}> = ({ favoriteItems, onClearFavoriteItems, search, onSetSearch }) => (
  <div className="bg-green-900 text-white flex flex-row w-full py-4">
    <div className="text-2xl px-10 py-2">
      <Link to="/">
        Simple Demo Application
      </Link>
    </div>
    <div className="flex-grow">
      <input
        type="text"
        value={search}
        onChange={(evt) => onSetSearch(evt.target.value)}
        placeholder="Search by name or text..."
        className="p-2 text-xl bg-white text-black rounded-lg max-w-md w-96"
      />
    </div>
    <div className="px-10 py-2 justify-end has-tooltip">
      <span className="tooltip cart">
        <div>Favorites: ({(favoriteItems ?? []).length})</div>
        {favoriteItems?.map((i, index) => (
          <div key={`${i.id}${index}`} className="flex flex-row my-2">
            <img src={i.image} alt="img" className="h-8 mr-2" />
            <h3 className="title text-md truncate flex-grow">{i.text}</h3>
          </div>
        ))}
        <div className="flex">
          <button
            onClick={onClearFavoriteItems}
            className="text-md px-8 py-1 mt-5 font-bold bg-green-800 text-white rounded-full"
          >
            Clear Favorites
          </button>
        </div>
      </span>
      <i className="fas fa-heart mr-2"></i>
      <span className="font-bold text-xl">{(favoriteItems ?? []).length}</span>
    </div>
  </div>
);
