module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#0f172a',
        accent: '#7c3aed',
        surface: '#f8fafc',
        studentBlue: '#3b82f6',
        studentPink: '#fb7185',
        studentYellow: '#f59e0b',
        studentGreen: '#10b981'
      },
      fontFamily: {
        sans: ['Segoe UI', 'Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
