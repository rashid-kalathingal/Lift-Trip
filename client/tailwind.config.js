/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-purple': '#081A51',
        'light-white' : 'rgba(255,255,255,0.17)',
      },
       height: {
        '128': '32rem', // 512px
        '144': '36rem', // 576px
        // Add more custom heights as needed
      },
      
    },
  },
  plugins: [],
  // Define the animation using @keyframes
  corePlugins: {
    animation: false, // Disable default animations to define custom ones
  },
  keyframes: {
    shimmer: {
      '0%': { backgroundPosition: '-1000px 0' },
      '100%': { backgroundPosition: '1000px 0' },
    },
  },
  animations: {
    shimmer: 'shimmer 1s infinite', // Use the keyframes to define the animation
  },
}

