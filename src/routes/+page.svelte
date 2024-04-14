<script lang="ts">
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import { onDestroy } from 'svelte';
	import type { PageData } from './$types';
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	import SectionWrapper from '../components/SectionWrapper.svelte';

	export let data: PageData;

	type Gift = {
		Location: string;
		Description: string;
		PLU: string;
		Price: number;
		Cost: string;
		searchTerms: string;
	};

	const searchProducts: Gift[] = data.gifts.map((gift: Gift) => ({
		...gift,
		searchTerms: `${gift.Location} ${gift.Description} ${gift.PLU} ${gift.Price} ${gift.Cost}`
	}));

	const searchStore = createSearchStore(searchProducts);
	export { searchStore };

	const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

	onDestroy(() => {
		unsubscribe();
	});

	function loading() {
		const loading = document.getElementById('loading');
		loading?.classList.remove('hidden');
		setTimeout(() => {
			loading?.classList.add('hidden');
		}, 3000);
	}
</script>

<SectionWrapper>
	<main>
		<Header />
		<div
			class="hero min-h-screen"
			style="background-image: url(https://mma.prnewswire.com/media/1163548/Westgate_Resorts_Logo.jpg?p=facebook);"
		>
			<div class="hero-overlay bg-opacity-70" />
			<div class="hero-content text-center">
				<div class="max-w-md">
					<h1 class="mb-5 text-5xl font-bold">Welcome!!!</h1>
					<p class="mb-5 text-lg">
						This is a simple gift-list app that I made for work. It's a work in progress, but it's
						functional. You can search gifts by typing the name of the Item or Location. For Example
						"Smoky" or "VLT".The list is stored in local storage, nothing is online.
					</p>
					<div class="container">
						<label class="input input-bordered flex items-center gap-2">
							<input
								type="search"
								class="grow"
								placeholder="Search..."
								bind:value={$searchStore.search}
							/>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								fill="currentColor"
								class="w-4 h-4 opacity-70"
								><path
									fill-rule="evenodd"
									d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
									clip-rule="evenodd"
								/></svg
							>
						</label>
						<!-- Open the modal using ID.showModal() method -->
						<div class="p-2">
							<button class="btn btn-primary" onclick="my_modal_3.showModal() "> Submit</button>
							<dialog id="my_modal_3" class="modal">
								<div class="modal-box  min-w-[900px]">
									<div>
										<div class="product">
											<div class="relative overflow-x-auto ">
												<table class="table table-lg">
													<!-- head -->
													<thead class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
														<tr class="text-lg">
															<th>Location</th>
															<th>PLU</th>
															<th>Description</th>
															<th>$Price</th>
															<th>$Cost</th>
														</tr>
													</thead>
													{#each $searchStore.filtered as gift}
														<tbody class="bg-primary-content">
															<!-- row 1 -->
															<tr>
																<td>{gift.Location}</td>
																<td class="max-w-1.5 ">{gift.PLU}</td>
																<td class="max-w-1.5 ">{gift.Description}</td>
																<td class="max-w-1.5 ">{gift.Price}</td>
																<td class="max-w-1.5 ">{gift.Cost}</td>
															</tr>
														</tbody>
													{/each}
												</table>
											</div>
										</div>
									</div>
									<div class="modal-action">
										<form method="dialog">
											<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
												>✕</button
											>
										</form>
									</div>
								</div>
							</dialog>
						</div>
					</div>
				</div>
				<div />
			</div>
		</div>
		<Footer />
	</main>
</SectionWrapper>
