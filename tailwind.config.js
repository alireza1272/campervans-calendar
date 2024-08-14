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
            colors: {
                'light-green': 'rgb(220 236 234)',
                'primary-green': 'rgb(107 187 174)',
            },
        },
    },
    plugins: [],
}

