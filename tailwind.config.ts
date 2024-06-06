import type {Config} from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  darkMode: 'selector',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/skeleton/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        ko: ['var(--ko)'],
        jp: ['var(--jp)'],
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      // black: colors.black,
      red: colors.red,
      orange: colors.orange,
      // white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      white: 'rgb(var(--white) / 1)',
      black: 'rgb(var(--black) / 1)',
      music: {
        basicgray: 'rgb(var(--basicgray) / 1)',
        background: 'rgb(var(--background) / 1)',
        lightgray: 'rgb(var(--lightgray) / 1)',
        bluegray: 'rgb(var(--bluegray) / 1)',
        darkgray: 'rgb(var(--darkgray) / 1)',
        blue: 'rgb(var(--blue) / 1)',
        lightblue: 'rgb(var(--lightblue) / 1)',
        orange: 'rgb(var(--orange) / 1)',
        lightorange: 'rgb(var(--lightorange) / 1)',
        focusblue: 'rgb(var(--focusblue) / 1)',
        subtitle: 'rgb(var(--subtitle) / 1)',
        disable: 'rgb(var(--disable) / 1)',
        textdisable: 'rgb(var(--textdisable) / 1)',
        skeleton: 'rgb(var(--skeleton) / 1)',
      },
    },
  },
};
export default config;
