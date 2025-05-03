module.exports = {
  content: [
    "./resources/js/**/*.{js,jsx,ts,tsx}",       // ✅ Your React files
    "./node_modules/flowbite/**/*.js",           // ✅ Flowbite components
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),                  // ✅ Flowbite plugin
  ],
};