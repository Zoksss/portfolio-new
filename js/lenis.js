
window.addEventListener('DOMContentLoaded', () => {
  // Inicijalizacija Lenis
  const lenis = new Lenis({
    duration: 1.2,
    easing: t => 1 - Math.pow(1 - t, 4),
    smooth: true,
  });

  // Scroll loop koji pokreće Lenis i poziva onScroll
  function raf(time) {
    lenis.raf(time);
    onScroll();
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Selektuj sve linkove sa data-scroll-to
  const navLinks = document.querySelectorAll('a[data-scroll-to]');
  console.log('Nađeno linkova:', navLinks.length);

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      console.log('Klik na link:', link);

      const targetId = link.getAttribute('data-scroll-to');
      const target = document.getElementById(targetId);
      if (!target) {
        console.log('Cilj nije pronađen:', targetId);
        return;
      }

      history.pushState(null, null, `#${targetId}`);

      lenis.scrollTo(target, {
        offset: -80,
        duration: 1.4,
        easing: t => 1 - Math.pow(1 - t, 4),
      });

      // Zatvori mobilni meni ako je otvoren (provera po klasi w--open ili aria-expanded)
      const navToggle = document.querySelector('.menu-button');
      if (navToggle) {
        const isOpenClass = navToggle.classList.contains('w--open');
        const isOpenAria = navToggle.getAttribute('aria-expanded') === 'true';

        console.log('Meni otvoren (klasa):', isOpenClass);
        console.log('Meni otvoren (aria):', isOpenAria);

        if (isOpenClass || isOpenAria) {
          console.log('Klikćem toggle dugme da zatvorim meni');
          setTimeout(() => {
            navToggle.click();
          }, 50);
        }
      }
    });
  });

  // Sekcije za scroll spy
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    let scrollPosition = window.scrollY + 100; // prilagodi po potrebi

    sections.forEach(section => {
      if (
        scrollPosition >= section.offsetTop &&
        scrollPosition < section.offsetTop + section.offsetHeight
      ) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('data-scroll-to') === section.id);
        });
      }
    });
  }
});