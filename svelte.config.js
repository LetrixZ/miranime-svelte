const sveltePreprocess = require('svelte-preprocess');
const tailwind = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
    preprocess: sveltePreprocess({
      postcss: {
        plugins: [
          tailwind,
          autoprefixer
        ]
      }
    })
};