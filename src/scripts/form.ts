const form = document.getElementById('contact-form') as HTMLFormElement;
const message = document.getElementById('form-message') as HTMLTextAreaElement;
const button = document.getElementById('form-button') as HTMLButtonElement;
const counter = document.getElementById('counter') as HTMLParagraphElement;

const refreshCounter = () => {
  const messageLength = message.value.length;
  const messageMaxLength = message.maxLength;

  const lengthInformation = `${messageLength}/${messageMaxLength}`;
  const lengthInformationNode = document.createTextNode(lengthInformation);

  counter.innerHTML = '';
  counter.appendChild(lengthInformationNode);
};

refreshCounter();

export const executeForm = () => {
  message.addEventListener('input', () => {
    refreshCounter();
  });

  form.addEventListener(
    'input',
    () => (button.style.transform = form.checkValidity() ? 'translateY(0)' : 'translateY(80px)')
  );
};
