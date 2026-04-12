const SCROLL_DEBOUNCE_TIME = 20;

// Elements
const recommendationsScroll = document.getElementById('recommendations-scroll') as HTMLDivElement;
const recommendationsHouses = document.getElementById('recommendations-houses') as HTMLDivElement;
const allHouses = [...recommendationsScroll.children];
const slideRight = document.getElementById('slide-right') as HTMLButtonElement;
const slideLeft = document.getElementById('slide-left') as HTMLButtonElement;
const footerListSearch = document.getElementById('footer-list-search') as HTMLUListElement;
const recommendationsButtons = document.getElementById('recommendations-buttons') as HTMLDivElement;
let leftMargin = document.documentElement.clientWidth / 10;
let imageWidth = +recommendationsScroll.children[0].clientWidth;

const scrollHousesToBeginning = () => {
  recommendationsHouses.scrollTo({
    left: 0,
    behavior: 'auto',
  });
};

const checkButtons = () => {
  slideLeft.classList.toggle('recommendations--arrow-active', recommendationsHouses.scrollLeft > 0);

  slideRight.classList.toggle(
    'recommendations--arrow-active',
    recommendationsHouses.scrollLeft + recommendationsHouses.clientWidth < recommendationsHouses.scrollWidth
  );
};

const resetScroll = () => {
  scrollHousesToBeginning();

  checkButtons();
};

// filter buttons
const filterHousesByCategory = (selectedType: string) => {
  recommendationsScroll.innerHTML = '';

  Array.from(allHouses).forEach((house) => {
    const houseType = (house as HTMLElement).dataset.type;

    if (selectedType === 'house' || houseType === selectedType) {
      recommendationsScroll.appendChild(house);
    }
  });
};

const activateFilterButton = (type: string) => {
  Array.from(recommendationsButtons.children).forEach((button) => {
    const buttonElement = button as HTMLLIElement;
    const isActive = buttonElement.dataset.type === type;

    buttonElement.classList.toggle('recommendations--active', isActive);
  });
};

const filterHouses = (filter: HTMLButtonElement | HTMLLIElement) => {
  const type = filter.dataset.type as string;

  filterHousesByCategory(type);
  activateFilterButton(type);
  resetScroll();
};

export const executeRecommendations = () => {
  // recommendations
  let gap = parseFloat(getComputedStyle(recommendationsScroll).gap);

  // scrolling
  slideRight.addEventListener('click', () => {
    const scrollWidth = recommendationsScroll.scrollLeft === 0 ? leftMargin + imageWidth : imageWidth + gap;

    recommendationsHouses.scrollBy({
      left: scrollWidth,
      behavior: 'smooth',
    });
  });

  slideLeft.addEventListener('click', () => {
    let scrollWidth = slideRight.classList.contains('recommendations--arrow-active') ? imageWidth + gap : imageWidth;

    recommendationsHouses.scrollBy({
      left: -scrollWidth,
      behavior: 'smooth',
    });
  });

  // filter houses
  Array.from(recommendationsButtons.children)
    .filter((child) => child instanceof HTMLButtonElement)
    .forEach((button) => button.addEventListener('click', () => filterHouses(button)));

  let resizeTimeout: ReturnType<typeof setTimeout>;

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // debounce logic
      gap = parseFloat(getComputedStyle(recommendationsScroll).gap);
      imageWidth = +recommendationsScroll.children[0].clientWidth;
      leftMargin = document.documentElement.clientWidth / 10;
      resetScroll();
    }, SCROLL_DEBOUNCE_TIME);
  });

  recommendationsHouses.addEventListener('scroll', checkButtons);
};

export const executeFooter = () =>
  Array.from(footerListSearch.children)
    .filter((child) => child instanceof HTMLLIElement)
    .forEach((listElement) => listElement.addEventListener('click', () => filterHouses(listElement)));
