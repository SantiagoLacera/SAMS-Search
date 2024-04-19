import type { PageServerLoad } from './$types';
import greeters from '../../../static/greeters.json';

export const load: PageServerLoad = async () => {
	const getProducts = async () => {
		const data = greeters;
		return data.Greeters;
	};

	return {
		greeters: getProducts()
	};
};
