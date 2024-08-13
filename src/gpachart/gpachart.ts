import { settings } from "../main";
import { Settings } from "../settings";
import { Chart } from "./chartjs/dist/types";

let GPAGraphArray: GraphValueType[];

type GraphValueType = {
  unweighted: number;
  weighted: number;
  timestamp: number;
}

function getChartStorage(settings: Settings) {
  chrome.storage.local.get(["GPAGraphArray"], function (data) {
    settings.graphHasSet = true;
    GPAGraphArray = data.GPAGraphArray as GraphValueType[];
    console.log(GPAGraphArray);
    if (GPAGraphArray == undefined) {
      console.log("GPA graph JSON value is not yet set");
      settings.graphHasSet = false;
    }
    if (settings.graphHasSet == true) {
      initChart();
    }
  });
}

function initChart() {
  const unweightedValues = [];
  for (let i = 0; i < GPAGraphArray.length; i++) {
    unweightedValues.push({
      x: GPAGraphArray[i].timestamp,
      y: GPAGraphArray[i].unweighted,
    });
  }
  const weightedValues = [];
  for (let i = 0; i < GPAGraphArray.length; i++) {
    weightedValues.push({
      x: GPAGraphArray[i].timestamp,
      y: GPAGraphArray[i].weighted,
    });
  }

  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  const chart = new Chart("GPAChart", {
    type: "scatter",
    data: {
      datasets: [
        {
          label: "unweighted",
          pointRadius: 4,
          backgroundColor: "rgb(0,30,255)",
          pointBackgroundColor: "rgb(0,30,255)",
          pointBorderColor: "rgb(0,30,255)",
          borderColor: "rgb(0,30,255)",
          data: unweightedValues,
          fill: false,
          tension: 0,
          showLine: true,
        },
        {
          pointRadius: 4,
          label: "weighted",
          backgroundColor: "rgb(0,170,90)",
          data: weightedValues,
          fill: false,
          tension: 0,
          showLine: true,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: true
        }
      }
    },
  });
  chart.getDatasetMeta(0).hidden = true;
  chart.update();
}

function clearValues() {
  const emptyarray: GraphValueType[] = [];
  chrome.storage.local.set({ GPAGraphArray: emptyarray }).catch(() => "Clearing values failed!");
  console.log("clearing array");
}
function saveAutosaveSetting() {
  const settingValue = document.forms.namedItem("divdarkmodeForm");
  let savedValue = false;
  console.log(settingValue);
  if (settingValue != null) {
    if (settingValue.nodeValue != null && settingValue.nodeValue == "1") {
      savedValue = true;
    } else {
      savedValue = false;
    }
    chrome.storage.local.set({ autosaveSetting: savedValue }).catch(() => "Storing the autosave setting failed!");
  }
}

window.onload = function () {
  const clearValuesButton = document.getElementById("clearGraphBtn")
  if (clearValuesButton != null) {
    clearValuesButton.addEventListener("click", clearValues);
  }
  const autosaveTrueButton = document.getElementById("autosavetrue")
  if (autosaveTrueButton != null) {
    autosaveTrueButton.addEventListener("click", saveAutosaveSetting);
  }
  const autosaveFalseButton = document.getElementById("autosavefalse")
  if (autosaveFalseButton != null) {
    autosaveFalseButton.addEventListener("click", saveAutosaveSetting);
  }
  const divdarkmodeSettingButton = document.getElementById("divdarkmodesetting")
  if (divdarkmodeSettingButton != null) {
    divdarkmodeSettingButton.addEventListener("click", saveAutosaveSetting);
  }
  getChartStorage(settings);
  function returnAutosaveSetting() {
    chrome.storage.local.get(["autosaveSetting"], function (items) {
      let enabled: boolean = items.autosaveSetting as boolean;
      if (
        enabled === undefined ||
        enabled === null ||
        enabled === 0 ||
        typeof enabled != "boolean"
      ) {
        chrome.storage.local.set({ autosaveSetting: false }).catch(() => "Issue with saving autosave settings!");
        console.log(
          "changing stored autosave setting blank to default value of false",
        );
        enabled = false;
      }
      //change radio of settings to saved value
      const getRadioId = "autosave" + enabled.toString();
      const selectedItem = document.getElementById(getRadioId);
      console.log(selectedItem);

      if (selectedItem != null) {
        const newItem1 = document.createElement("radio");
        newItem1.innerHTML =
          '<input type="radio" id="autosave' +
          enabled.toString() +
          '" name="autosaveRadio" value="' +
          (enabled ? "1" : "2") +
          '" checked="checked">';
        if (selectedItem.parentNode != null) {
          selectedItem.parentNode.replaceChild(newItem1, selectedItem);
        }
        saveAutosaveSetting();
      }
    });
  }
  returnAutosaveSetting();
};

console.log("note for later development:");
console.log("to modify the gpa chart list:");
console.log(
  'GPAGraphArray.splice(10, 1, {"timestamp": 167306616,"unweighted": 3.7800000000000002,"weighted": 4.465714285714286})\nwhere the first argument in the .slice() means index of GPAGraphArray starting from 0',
);
console.log(
  "then after you are done with modifying GPAGraphArray, use: \nchrome.storage.local.set({GPAGraphArray: GPAGraphArray});",
);
