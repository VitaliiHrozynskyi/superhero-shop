function createColorCard(colorCard) {
  const img = colorCard.querySelector(".color-card__img");
  const el = document.createElement("div");
  el.className = "color-card__gradient";
  if (img.src === "http://127.0.0.1:5500/" || img.src === "" || !img.src) {
    img.src = "https://picsum.photos/200/300";
  } else {
    let rgb = getAverageRGB(img);
    el.style.background = `linear-gradient(to top, rgba(${rgb.r}
      ,${rgb.g}
      ,${rgb.b}
      , 1), rgba(${rgb.r}
        ,${rgb.g}
        ,${rgb.b}
        , 0))`;
  }
  colorCard.appendChild(el);
}

function getAverageRGB(img) {
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

  height = imgHeight.offsetHeight;
  width = canvas.width;

  context.drawImage(img, 0, 0);

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

  return rgb;
}

window.addEventListener("load", () => {
  const colorCards = document.querySelectorAll(".color-card");
  for (let i = 0; i < colorCards.length; i++) {
    createColorCard(colorCards[i]);
  }
});
