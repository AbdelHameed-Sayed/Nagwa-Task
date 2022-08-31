/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        // 16 column grid
        16: 'repeat(16, minmax(0, 1fr))',
      },
      gridColumnEnd: {
        // column grid end
        15: '15',
        16: '16',
        17: '17',
      },
      colors: {
        'nagwa-blue': '#026bb0',
        'nagwa-blue-hover': '#027ac9',
        'nagwa-green': '#78b517',
        'nagwa-green-hover': '#78c517',
        'nagwa-green-disabled': '#bcda8b',
      },
    },
  },
  plugins: [],
};
