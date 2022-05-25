//------------------ COLOR-CARD ------------------

window.addEventListener('load', function () {
  const fac = new FastAverageColor(),
        containerImg = document.querySelector('.color-card__img'),
        gradient = document.querySelector('.color-card__img ~ .color-card__gradient'),

        color = fac.getColor(containerImg.querySelector('img'));

  gradient.style.background = `linear-gradient(rgba(0,0,0,0.44), ${color.rgb} 100%`;
});
