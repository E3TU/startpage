export let menu = $state({open: false});

export function toggleMenu() {
	menu.open = !menu.open;
}
