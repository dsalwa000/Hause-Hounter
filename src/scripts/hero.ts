export const executeHero = () => {
  const arrowDown = document.getElementById('arrow-down') as HTMLDivElement;
  const navMobileList = document.getElementById('nav-mobile-list') as HTMLDivElement;
  const dropdownSelect = document.getElementById('dropdown-select') as HTMLSelectElement;
  const siteHeaderScroll = document.getElementById('site-header-scroll') as HTMLSelectElement;

  arrowDown.addEventListener('click', () => {
    const computedNavMobile = window.getComputedStyle(navMobileList);

    navMobileList.style.display = computedNavMobile.display === 'flex' ? 'none' : 'flex';
  });

  dropdownSelect?.addEventListener('mousedown', (event: Event) => {
    event.preventDefault();
  });

  // cards scrolling
  siteHeaderScroll.addEventListener('wheel', (event) => {
    event.preventDefault();

    siteHeaderScroll.scrollLeft += event.deltaX + event.deltaY;
  });
};
