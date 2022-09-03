/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                'jansen-purple': '#270d5b',
                'jansen-yellow': '#e9c142'
            },
            boxShadow: {
                'quiz': '2px 2px 3px #888'
            }
        },
    },
    plugins: [],
}
