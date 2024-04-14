<script lang="ts">
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import { onDestroy } from 'svelte';
	import type { PageData } from './$types';
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	import SectionWrapper from '../components/SectionWrapper.svelte';
	import Hero from '../components/Hero.svelte';

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
</script>

<SectionWrapper>
	<main>
		<Header />
		<Hero />
		<div class="container">
			<h1>Search/Filter</h1>
			<input type="search" placeholder="Search..." bind:value={$searchStore.search} />
		</div>
		<div class="product-grid">
			{#each $searchStore.filtered as gift}
				<div class="product">
					<h2>{gift.Location}</h2>
					<h3>{gift.Description}</h3>
					<p>{gift.PLU}</p>
					<p class="badge">{gift.Price}</p>
					<p>{gift.Cost}</p>
				</div>
			{/each}
		</div>
		<Footer />
	</main>
</SectionWrapper>
