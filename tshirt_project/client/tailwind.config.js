/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                summer: {
                    light: '#fef3c7', // amber-100
                    main: '#f59e0b', // amber-500
                    dark: '#b45309', // amber-700
                },
                winter: {
                    light: '#dbeafe', // blue-100
                    main: '#3b82f6', // blue-500
                    dark: '#1e40af', // blue-800
                }
            }
        },
    },
    plugins: [],
}
