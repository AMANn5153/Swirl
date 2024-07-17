/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-dark-blue': '#FFF7FC', 
        'blue': '#9290C3',
        'light-blue' : '#2D9596',
        'skin-blue':'#F0F3FF'
        // You can adjust this hex code to your desired dark blue
      },
      boxShadow:{
        'custom-box-shadow':'10px 100px 15px red',
      },
      scrollbarWidth:{
        'scroll':'none'
      }
    },
  },
  plugins: [    
    require('daisyui'),
  ],
}