import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import type { Item } from "../item";

export const ItemDetail: React.FunctionComponent<{
  items: Item[];
  onAddToFavoriteItems: (item: Item) => void;
}> = ({ items, onAddToFavoriteItems }) => {
  const { id } = useParams<{
    id: string;
  }>();

  const item = useMemo(
    () => (items ?? []).find((p) => p.id === id),
    [items, id]
  );

  return (
    <div className="p-10">
      {item && (
        <>
          <h3 className="title font-bold text-3xl truncate w-full max-w-full mb-2">
            {`${item.owner.firstName} ${item.owner.lastName}`}
          </h3>
          <div className="grid grid-cols-2 gap-10">
            <div className="w-full flex justify-center">
              <img
                src={item.image}
                alt={item.owner.title}
                className="text-center"
              />
            </div>
            <div className="bg-white p-3">
              <div>
                <div className="text-lg description">
                  {item.text}
                </div>
                <div className="flex flex-row">
                  <div className="mt-4 mb-10 flex">
                    <div className="mr-2">Tags:</div>
                    {
                      item.tags.map(tag => <div className="text-md bg-red-800 px-2 text-white mr-2">{tag}</div>
                      )
                    }
                  </div>
                </div>
                <button
                    onClick={(evt) => {
                      evt.stopPropagation();
                      onAddToFavoriteItems(item);
                    }}
                    className="text-xl px-8 py-1 font-bold bg-blue-800 mt-5 text-white rounded-full"
                  >
                    <i className="fas fa-heart mr-2"></i>
                    Add To Favorites
                  </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
