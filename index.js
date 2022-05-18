const imgList = ["Hulk.png"];
const card = document.querySelectorAll(".color-card");

function cardGradient() {
  const el = document.createElement("div");
  el.className = "color-card__gradient";
  return el;
}

function img(params) {
  const el = document.createElement("img");
  el.className = "color-card__img";
  if (params.src) {
    el.src = params.src;
  }
  return el;
}

window.addEventListener("load", () => {
  for (let i = 0; i < card.length; i++) {
    const gradient = cardGradient();
    const cardImg = img({
      src: `./img/${imgList[i]}`,
    });
    card[i].appendChild(cardImg);
    card[i].appendChild(gradient);

    cardImg.addEventListener("load", () => {
      let rgb = getAverageRGB(cardImg);
      gradient.style.background = `linear-gradient(to top, rgba(${rgb.r}
        ,${rgb.g}
        ,${rgb.b}
        , 1), rgba(${rgb.r}
  ,${rgb.g}
  ,${rgb.b}
  , 0))`;

      function getAverageRGB(imgEl) {
        let blockSize = 5, // only visit every 5 pixels
          defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
          canvas = document.createElement("canvas"),
          context = canvas.getContext && canvas.getContext("2d"),
          data,
          width,
          height,
          i = -4,
          length,
          rgb = { r: 0, g: 0, b: 0 },
          count = 0;

        if (!context) {
          return defaultRGB;
        }

        height = canvas.height;
        width = canvas.width;

        context.drawImage(imgEl, 0, 0);

        try {
          data = context.getImageData(0, 0, width, height);
        } catch (e) {
          /* security error, img on diff domain */ alert("x");
          return defaultRGB;
        }

        length = data.data.length;
        while ((i += blockSize * 4) < length) {
          ++count;
          rgb.r += data.data[i];
          rgb.g += data.data[i + 1];
          rgb.b += data.data[i + 2];
        }

        // ~~ used to floor values
        rgb.r = ~~(rgb.r / count);
        rgb.g = ~~(rgb.g / count);
        rgb.b = ~~(rgb.b / count);

        return rgb;
      }
    });
  }
});
