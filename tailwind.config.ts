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
          white: '#ffffff',
          default: '#32373e',
        },
        assistive: {
          base: '#f7f7f7',
          alternative: '#e8eaea',
          divider: '#cbd0d7',
          default: '#b2b6be',
          strong: '#778292',
          detail: '#49505a',
        },
        primary: {
          base: '#EDF0FD',
          alternative: '#A8B9F5',
          normal: '#7B93F0',
          strong: '#4D6EEA',
          default: '#204AE5',
        },
        secondary: {
          base: '#E0FAF2',
          strong: '#22D39E',
          default: '#1BA77D',
        },
        accent: {
          base: '#FEECF0',
          normal: '#F77394',
          strong: '#F4436F',
          error: '#F1134B',
        },
        highlight: {
          base: '#FFF0D1',
          normal: '#FFBD38',
          strong: '#FFAD05',
        },
        information: {
          base: '#DEF4FD',
          normal: '#AEE5F9',
          strong: '#119ACB',
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
