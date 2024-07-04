import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/flowbite-react/**/*.js',
    ],
    darkMode: 'class', 
    theme: {
        extend: {
            colors: {
                'dark': '#232A3C',
                'medium': '#293245',
                900: '#121212', // Very dark gray
                800: '#1E1E1E', // Near black
                700: '#2C2C2C', // Charcoal

            }
        },
    },
    plugins: [require('flowbite/plugin')],
}
export default config;
