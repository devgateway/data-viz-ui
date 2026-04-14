/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sui: ['Lato', "'Helvetica Neue'", 'Arial', 'Helvetica', 'sans-serif'],
      },
      colors: {
        // Brand palette — exact SUI hex values
        'sui-blue':          '#2185d0',
        'sui-blue-hover':    '#1678c2',
        'sui-blue-focus':    '#0d71bb',
        'sui-blue-active':   '#1a69a4',
        'sui-green':         '#21ba45',
        'sui-green-hover':   '#16ab39',
        'sui-green-active':  '#198f35',
        'sui-red':           '#db2828',
        'sui-red-hover':     '#d01919',
        'sui-red-active':    '#b21e1e',
        'sui-orange':        '#f2711c',
        'sui-orange-hover':  '#f26202',
        'sui-yellow':        '#fbbd08',
        'sui-yellow-hover':  '#eaae00',
        'sui-teal':          '#00b5ad',
        'sui-teal-hover':    '#009c95',
        'sui-violet':        '#6435c9',
        'sui-violet-hover':  '#5829bb',
        'sui-purple':        '#a333c8',
        'sui-purple-hover':  '#9627ba',
        'sui-olive':         '#b5cc18',
        'sui-brown':         '#a5673f',
        'sui-grey':          '#767676',
        'sui-black':         '#1b1c1d',
        // Default (uncoloured) button
        'sui-btn':           '#e0e1e2',
        'sui-btn-hover':     '#cacbcd',
        'sui-btn-active':    '#babbbc',
        // Secondary (dark) button
        'sui-btn-secondary': '#1b1c1d',
        'sui-btn-secondary-hover': '#27292a',
        // Label default
        'sui-label-bg':      '#e8e8e8',
        // Semantic text hierarchy
        'sui-text':          'rgba(0,0,0,.87)',
        'sui-subtext':       'rgba(0,0,0,.6)',
        'sui-disabled-text': 'rgba(34,36,38,.5)',
        'sui-placeholder':   'rgba(191,191,191,.87)',
        // Borders
        'sui-border':        'rgba(34,36,38,.15)',
        'sui-border-hover':  'rgba(34,36,38,.3)',
        'sui-border-strong': 'rgba(34,36,38,.35)',
        // Form states
        'sui-focus-border':  '#85b7d9',
        'sui-checkbox-border': '#d4d4d5',
        'sui-checkbox-focus':  '#96c8da',
        'sui-error-bg':      '#fff6f6',
        'sui-error-border':  '#e0b4b4',
        'sui-error-text':    '#9f3a38',
      },
      borderRadius: {
        'sui':    '.28571429rem',
        'sui-sm': '.21428571rem',
      },
      maxWidth: {
        container: '1200px',
        'text-container': '700px',
      },
      boxShadow: {
        'segment':           '0 1px 2px 0 rgba(34,36,38,.15)',
        'segment-hover':     '0 2px 4px 0 rgba(34,36,38,.12), 0 2px 10px 0 rgba(34,36,38,.08)',
        'sui-modal':         '1px 3px 3px 0 rgba(0,0,0,.2), 1px 3px 15px 2px rgba(0,0,0,.2)',
        'sui-btn':           '0 0 0 1px transparent inset, 0 0 0 0 rgba(34,36,38,.15) inset',
        'sui-dropdown':      '0 2px 3px 0 rgba(34,36,38,.15)',
        'sui-message':       '0 0 0 1px rgba(34,36,38,.22) inset, 0 0 0 0 transparent',
        'sui-msg-positive':  '0 0 0 1px #a3c293 inset, 0 0 0 0 transparent',
        'sui-msg-negative':  '0 0 0 1px #e0b4b4 inset, 0 0 0 0 transparent',
        'sui-msg-warning':   '0 0 0 1px #c9ba9b inset, 0 0 0 0 transparent',
        'sui-msg-info':      '0 0 0 1px #a9d5de inset, 0 0 0 0 transparent',
      },
      fontSize: {
        'sui-mini':    ['0.6875rem',    { lineHeight: '1em' }],
        'sui-tiny':    ['0.75rem',      { lineHeight: '1em' }],
        'sui-small':   ['0.85714286rem',{ lineHeight: '1em' }],
        'sui-base':    ['1rem',         { lineHeight: '1.4285em' }],
        'sui-large':   ['1.14285714rem',{ lineHeight: '1.4285em' }],
        'sui-big':     ['1.28571429rem',{ lineHeight: '1.4285em' }],
        'sui-huge':    ['1.42857143rem',{ lineHeight: '1.4285em' }],
        'sui-massive': ['1.71428571rem',{ lineHeight: '1.4285em' }],
      },
      transitionDuration: {
        'sui': '100ms',
      },
      transitionTimingFunction: {
        'sui': 'ease',
      },
    },
  },
  plugins: [],
};
