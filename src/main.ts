import {
  calculateGPA,
  calculateGPAParams,
  displayGPA,
} from "./functions/calculate-gpa";
import { setDarkMode } from "./functions/dark-mode";
import {
  delayStorageGet,
  delayStorageGet2,
  delayStorageGet3,
} from "./functions/delay-storage";
import { Settings } from "./settings";

console.log("Attempting to inject script");

const settings: Settings = {
  autosaveSetting: false,
  originalGraphHasSet: 0,
  graphHasSet: graphHasSet,
  skywardDarkTheme: false,
};
const scriptTag = document.createElement("script");
scriptTag.src = chrome.runtime.getURL("script2.js");
document.head.appendChild(scriptTag);

const url = location.href;
const page = url.split("/scripts/wsisa.dll/WService=")[1].split("/")[1];
console.log("[DEBUG] page = " + page);

chrome.storage.local.get(["skywardDarkTheme"], function (data) {
  console.log(data);
  settings.skywardDarkTheme = data.skywardDarkTheme;
  if (settings.skywardDarkTheme) {
    setDarkMode(page);
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
          numberOfGradeDivs: numberOfgradeDivs,
        };
        const [unweighted, weighted] = calculateGPA(params);
        displayGPA(unweighted, weighted, params, settings);
      });
    },
  );
}
