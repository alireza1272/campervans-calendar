/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            borderWidth: {
                'thin': '1px',
                'medium': '2px',
                'thick': '4px',
            },
            divideWidth: {
                'thin': '1px',
                'medium': '2px',
                'thick': '4px',
            },
        },
    },
    plugins: [],
}

