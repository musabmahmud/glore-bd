/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundColor: {
                pink: '#C43882'
            },
            colors: {
                pink: '#C43882'
            }
        },
    },
    plugins: [],
}