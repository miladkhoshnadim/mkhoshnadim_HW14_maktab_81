const inptitel = document.querySelector("#inptit");
const inpDiscription = document.querySelector("#inpDis");
const inpStart = document.querySelector("#inpStart");
const inpEnd = document.querySelector("#inpEnd");
const TASKsDisplay = document.querySelector("#TASKsDisplay");
const DoingsDisplay = document.querySelector("#DOingsDisplay");
const DONEsDisplay = document.querySelector("#DONEsDisplay");
let TASKs = [];
let DONEs = [];
let DOings = [];

TASKs = localStorage.getItem("TASKs") || "[]";
putToDisplay(JSON.parse(TASKs), "TASKs", TASKsDisplay);
// putToDisplayTasks(JSON.parse(TASKs));
DOings = localStorage.getItem("DOings") || "[]";
putToDisplay(JSON.parse(DOings), "DOings", DoingsDisplay);

DONEs = localStorage.getItem("DONEs") || "[]";
putToDisplay(JSON.parse(DONEs), "DONEs", DONEsDisplay);

document.getElementById("submited").addEventListener("click", function () {
  const inputsObject = {
    titel: `${inptitel.value}`,
    discrition: `${inpDiscription.value}`,
    start: `${inpStart.value}`,
    end: `${inpEnd.value}`,
    status: false,
  };
  console.log(inputsObject);
  EnterToArray(inputsObject);
});

function EnterToArray(inputsObject) {
  // get the string from localStorage
  TASKs = localStorage.getItem("TASKs") || "[]";
  // convert string to valid object
  TASKs = JSON.parse(TASKs);
  TASKs.push(inputsObject);
  console.log("TASKs", TASKs);
  // putToDisplayTasks(TASKs);
  putToDisplay(TASKs, "TASKs", TASKsDisplay);
  // convert object to JSON string and save to localStorage
  localStorage.setItem("TASKs", JSON.stringify(TASKs));
}

// function putToDisplayTasks(TASKs) {
//   TASKsDisplay.innerHTML = "<h2>TASKs</h2>";
//   TASKs.forEach((element, index) => {
//     const div = document.createElement("div");
//     div.setAttribute("id", `TASKs${index}`);
//     div.classList.add("singelTask");
//     div.innerHTML = `
//         <span class="singelTaskClose" onclick=HandelClose(${index})>×</span>
//         <div class="singelTaskTitel"><input type="radio"  ${element.titel}/> ${element.titel}</div>
//         <div class="singelTaskStart">start:  ${element.start}</div>
//         <div class="singelTaskStart">end:  ${element.end}</div>
//         <button class="singelTaskButtons" onclick=HandelClose(${index})>-</button>
//         <button class="singelTaskButtons" onclick=HandelInformation(${index})>
//           <span class="informationSign">!</span>
//           </button>
//         <button class="singelTaskButtons" onclick=HandelToDOings(${index})>✓</button>
//         <div id="TASKsInfo${index}" class="ExtraInformation hiden"><strong>Description:</strong> ${element.discrition}</div>
//       `;
//     TASKsDisplay.appendChild(div);
//   });
// }

// function HandelCloseTASKs(id) {
//   console.log("id", id);
//   TASKs = localStorage.getItem("TASKs");
//   TASKs = JSON.parse(TASKs);
//   console.log("TASKs", TASKs);
//   TASKs.splice(id, 1);
//   console.log("TASKs63", TASKs);
//   putToDisplayDoinngs(TASKs,'TASKs', TASKsDisplay);
//   // putToDisplayTasks(TASKs);
//   localStorage.setItem("TASKs", JSON.stringify(TASKs));
// }

function HandelInformation(id,tit) {
  document.querySelector(`#${tit}Info${id}`).classList.toggle("hiden");
}

function Handeltransfer(id, titel1, titel2) {
  console.log("id", id);
  TASKs = localStorage.getItem(`${titel1}`);
  TASKs = JSON.parse(TASKs);
  console.log("TASKs", TASKs);
  const transfer = TASKs.splice(id, 1);
  console.log("TASKs63", TASKs);
  console.log("transfer", transfer);
  putToDisplay(TASKs, `${titel1}`, document.querySelector(`#${titel1}Display`));
  // putToDisplayTasks(TASKs);
  localStorage.setItem(`${titel1}`, JSON.stringify(TASKs));

  DOings = localStorage.getItem(`${titel2}`) || "[]";
  DOings = JSON.parse(DOings);
  console.log("DOings", DOings);
  DOings.push(transfer[0]);
  putToDisplay(
    DOings,
    `${titel2}`,
    document.querySelector(`#${titel2}Display`)
  );
  localStorage.setItem(`${titel2}`, JSON.stringify(DOings));
}

function putToDisplay(DOings, arr, wher) {
  console.log("DOings,arr", DOings, arr);
  wher.innerHTML = `<h2>${arr}</h2>`;
  DOings.forEach((element, index) => {
    const div = document.createElement("div");
    div.setAttribute("id", `${arr}${index}`);
    div.classList.add("singelTask");
    div.innerHTML = `
        <span class="singelTaskClose" onclick=HandelClose(${index},'${arr}')>×</span>
        <div class="singelTaskTitel"><input type="radio"  ${element.titel}/> ${element.titel}</div>
        <div class="singelTaskStart">start:  ${element.start}</div>
        <div class="singelTaskStart">end:  ${element.end}</div>
        <button class="singelTaskButtons" onclick=HandelMines(${index},'${arr}')>-</button>
        <button class="singelTaskButtons" onclick=HandelInformation(${index},'${arr}')>
          <span class="informationSign">!</span>
          </button>
        <button class="singelTaskButtons" onclick=HandelTicks(${index},'${arr}')>✓</button>
        <div id="${arr}Info${index}" class="ExtraInformation hiden"><strong>Description:</strong> ${element.discrition}</div>
      `;
    wher.appendChild(div);
  });
}

function HandelClose(id, wich) {
  console.log("id, wich", id, wich);
  DOings = localStorage.getItem(`${wich}`);
  DOings = JSON.parse(DOings);
  console.log(wich, DOings);
  DOings.splice(id, 1);
  console.log("DOingsAfter", DOings);
  putToDisplay(DOings, `${wich}`, document.querySelector(`#${wich}Display`));
  localStorage.setItem(`${wich}`, JSON.stringify(DOings));
}

function HandelMines(id, tit) {
  console.log("id, wich", id, tit);
  if (tit == "TASKs") {
    HandelClose(id, tit);
  } else if (tit == "DOings") {
    Handeltransfer(id, tit, "TASKs");
  } else if (tit == "DONEs") {
    Handeltransfer(id, tit, "DOings");
  } else {
    alert("something in wich has error agha milad!>>>", wich);
  }
}

function HandelTicks(id, tit) {
  console.log("id, wich", id, tit);
  if (tit == "TASKs") {
    Handeltransfer(id, tit, "DOings");
  } else if (tit == "DOings") {
    Handeltransfer(id, tit, "DONEs");
  } else if (tit == "DONEs") {
    HandelClose(id, tit);
  } else {
    alert("something in titel tick has error agha milad!>>>", tit);
  }
}
