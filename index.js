//------------------ COLOR-CARD ------------------

window.addEventListener('load', function () {
  const fac = new FastAverageColor(),
        gradient = document.querySelector('.color-card__gradient'),
        color = fac.getColor(document.querySelector('img'));

  gradient.style.background = `linear-gradient(rgba(0,0,0,0.44), ${color.rgb} 100%`;
});
