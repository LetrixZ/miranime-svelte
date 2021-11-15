const isProduction = !process.env.ROLLUP_WATCH;
const colors = require('tailwindcss/colors')

module.exports = {
    mode: 'jit',
    purge: {
        content: ["./src/**/*.svelte"],
        enabled: isProduction, // disable purge in dev
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        colors: {
            ...colors,
            primary: {
                light: '#f6685e',
                DEFAULT: '#F44336',
                dark: '#F44336'
            },
            dark: '#121212',
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
    future: {
        purgeLayersByDefault: true,
        removeDeprecatedGapUtilities: true,
    },
}