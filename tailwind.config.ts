import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      music: {
        100: '#E9F6FC',
        200: '#BEE6FF',
        300: '#38BDF8',
        400: '#3FA4F4',
        500: '#1D85E6',
        600: '#1764C0',
        700: '#015C93',
      },
      // ...
    },
  },
  plugins: [],
};
export default config;
