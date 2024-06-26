<script lang="ts">
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import { onDestroy } from 'svelte';
	import type { PageData } from './$types';
	import Header from '../../components/Header.svelte';
	import Footer from '../../components/Footer.svelte';
	import SectionWrapper from '../../components/SectionWrapper.svelte';

	export let data: PageData;

	type Manager = {
		Location: string;
		Name: string;
		Approval: string;
		Wave: string;
		Invites: number;
		searchTerms: string;
	};

	const searchProducts: Manager[] = data.managers.map((managers: Manager) => ({
		...managers,
		searchTerms: `${managers.Location} ${managers.Name} ${managers.Approval} ${managers.Wave} ${managers.Invites}`
	}));

	const searchStore = createSearchStore(searchProducts);
	export { searchStore };

	const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

	onDestroy(() => {
		unsubscribe();
	});
</script>

<SectionWrapper>
	<main>
		<Header />
		<div
			class="hero min-h-screen text-primary-content"
			style="background-image: url(https://mma.prnewswire.com/media/1163548/Westgate_Resorts_Logo.jpg?p=facebook);"
		>
			<div class="hero-overlay bg-opacity-70" />
			<div class="hero-content text-center">
				<div class="max-w-md">
					<h1 class="mb-5 text-5xl font-bold">Managers</h1>
					<p class="mb-5 text-lg">
						This is the Managers page. Here you can search for managers and view their details. For
						example, you can search for a manager by typing their name "Todd" or location "Las
						Vegas". The list is stored in local storage, nothing is online.
					</p>
					<div class="container">
						<label class="input input-bordered flex items-center gap-2">
							<input
								type="search"
								class="grow text-black"
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
						<div class="p-2 text-black">
							<button class="btn btn-primary" onclick="my_modal_3.showModal() "> Submit</button>
							<dialog id="my_modal_3" class="modal">
								<div class="modal-box min-w-[1200px]">
									<div>
										<div class="product">
											<div class="relative overflow-x-auto">
												<table class="table table-lg">
													<!-- head -->
													<thead class="border-b min-h-[200px]">
														<tr class="text-lg">
															<th>Location</th>
															<th>Name</th>
															<th class=" text-sm"
																>DEPOSITS UNDER $40.00, TWIST TOURS,
																<br /> TAXI REIMBURSEMENT AND ANY APPROVAL
															</th>
															<th class=" text-sm"
																>OPEN/CLOSE WAVE
																<br /> /SINGLE OVERBOOK
															</th>
															<th class=" text-sm">ALLOWED TO MAKE CHANGES TO INVITES </th>
														</tr>
													</thead>
													{#each $searchStore.filtered as manager}
														<tbody class="dark:bg-primary-content dark:border-accent-content">
															<!-- row 1 -->
															<tr>
																<td>{manager.Location}</td>
																<td class="max-w-1.5">{manager.Name}</td>
																<td class="max-w-1.5">{manager.Approval}</td>
																<td class="max-w-1.5">{manager.Wave}</td>
																<td class="max-w-1.5">{manager.Invites}</td>
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
