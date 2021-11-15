// import { writable } from "svelte/store";
// export const darkMode = writable(localStorage.getItem('useDark') === 'true' || false)

// darkMode.subscribe(v => localStorage.setItem('useDark', v))

import { writable } from 'svelte/store';

const createWritableStore = (key, startValue) => {
    const { subscribe, set } = writable(startValue);

    return {
        subscribe,
        set,
        useLocalStorage: () => {
            const json = localStorage.getItem(key);
            if (json) {
                set(JSON.parse(json));
            }

            subscribe(current => {
                localStorage.setItem(key, JSON.stringify(current));
            });
        }
    };
}

export const theme = createWritableStore('theme', 'light');

export const modalStatus = writable({ open: false, visible: false, redirect: false })

export const loadedItems = writable({ data: null, options: {} });

export const genreCollapse = writable(true);

export const pageName = writable("");