const downloadButton = document.querySelector('.head-text-button');
const loaderOverlay = document.querySelector('.loader-overlay');

downloadButton.addEventListener('click', () => {
  loaderOverlay.style.display = 'flex';
});
