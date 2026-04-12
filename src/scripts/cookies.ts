// cookies
const cookies = document.getElementById('cookies') as HTMLDivElement;
const cookiesClose = document.getElementById('cookies-close') as HTMLDivElement;

export const executeCookies = () => {
  cookiesClose.addEventListener('click', () => {
    localStorage.setItem('cookiesPopup', 'set');
    cookies.style.display = 'none';
  });

  document.addEventListener('DOMContentLoaded', function () {
    if (!localStorage.getItem('cookiesPopup')) {
      cookies.style.display = 'grid';
    }
  });
};
