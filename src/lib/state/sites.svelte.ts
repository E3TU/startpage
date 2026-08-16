export type PinnedSite = {
	title: string;
	link: string;
};

const defaultSites: PinnedSite[] = [
	{ title: 'Youtube', link: 'https://youtube.com' },
	{ title: 'Kick', link: 'https://kick.com' },
	{ title: 'Reddit', link: 'https://reddit.com' },
	{ title: 'Wikipedia', link: 'https://wikipedia.org' },
	{ title: 'Github', link: 'https://github.com' },
];

export const pinnedSites = $state<PinnedSite[]>(defaultSites);