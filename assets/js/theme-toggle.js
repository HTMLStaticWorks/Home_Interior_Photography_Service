/* 
   Home Interior & Architectural Photography Template
   ThemeForest Premium Commercial Quality
   Theme & RTL Toggle System (theme-toggle.js)
*/

(function () {
  // Check theme mode preference
  const savedTheme = localStorage.getItem('theme-mode');
  const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  let theme = 'light';
  if (savedTheme) {
    theme = savedTheme;
  } else if (userPrefersDark) {
    theme = 'dark';
  }
  document.documentElement.setAttribute('data-theme', theme);

  // Check RTL preference
  const savedRtl = localStorage.getItem('rtl-mode');
  if (savedRtl === 'true') {
    document.documentElement.setAttribute('dir', 'rtl');
  }
})();

// Bind toggle button click listeners once DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  const themeToggler = document.getElementById('themeToggler');
  const rtlToggler = document.getElementById('rtlToggler');
  
  // Theme Toggle listener
  if (themeToggler) {
    themeToggler.addEventListener('click', function () {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme-mode', newTheme);
      this.setAttribute('aria-label', `Switch to ${newTheme === 'light' ? 'dark' : 'light'} mode`);
    });
  }

  // RTL Toggle listener
  if (rtlToggler) {
    rtlToggler.addEventListener('click', function () {
      const currentDir = document.documentElement.getAttribute('dir');
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      if (newDir === 'rtl') {
        document.documentElement.setAttribute('dir', 'rtl');
        localStorage.setItem('rtl-mode', 'true');
      } else {
        document.documentElement.removeAttribute('dir');
        localStorage.setItem('rtl-mode', 'false');
      }
    });
  }
});
