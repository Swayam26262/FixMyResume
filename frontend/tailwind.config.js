/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'fade-in-right': 'fade-in-right 0.8s ease-out forwards',
        gradient: 'gradient 5s ease infinite',
        'bounce-subtle': 'bounce-subtle 2s infinite ease-in-out',
        'spin-slow': 'spin 3s linear infinite',
        'progress-fill': 'progress-fill 1s ease-out forwards',
        twinkle: 'twinkle 1.5s infinite ease-in-out',
        float: 'float 4s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 2s infinite ease-in-out',
        'count-up': 'countUp 0.8s ease-out forwards',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-right': {
            '0%': { opacity: '0', transform: 'translateX(-20px)' },
            '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        gradient: {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'progress-fill': {
          '0%': { width: '0%' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        float: {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-subtle': {
            '0%, 100%': { opacity: '1' },
            '50%': { opacity: '0.7' },
        },
        countUp: {
          'from': { opacity: '0', transform: 'scale(0.5)' },
          'to': { opacity: '1', transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        'conic-gradient': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animationDelay: {
        100: '100ms',
        200: '200ms',
        300: '300ms',
        400: '400ms',
        500: '500ms',
        600: '600ms',
        700: '700ms',
        800: '800ms',
        900: '900ms',
        1000: '1000ms',
      },
    },
  },
  plugins: [
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'animation-delay': (value) => ({
            'animation-delay': value,
          }),
        },
        { values: theme('animationDelay') }
      );
    },
  ],
};
