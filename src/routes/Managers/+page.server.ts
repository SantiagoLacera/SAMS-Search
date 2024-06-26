import type { PageServerLoad } from './$types';
import managers from '../../../static/managers.json';

export const load: PageServerLoad = async () => {
	const getProducts = async () => {
		const data = managers;
		return data.Managers;
	};

	return {
		managers: getProducts()
	};
};
