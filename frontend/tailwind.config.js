/** @type {import('tailwindcss').Config} */

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            screens: {
                tn: { max: '426px' }, // <= 426px
                sm: { max: '767px' }, // <= 767px
                lg: { min: '768px' }, // >= 768px
            },
            colors: {
                blue: 'var(--blue-primary)',
                gray: 'var(--border)',
                hover: 'var(--hover)',
            },
        },
    },
    plugins: [],
};
