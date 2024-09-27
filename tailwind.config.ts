/** @type {import("tailwindcss").Config} */

module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    screens: {
      mobile: { max: '767.9px' }, // Mobile: 360px ~ 767px
      tablet: { min: '768px', max: '1279.9px' }, // Tablet: 768px ~ 1279px
      desktop: { min: '1280px' }, // Desktop: 1280px ~ 1920px
    },
    fontFamily: {
      pretendard: ['Pretendard'],
    },
    extend: {
      colors: {
        static: {
          white: 'var(--neutral-0)',
          default: 'var(--neutral-90)',
        },
        assistive: {
          base: 'var(--neutral-5)',
          alternative: 'var(--neutral-10)',
          divider: 'var(--neutral-20)',
          default: 'var(--neutral-30)',
          strong: 'var(--neutral-50)',
          detail: 'var(--neutral-70)',
        },
        primary: {
          base: 'var(--blue-5)',
          alternative: 'var(--blue-20)',
          normal: 'var(--blue-30)',
          strong: 'var(--blue-40)',
          default: 'var(--blue-50)',
        },
        secondary: {
          base: 'var(--green-5)',
          strong: 'var(--green-50)',
          default: 'var(--green-60)',
        },
        accent: {
          base: 'var(--system-color-red-5)',
          normal: 'var(--system-color-red-30)',
          strong: 'var(--system-color-red-40)',
          error: 'var(--system-color-red-50)',
        },
        highlight: {
          base: 'var(--system-color-orange-10)',
          normal: 'var(--system-color-orange-40)',
          strong: 'var(--system-color-orange-50)',
        },
        information: {
          base: 'var(--system-color-blue-10)',
          normal: 'var(--system-color-blue-20)',
          strong: 'var(--system-color-blue-60)',
        },
        effect: {
          elevated: 'rgba(71, 71, 82, 0.5)',
          gradient: 'rgba(71, 71, 82, 0.2)',
          shadow: 'rgba(70, 69, 107, 0.1)',
        },
      },
      fontFamily: {
        pretendard: ['Pretendard'],
      },
      fontSize: {
        // Display styles
        'display-lg': '66px',
        'display-lg-m': '40px',

        'display-base': '50px',
        'display-base-m': '32px',

        'display-sm': '40px',
        'display-sm-m': '25px',

        // Heading styles
        'heading-lg': '50px',
        'heading-lg-m': '40px',

        'heading-base': '40px',
        'heading-base-m': '32px',

        'heading-sm': '32px',
        'heading-sm-m': '25px',

        // Title styles
        'title-2xl': '32px',
        'title-2xl-m': '25px',

        'title-xl': '25px',
        'title-xl-m': '21px',

        'title-lg': '21px',
        'title-lg-m': '19px',

        'title-base': '19px',
        'title-base-m': '17px',

        'title-sm': '17px',
        'title-sm-m': '15px',

        'title-xs': '15px',
        'title-xs-m': '13px',

        // Body styles
        'body-lg': '19px',
        'body-lg-m': '17px',

        'body-base': '17px',
        'body-base-m': '15px',

        'body-sm': '15px',
        'body-sm-m': '13px',

        // Detail styles
        'detail-xl': '19px',
        'detail-xl-m': '17px',

        'detail-lg': '17px',
        'detail-lg-m': '15px',

        'detail-base': '15px',
        'detail-base-m': '13px',

        'detail-sm': '13px',
        'detail-sm-m': '11px',

        // Label styles
        'label-lg': '19px',
        'label-lg-m': '15px',

        'label-base': '17px',
        'label-base-m': '13px',

        'label-sm': '15px',
        'label-sm-m': '11px',

        'label-xs': '13px',
        'label-xs-m': '9px',

        // Links styles
        'links-lg': '19px',
        'links-lg-m': '17px',

        'links-base': '17px',
        'links-base-m': '15px',

        'links-sm': '15px',
        'links-sm-m': '13px',
      },
      spacing: {
        '0': '0px',
        '1': '2px',
        '2': '4px',
        '3': '8px',
        '4': '12px',
        '5': '16px',
        '6': '20px',
        '7': '24px',
        '8': '32px',
        '9': '40px',
        '10': '48px',
        '11': '64px',
        '12': '80px',
      },
      borderRadius: {
        '0': '0px',
        '1': '2px',
        '2': '4px',
        '3': '6px',
        '4': '8px',
        '5': '12px',
        '6': '16px',
        '7': '20px',
        '8': '24px',
        '9': '40px',
        '10': '1000px',
      },
      boxShadow: {
        default: 'inset 0 0 0 1px #b2b6be',
        default2: 'inset 0 0 0 2px #b2b6be',
        tab: 'inset -1px -1px 0 1px #778292',
        focus: 'inset 0 0 0 2px #204AE5',
        error: 'inset 0 0 0 2px #F1134B',
        assistive: 'inset 0 0 0 2px #778292',
        shadow: '0px 4px 4px 0px rgba(70, 69, 107, 0.10)',
        banner: '0px 0px 20px 0px rgba(70, 69, 107, 0.15)',
      },
      dropShadow: {
        shadow: '0 8px 10px rgba(70, 69, 107, 0.10)',
        fab: '0 0 15px rgba(70, 69, 107, 0.10)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar-hide')],
};
