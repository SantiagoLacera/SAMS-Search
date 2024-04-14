import type { PageServerLoad } from './$types';
import gifts from '../../static/gifts.json';

export const load: PageServerLoad = async () => {
	const getProducts = async () => {
		const res = await fetch('https://dummyjson.com/products');
		const data = gifts;
		return data.gifts;
	};

	return {
		gifts: getProducts()
	};
};
