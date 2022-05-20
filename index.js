const card = document.querySelectorAll(".color-card");
const img = document.querySelectorAll(".color-card__img");

function cardGradient() {
  const el = document.createElement("div");
  el.className = "color-card__gradient";
  return el;
}

window.addEventListener("load", () => {
  for (let i = 0; i < card.length; i++) {
    const gradient = cardGradient();
    if (
      img[i].src === "http://127.0.0.1:5500/" ||
      img[i].src === "" ||
      !img[i].src
    ) {
      img[i].src = "https://picsum.photos/200/300";
    } else {
      card[i].appendChild(gradient);
      gradientColor(img[i], gradient);
    }
  }
});

function gradientColor(img, gradient) {
  let rgb = getAverageRGB(img);
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
      imgHeight = img.offsetParent,
      count = 0;

    if (!context) {
      return defaultRGB;
    }

    height = imgHeight.offsetHeight; //canvas.height;
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
      if (
        (data.data[i] > 210 &&
          data.data[i + 1] > 210 &&
          data.data[i + 2] > 210) ||
        (data.data[i] < 40 && data.data[i + 1] < 40 && data.data[i + 2] < 40)
      ) {
        continue;
      }

      ++count;
      rgb.r += data.data[i];
      rgb.g += data.data[i + 1];
      rgb.b += data.data[i + 2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);
    console.log(rgb);

    return rgb;
  }
  return gradient;
}
