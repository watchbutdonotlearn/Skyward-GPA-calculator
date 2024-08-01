import { calculateGPA, calculateGPAParams, displayGPA } from "./functions/calculate-gpa";
import { delayStorageGet, delayStorageGet2, delayStorageGet3 } from "./functions/delay-storage";
import { Settings } from "./settings";

console.log("Attempting to inject script");

const settings: Settings = {
  autosaveSetting: false,
  originalGraphHasSet: 0,
  graphHasSet: graphHasSet,
}
const scriptTag = document.createElement("script");
scriptTag.src = chrome.runtime.getURL("script2.js");
document.head.appendChild(scriptTag);

const url = location.href;
const page = url.split("/scripts/wsisa.dll/WService=")[1].split("/")[1];
console.log("[DEBUG] page = " + page);

chrome.storage.local.get(["skywardDarkTheme"], function (data) {
  console.log(data);
  if (data.skywardDarkTheme == true) {
    let variablesCSS = document.createElement("link");
    variablesCSS.rel = "STYLESHEET";
    variablesCSS.href = chrome.runtime.getURL("css/variables.css");
    document.head.appendChild(variablesCSS);

    let qsfmainCSS = document.createElement("link");
    qsfmainCSS.rel = "STYLESHEET";
    qsfmainCSS.href = chrome.runtime.getURL("css/qsfmain001.css");
    document.head.appendChild(qsfmainCSS);

    if (page != "seplog01.w") {
      let newElem2 = document.createElement("link");
      newElem2.rel = "STYLESHEET";
      newElem2.href = chrome.runtime.getURL("css/sfhome001.css");
      document.head.appendChild(newElem2);

      let newElem4 = document.createElement("link");
      newElem4.rel = "STYLESHEET";
      newElem4.href = chrome.runtime.getURL("css/sfgradebook001.css");
      document.head.appendChild(newElem4);
    } else {
      let newElem3 = document.createElement("link");
      newElem3.rel = "STYLESHEET";
      newElem3.href = chrome.runtime.getURL("css/qclssbase001.css");
      document.head.appendChild(newElem3);

      let newElem4 = document.createElement("link");
      newElem4.rel = "STYLESHEET";
      newElem4.href = chrome.runtime.getURL("css/qclsslogin001.css");
      document.head.appendChild(newElem4);

      var children = document.getElementById("loginBrading").children;
      console.log(children);
      for (let child in children) {
        if (children[child].getAttribute("src")) {
          children[child].setAttribute("src", chrome.runtime.getURL("SkyLogoBlue.png"));
	}
      }
    }

    if (page == "sfgradebook001.w") {
      let styleElements = document.getElementsByTagName("style");
      for (let i = 0; i < styleElements.length; i++) {
        let element = styleElements[i];
        if (
          element.innerHTML.includes(
            "#sf_OuterWrap td.cCl {background-color:#FFFFFF",
          )
        ) {
          element.innerHTML = `
					#sf_OuterWrap td.cCl {
						background-color:var(--main-bg-color) !important;
						border-bottom:1px solid #D6DFEA !important;
						padding:3px 4px 3px 2px !important;
					}
					#sf_OuterWrap th.cCl {
						padding:3px 4px 3px 2px !important;
					}
					`;
        }
      }
    }

    if (page == "sfcalendar002.w") {
      let calenderJQueryCSS = document.createElement("link");
      calenderJQueryCSS.rel = "STYLESHEET";
      calenderJQueryCSS.href = chrome.runtime.getURL("css/jquery.cluetip.css");
      document.head.appendChild(calenderJQueryCSS);

      let styleElements = document.getElementsByTagName("style");
      for (let i = 0; i < styleElements.length; i++) {
        let element = styleElements[i];
        if (
          element.innerHTML.includes(
            "span.fc-event-title {overflow:hidden; white-space:nowrap}",
          )
        ) {
          element.innerHTML = `
					span.fc-event-title {overflow:hidden; white-space:nowrap}
					#cluetip td, table.calTbl td {padding:2px 4px;}
					#cluetip-title #cluetip-close .sf_DialogClose {left:-7px;top:-4px;right:auto;}
					#cluetip .label {font-weight:bold;text-align:right;}
					#cluetip .clueHead {font-weight:bold;text-decoration:underline;text-align:center;font-size:larger;padding-bottom:5px;}
					#grid_header a.caltrigger {top:-3px;}
					.fc-event {cursor:pointer}
					#printMenuLink {vertical-align:super}
					.fc td, .fc th {background-color: var(--lighter-bg-color)}
					.fc-grid .fc-day-number {margin: 3px 3px 1px 1px;}
					.fc-grid th {background-color: var(--lighter-bg-color);line-height: 16px;}
					/* Settings required for Quick Print of Week or Day to look good (respect overflow:visible when printing, but still retain placement and other formatting) */
					@media print{
						.iePrint-visiClass {float:none !important; position:relative !important;}
						.iePrint-noHeight {height:0px !important;}
						* {overflow:visible !important;}
						#sf_menuWrap_calOptionsMenu, #calOptionsMenu, #sf_menuWrap_printMenuLink, #printMenuLink {visibility:hidden !important;}
						.printable {color:black;} /* All browsers automatically print with white backgrounds and dark text, but some with darker text than others - set to black for best readability */
					}
					input.wide {
					width:100%;
					align:right;
					}
					div.colorBox {margin:2px 14px 1px 0;border:1px solid #B7B7B7;padding:2px;vertical-align:middle;float:left;cursor:pointer;}
					div.colorBox:hover{border-color:#5E7890}
					div.colorBox div {width:14px;height:14px;border:inherit;text-align:center;cursor:pointer;}
					table.nw td{white-space:nowrap; padding:1px 7px;}
					#grid_CalendarOptions tr > td, #grid_EventColors tr > td {padding: 3px 0 3px 4px}
					table.studentOptions tr > td:nth-child(odd) {width:165px}
					table.studentOptions label {white-space:nowrap}
					`;
        }
      }
    }
  }
});

