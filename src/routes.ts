import type { RouteRecord } from "@bjornlu/svelte-router"

import Home from './pages/Home.svelte';
import Search from './pages/Search.svelte';
import Genre from './pages/Genre.svelte';
import GenreSelector from './pages/GenreSelector.svelte';
import NotFound from './pages/NotFound.svelte';

const routes: RouteRecord[] = [
  {
    path: '/genres', component: GenreSelector,
    children: [
      {
        path: '/:genre/:id?', component: Genre,
      },
    ]
  },
  {
    path: '/search', component: Search,
  },
  {
    path: '/browse', component: Home,
  },
  {
    path: '/item/:id', component: Home,
  },
  {
    component: NotFound, path: '*',
  }
]

export default routes