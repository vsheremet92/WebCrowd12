import { Component, createMemo, Show } from "solid-js";
import { useParams } from "solid-app-router";
import type { Item } from "../item";
import { items, onAddToFavoriteItems } from "../store";

export const ItemDetail: Component = () => {
	const { id } = useParams<{
		id: string;
	}>();

	const item = createMemo(
		() => items().find((i) => i.id === id)
	);

	return (
		<div class="p-10">
			<Show when={item()} fallback={<div>Loading...</div>}>
				<>
					<h3 class="title font-bold text-3xl truncate w-full max-w-full mb-2">
						{`${item().owner.firstName} ${item().owner.lastName}`}
					</h3>
					<div class="grid grid-cols-2 gap-10">
						<div class="w-full flex justify-center">
							<img
								src={item().image}
								alt={item().owner.title}
								class="text-center"
							/>
						</div>
						<div class="bg-white p-3">
							<div>
								<div class="text-lg description">
									{item().text}
								</div>
								<div class="flex flex-row">
									<div class="mt-4 mb-10 flex">
										<div class="mr-2">Tags:</div>
										{
											item().tags.map(
												tag => <div class="text-md bg-red-800 px-2 text-white mr-2">{tag}</div>
											)
										}
									</div>
								</div>
								<button
									onClick={(evt) => {
										evt.preventDefault();
										onAddToFavoriteItems(item());
									}}
									class="text-xl px-8 py-1 font-bold bg-blue-800 mt-5 text-white rounded-full"
								>
									<i class="fas fa-heart mr-2"></i>
									Add To Favorites
								</button>
							</div>
						</div>
					</div>
				</>
			</Show>
		</div>
	);
};
