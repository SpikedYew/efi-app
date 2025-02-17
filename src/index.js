document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const what = document.getElementById("what");
  const start = document.getElementById("start");
  const btnLeft = document.getElementById("btn-left");
  const btnRight = document.getElementById("btn-right");
  const btnStart = document.getElementById("start-btn");
  const toRemove = document.getElementById("remove");

  let slide = 0;
  const slides = [intro, what, start];

  btnRight.addEventListener("click", swipeLeft);

  function swipeLeft() {
    if (slide < slides.length - 1) {
      slides[slide].style.transform = `translateX(-350px)`;
      slide++;
    }
    if (slide === 2) {
      btnRight.style = `-webkit-transform: scale(1.1) rotate(360deg) translate(-400px, -24px);
      -moz-transform: scale(1.1) rotate(360deg) translate(-400px, -24px);
      -ms-transform: scale(1.1) rotate(360deg) translate(-400px, -24px);
      -o-transform: scale(1.1) rotate(360deg) translate(-400px, -24px);
      transform: scale(1.1) rotate(360deg) translate(-400px, -24px);`;
      btnLeft.style = `-webkit-transform: scale(0.6) rotate(149deg) translate(200px, -24px);
      -moz-transform: scale(0.6) rotate(149deg) translate(200px, -24px);
      -ms-transform: scale(0.6) rotate(149deg) translate(200px, -24px);
      -o-transform: scale(0.6) rotate(149deg) translate(200px, -24px);
      transform: scale(0.6) rotate(149deg) translate(200px, -24px);`;
      setTimeout(() => {
        toRemove.remove();
        btnStart.style.opacity = 1;
      }, 1000);

      setTimeout(() => {
        btnStart.style.transform = "translateY(0px)";
      }, 1300);
    }
  }

  document.getElementById("start-btn").addEventListener("click", () => {
    const name = document.getElementById("name-input").value;

    if (name.trim() !== "") {
      window.Electron.markIntroSeen(name);
    }
  });
});
