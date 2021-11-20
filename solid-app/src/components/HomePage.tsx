import { Component, createMemo, For } from "solid-js";
import { Link } from "solid-app-router";
import type { Item } from "../item";
import { search, items, onAddToFavoriteItems } from "../store";

export const HomePage: Component = () => {

	const filteredItems = createMemo(
		() =>
			items().filter(
				(item) =>
					item.text
						.toLocaleLowerCase()
						.includes(search().toLocaleLowerCase()) ||
					item.owner.firstName
						.toLocaleLowerCase()
						.includes(search().toLocaleLowerCase())
			)
	);

	return (
		<div class="grid grid-cols-5">
			<For each={filteredItems()}>
				{(item) => (
					<Link
						href={`/detail/${item.id}`}
						class="m-2 border border-1 border-blue-600 rounded-t-lg bg-green-500"
					>
						<h4 class="title font-bold truncate w-full max-w-full py-2 px-4 text-white">
							{`${item.owner.firstName} ${item.owner.lastName}`}
						</h4>
						<div class="bg-white p-3">
							<div class="w-full flex justify-center">
								<img src={item.image} alt={item.text} class="h-32" />
							</div>
							<div>
								<div class="text-lg overflow-ellipsis description">
									{item.text}
								</div>
								<div class="mt-4 mb-10 flex">
									<div class="mr-2">Tags:</div>
									<For each={item.tags}>
										{
											((tag: string) => <div class="text-md bg-red-800 px-2 text-white mr-2">{tag}</div>)
										}
									</For>
								</div>
								<button
									onClick={(evt) => {
										evt.preventDefault();
										onAddToFavoriteItems(item);
									}}
									class="text-lg px-8 py-1 font-bold bg-green-800 text-white rounded-full"
								>
									<i class="fas fa-heart mr-2"></i>
									Add To Favorites
								</button>
							</div>
						</div>
					</Link>
				)}
			</For>
		</div >
	);
};
