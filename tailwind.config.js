/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'portfolio-navy': '#001F3F',
                'portfolio-ivory': '#FFFFF0',
                'portfolio-gold': '#D4AF37',
            },
            fontFamily: {
                'sans': ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
