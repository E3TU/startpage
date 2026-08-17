export type BackgroundType = 'color' | 'svg';

export const background = $state<{
	type: BackgroundType;
}>({
	type: 'color'
});
