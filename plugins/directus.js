import { createDirectus, rest, readItem, readItems, updateItem } from '@directus/sdk';

const directus = createDirectus('https://api.snailpacegames.de').with(rest());

export default defineNuxtPlugin(() => {
	return {
		provide: { directus, readItem, readItems, updateItem },
	};
});