let id = 0;
let inputs = [];
document.getElementById("AllToRight").addEventListener("click", function () {
  document.getElementById("AllToRight").classList.add("disabel");
  document.getElementById("CheckToRight").classList.add("disabel");
  document.getElementById("AllToLeft").classList.remove("disabel");
  document.getElementById("CheckToLeft").classList.remove("disabel");
  inputs = document.querySelectorAll("input");
  for (let i = 1; i <= inputs.length / 2; ++i) {
    document.getElementById(`left${i}`).classList.add("hide");
    document.getElementById(`Righ${i}`).classList.remove("hide");
    document.getElementById(`left${i}`).checked = false;
    document.getElementById(`Righ${i}`).checked = false;
  }
  inputs.forEach((element) => {
    if (element.checked == true) {
      element.checked = false;
    }
  });
});

document.getElementById("AllToLeft").addEventListener("click", function () {
  document.getElementById("AllToRight").classList.remove("disabel");
  document.getElementById("CheckToRight").classList.remove("disabel");
  document.getElementById("AllToLeft").classList.add("disabel");
  document.getElementById("CheckToLeft").classList.add("disabel");
  inputs = document.querySelectorAll("input");
  for (let i = 1; i <= inputs.length / 2; ++i) {
    document.getElementById(`Righ${i}`).classList.add("hide");
    document.getElementById(`left${i}`).classList.remove("hide");
    document.getElementById(`Righ${i}`).checked = false;
    document.getElementById(`left${i}`).checked = false;
  }
  inputs.forEach((element) => {
    if (element.checked == true) {
      element.checked = false;
    }
  });
});

document.getElementById("CheckToRight").addEventListener("click", function () {
  document.getElementById("AllToLeft").classList.remove("disabel");
  document.getElementById("CheckToLeft").classList.remove("disabel");
  inputs = document.querySelectorAll("input");
  inputs.forEach((element) => {
    if (element.checked == true) {
      id = element.parentNode.getAttribute("id").substring(4);
      document.getElementById(`left${id}`).classList.add("hide");
      document.getElementById(`Righ${id}`).classList.remove("hide");
      element.checked = false;
    }
  });
});

document.getElementById("CheckToLeft").addEventListener("click", function () {
  document.getElementById("AllToRight").classList.remove("disabel");
  document.getElementById("CheckToRight").classList.remove("disabel");
  inputs = document.querySelectorAll("input");

  inputs.forEach((element) => {
    if (element.checked == true) {
      id = element.parentNode.getAttribute("id").substring(4);
      document.getElementById(`Righ${id}`).classList.add("hide");
      document.getElementById(`left${id}`).classList.remove("hide");
      element.checked = false;
    }
  });
});
