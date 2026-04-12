export const executeTour = () => {
  const tourImages = document.querySelectorAll('.tour__image') as NodeListOf<HTMLImageElement>; // non-dynamic
  const playButton = document.getElementById('play-button') as HTMLDivElement;
  const tourVideoPlaceholder = document.getElementById('tour-video-placeholder') as HTMLImageElement;
  const video = document.getElementById('video') as HTMLVideoElement;

  playButton.addEventListener('click', () => {
    tourVideoPlaceholder.style.display = 'none';
    video.style.display = 'inline';

    tourImages.forEach((image) => {
      const translateXValue = image.getAttribute('data-translate-value');

      image.style.transform = translateXValue ? `translateX(${translateXValue})` : ``;
    });

    video.play();
  });

  video.addEventListener('ended', () => {
    tourVideoPlaceholder.style.display = 'block';
    video.style.display = 'none';

    tourImages.forEach((image) => {
      image.style.transform = image.getAttribute('data-translate-value') ? 'translateX(0)' : '';
    });
  });
};
