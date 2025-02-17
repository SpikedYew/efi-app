const changeName = document.getElementById("menu");
const swipeName = document.getElementById("load-page-1");

let hidden = true;
changeName.addEventListener("click", () => {
  if (hidden) {
    swipeName.style.transform = `translateX(0px)`;
    hidden = !hidden;
  } else {
    swipeName.style.transform = `translateX(-350px)`;
    hidden = !hidden;
  }
});
