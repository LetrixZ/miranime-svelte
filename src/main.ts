import App from './App.svelte';
import { initPathRouter } from '@bjornlu/svelte-router';
import routes from './routes';

initPathRouter(routes)

const app = new App({
	target: document.body,
});

export default app;