const subscribeContainer = document.getElementById('subscribe-container') as HTMLButtonElement;
const subscribeButton = document.getElementById('subscribe-button') as HTMLButtonElement;
const subscribeForm = document.getElementById('subscribe-form') as HTMLFormElement;

// middle part
const subscribeHeading = document.getElementById('subscribe-heading') as HTMLHeadingElement;
const subscribeLoader = document.getElementById('subscribe-loader') as HTMLDivElement;

const startAnimation = (): void => {
  subscribeLoader.style.display = 'block';

  subscribeButton.disabled = true;
  subscribeButton.innerHTML = '';
};

const animateImages = (): void => subscribeContainer.classList.add('subscribe--container-active');

const endAnimation = (): void => {
  subscribeLoader.style.display = 'none';

  const textHeading = 'We have send you the confirmation email about the Subscription!';
  const textHeadingNode = document.createTextNode(textHeading);
  const textButton = 'Subscribed! 🔥';
  const textButtonNode = document.createTextNode(textButton);

  subscribeHeading.innerHTML = '';
  subscribeHeading.style.fontSize = '3rem';
  subscribeHeading.appendChild(textHeadingNode);

  subscribeButton.appendChild(textButtonNode);
};

export const executeSubscribe = () => {
  subscribeForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(subscribeForm);

    fetch('target/website', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data');
      })
      .catch((error) => {
        console.log('Error');
      });

    setTimeout(() => startAnimation(), 0);
    setTimeout(() => animateImages(), 1500);
    setTimeout(() => endAnimation(), 2800);
  });
};
