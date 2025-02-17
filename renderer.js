// const information = document.getElementById("info");
// information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

// const func = async () => {
//   const response = await window.versions.ping();
//   console.log(response); // prints out 'pong'
//   document.createElement("div");
//   information.innerText = response;
// };

// func();

window.Electron.getUserName().then((name) => {
  document.getElementById("user-name").textContent = name;
});

document.getElementById("load-page-1").addEventListener("click", () => {
  const fileName = false;
  window.Electron.loadPrevious(fileName);
});
