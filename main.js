/* ═══════════════════════════════════════════════════════════════
   iOS 液态玻璃风格 · 个人主页 · 交互逻辑
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const html = document.documentElement;
  const toggle = document.getElementById('modeToggle');
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const sections = document.querySelectorAll('section[id]');

  /* ── 深浅色模式切换 ── */

  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    html.classList.add('dark');
  }

  toggle.addEventListener('click', function () {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  /* ── 滚动监听：高亮当前导航项 ── */

  function updateActiveLink() {
    let current = 'home';
    const scrollY = window.scrollY + 120;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        current = section.getAttribute('id');
      }
    });

    sidebarLinks.forEach(function (link) {
      const target = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', target === current);
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  /* ── 侧边栏链接平滑滚动 ── */

  sidebarLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const id = this.getAttribute('href');
      const target = document.querySelector(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
