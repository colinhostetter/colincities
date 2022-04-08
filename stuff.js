let hasOpenedSecret = false;
function onClickImage(event) {
  const img = event.target;
  const classes = Array.from(img.classList);
  if (classes.includes("speed-1")) {
    img.classList.remove("speed-1");
    img.classList.add("speed-2");
  } else if (classes.includes("speed-2")) {
    img.classList.remove("speed-2");
    img.classList.add("speed-3");
  } else if (classes.includes("speed-3")) {
    img.classList.remove("speed-3");
  } else {
    img.classList.add("speed-1");
  }

  const images = document.getElementsByTagName("img");
  const areAllImagesSpinning = Array.from(images).every((i) => {
    const classes = Array.from(i.classList);
    return ["speed-1", "speed-2", "speed-3"].some((cls) =>
      classes.includes(cls)
    );
  });
  if (areAllImagesSpinning && !hasOpenedSecret) {
    hasOpenedSecret = true;
    setTimeout(() => window.open("./secret.html", "_blank"), 500);
  }
}
Array.from(document.getElementsByTagName("img")).forEach((img) => {
  img.addEventListener("mousedown", onClickImage);
});

// (async () => {
//   const res = await fetch("/api/hits");
//   const body = await res.text();
//   const digits = body
//     .split("")
//     .map((digit) => `<img src="/assets/numerals/${digit}.png" class="numeral">`)
//     .join("");
//   document.getElementById("hit-counter").innerHTML = `
//     <div id="hit-counter-inner">Hits:&nbsp;${digits}</div>
//     <div style="font-size: 10px;">Powered by beseen.com</div>
//   `;
//   Array.from(document.querySelectorAll("#hit-counter img")).forEach((img) => {
//     img.addEventListener("mousedown", onClickImage);
//   });
// })();

(() => {
  const template = document.getElementById("star-template");
  let x = (y = lastDrawnX = lastDrawnY = null);
  const jitter = 10;
  const xOffset = 20;
  const yOffset = 25;
  const duration = 1000;
  const pageEdgeOffset = 18;
  document.body.addEventListener("mousemove", (event) => {
    x = event.pageX;
    y = event.pageY;
  });
  setInterval(() => {
    if (x == null || y == null || (x == lastDrawnX && y == lastDrawnY)) return;
    const star = template.cloneNode(true);
    star.id = null;
    const bodyRect = document.body.getBoundingClientRect();
    const drawX = clamp(
      applyJitter(x + xOffset, jitter),
      0,
      bodyRect.width - pageEdgeOffset
    );
    const drawY = clamp(
      applyJitter(y + yOffset, jitter),
      0,
      bodyRect.height - pageEdgeOffset
    );
    star.style.left = `${drawX}px`;
    star.style.top = `${drawY}px`;
    star.setAttribute("display", "block");
    const h = randomInt(0, 360);
    const s = randomInt(50, 100);
    const l = randomInt(50, 100);
    star.setAttribute("fill", `hsl(${h}deg, ${s}%, ${l}%)`);
    const rotation = randomInt(0, 360);
    star.setAttribute("transform", `rotate(${rotation})`);
    document.body.appendChild(star);
    lastDrawnX = x;
    lastDrawnY = y;
    setTimeout(() => document.body.removeChild(star), duration);
  }, 10);
})();

function randomInt(from, to) {
  return Math.floor(from + Math.random() * (to - from));
}

function applyJitter(num, jitter) {
  return num + Math.random() * jitter * 2 - jitter * 0.5;
}

function clamp(num, min, max) {
  return Math.max(min, Math.min(max, num));
}

document.getElementById("music-button").addEventListener("click", () => {
  const audio = document.getElementById("audio");
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});
