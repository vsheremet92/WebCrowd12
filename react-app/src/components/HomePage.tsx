import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import type { Item } from "../item";

export const HomePage: React.FunctionComponent<{
  items: Item[];
  onAddToFavoriteItems: (item: Item) => void;
  search: string;
}> = ({ items, onAddToFavoriteItems, search }) => {

  const filteredItems = useMemo(
    () =>
      (items ?? []).filter(
        (item) =>
          item.text
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          item.owner.firstName
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
      ),
    [items, search]
  );

  return (
    <div className="grid grid-cols-5">
      {filteredItems.map((item) => (
        <Link
          to={`/detail/${item.id}`}
          key={item.id}
          className="m-2 border border-1 border-blue-600 rounded-t-lg bg-green-500"
        >
          <h4 className="title font-bold truncate w-full max-w-full py-2 px-4 text-white">
            {`${item.owner.firstName} ${item.owner.lastName}`}
          </h4>
          <div className="bg-white p-3">
            <div className="w-full flex justify-center">
              <img src={item.image} alt={item.text} className="h-32" />
            </div>
            <div>
              <div className="text-lg overflow-ellipsis description">
                {item.text}
              </div>
              <div className="mt-4 mb-10 flex">
                <div className="mr-2">Tags:</div>
                {
                  item.tags.map(tag => <div key={tag} className="text-md bg-red-800 px-2 text-white mr-2">{tag}</div>
                  )
                }
              </div>
              <button
                onClick={(evt) => {
                  evt.stopPropagation();
                  onAddToFavoriteItems(item);
                }}
                className="text-lg px-8 py-1 font-bold bg-green-800 text-white rounded-full"
              >
                <i className="fas fa-heart mr-2"></i>
                Add To Favorites
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
