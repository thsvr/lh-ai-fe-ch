const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        'status-valid': '#22c55e',
        'status-valid-light': '#dcfce7',
        'status-valid-dark': '#166534',
        'status-warning': '#f59e0b',
        'status-warning-light': '#fef3c7',
        'status-warning-dark': '#92400e',
        'status-critical': '#ef4444',
        'status-critical-light': '#fee2e2',
        'status-critical-dark': '#991b1b',
      },
      boxShadow: {
        'panel': '0 0 40px -10px rgba(0, 0, 0, 0.1)',
        'citation': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'citation-hover': '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      const font = 'Georgia, Cambria, "Times New Roman", Times, serif';
      const typographyUtilities = {
        '.h1': {
          fontFamily: font,
          fontSize: '40px',
          fontWeight: '700',
          lineHeight: '1.2',
        },
        '.h2': {
          fontFamily: font,
          fontSize: '32px',
          fontWeight: '700',
          lineHeight: '1.25',
        },
        '.h3': {
          fontFamily: font,
          fontSize: '24px',
          fontWeight: '600',
          lineHeight: '1.3',
        },
        '.h4': {
          fontFamily: font,
          fontSize: '20px',
          fontWeight: '600',
          lineHeight: '1.4',
        },
        '.h5': {
          fontFamily: font,
          fontSize: '16px',
          fontWeight: '600',
          lineHeight: '1.4',
        },
        '.h6': {
          fontFamily: font,
          fontSize: '14px',
          fontWeight: '600',
          lineHeight: '1.4',
        },
        '.body1': {
          fontFamily: font,
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: '1.75',
        },
        '.body2': {
          fontFamily: font,
          fontSize: '14px',
          fontWeight: '400',
          lineHeight: '1.6',
        },
        '.body3': {
          fontFamily: font,
          fontSize: '12px',
          fontWeight: '400',
          lineHeight: '1.6',
        },
        '.caption': {
          fontFamily: font,
          fontSize: '12px',
          fontWeight: '300',
          lineHeight: '1.4',
        },
        '.label1': {
          fontFamily: font,
          fontSize: '14px',
          fontWeight: '600',
          lineHeight: '1.4',
        },
        '.label2': {
          fontFamily: font,
          fontSize: '12px',
          fontWeight: '500',
          lineHeight: '1.4',
        },
        '.blockquote': {
          fontFamily: font,
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: '1.7',
        },
      };
      addUtilities(typographyUtilities);
    }),
  ],
};
