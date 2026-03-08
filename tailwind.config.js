/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        dm: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: '#FAF7F2',
        'warm-white': '#FFFEF9',
        sage: {
          DEFAULT: '#7C9A85',
          light: '#A8C5B0',
          dark: '#4A6B52',
        },
        terracotta: {
          DEFAULT: '#C4714A',
          light: '#E8956F',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E8C97A',
        },
        charcoal: '#2C2C2C',
        'mid-gray': '#6B6B6B',
        'light-gray': '#E8E4DE',
        border: '#D9D4CC',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        card: '0 4px 24px rgba(44,44,44,0.08)',
        'card-lg': '0 12px 48px rgba(44,44,44,0.12)',
        sage: '0 8px 24px rgba(74,107,82,0.3)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'slide-in': 'slideIn 0.3s ease',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { transform: 'translateX(100%)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
