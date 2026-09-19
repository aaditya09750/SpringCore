import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0E1627',
          light: '#162238',
          surface: '#1E2D4A',
        },
        mauve: {
          DEFAULT: '#BD8E89',
          hover: '#AA7A75',
          soft: 'rgba(189, 142, 137, 0.15)',
        },
        prune: {
          DEFAULT: '#7F6269',
          dark: '#553E45',
          num: '#4C3C41',
        },
        pink: {
          DEFAULT: '#E5C5C1',
          soft: 'rgba(229, 197, 193, 0.2)',
        },
        blush: {
          DEFAULT: '#F4E1E0',
          light: '#FAF2F1',
          surface: '#FDF9F8',
        },
        page: '#F7F4F4',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        card: '14px',
        nav: '12px',
        btn: '9px',
        chip: '6px',
      },
      boxShadow: {
        nav: '0 4px 20px -2px rgba(14, 22, 39, 0.06), 0 2px 6px rgba(14, 22, 39, 0.03)',
        'card-light': '0 12px 36px -8px rgba(127, 98, 105, 0.09), 0 2px 8px rgba(14, 22, 39, 0.02)',
        'card-dark': '0 24px 56px -12px rgba(14, 22, 39, 0.45)',
        btn: '0 2px 8px rgba(14, 22, 39, 0.16)',
        'btn-hover': '0 6px 18px rgba(14, 22, 39, 0.25)',
      },
    },
  },
  plugins: [],
};

export default config;