var weightaverage = 4.0;
var weightArray = [];

var currentGPAJSON = {
  "Current Skyward Grades": {
    classNames: [],
    inputtedGPAValues: [],
    inputtedGradeValues: [],
    setNumberOfClasses: "",
  },
};


var prevSemesterGrades = [];
var prevSemesterWeights = [];

let myPromise = new Promise(function (myResolve, myReject) {
  // "Producing Code" (May take some time)

  chrome.storage.local.get(["storedCumulativeGrades"], function (data) {
    console.log(JSON.parse(data.storedCumulativeGrades));
    if (typeof data != undefined) {
      isPrevGradesSet = 1;
    }
    if (isPrevGradesSet == 1) {
      let tempPrevSemesterGrades = data.storedCumulativeGrades;
      let PrevSemesterGradesJSON = JSON.parse(tempPrevSemesterGrades);
      for (let i in PrevSemesterGradesJSON) {
        console.log(PrevSemesterGradesJSON[i].inputtedGradeValues);
        prevSemesterGrades = prevSemesterGrades.concat(
          PrevSemesterGradesJSON[i].inputtedGradeValues,
        );
        console.log(prevSemesterGrades);
        prevSemesterWeights = prevSemesterWeights.concat(
          PrevSemesterGradesJSON[i].inputtedGPAValues,
        );
      }
    }

    prevSemesterWeights = prevSemesterWeights.map(Number);
    prevSemesterGrades = prevSemesterGrades.map(Number);
  });

  myResolve(); // when successful
});

const algNumber = delayStorageGet();
const numberOfgradeDivs = delayStorageGet2();

var isPrevGradesSet = 0;
delayStorageGet3();
console.log(isPrevGradesSet);

// get weights
var numberOfWeights: number;
if (page == "sfgradebook001.w") {
  chrome.storage.local.get(
    [
      "storedGPA1",
      "storedGPA2",
      "storedGPA3",
      "storedGPA4",
      "storedGPA5",
      "storedGPA6",
      "storedGPA7",
      "storedGPA8",
    ],
    function (data) {
      let weightsum = 0.0;
      let data_len = 0;
      for (let [_key, value] of Object.entries(data)) {
        data_len++;
        let value1 = value;
        if (!!value == false) {
          value1 = 0;
        }
        weightsum += parseFloat(value1);
        weightArray.push(parseFloat(value));
      }
      console.log(weightArray);
      weightArray = weightArray.filter((e) => e === 0 || e);
      console.log(weightArray);
      numberOfWeights = weightArray.length;
      console.log(numberOfWeights);
      console.log(weightsum);
      if (data_len < 8) {
        weightsum = NaN;
      }
      console.log(weightsum);
      weightaverage = weightsum / numberOfWeights;
      console.log(weightaverage);

      myPromise.then(function (_value) {
        console.log("success ig");
	const params: calculateGPAParams = {
	  numberOfWeights: numberOfWeights,
	  weightArray: weightArray,
	  isPrevGradesSet: isPrevGradesSet == 1,
	  prevSemesterGrades: prevSemesterGrades,
	  prevSemesterWeights: prevSemesterWeights,
	  currentGPAJSON: currentGPAJSON,
	  weightAverage: weightaverage,
	  algNumber: algNumber,
	  numberOfGradeDivs: numberOfgradeDivs
	}
        const [unweighted, weighted] = calculateGPA(params);
	displayGPA(unweighted, weighted, params, settings);
      });
    },
  );
}


