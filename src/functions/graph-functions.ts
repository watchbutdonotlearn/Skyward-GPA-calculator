import { Settings } from "../settings";

export function saveGPAtoGraph(
  unweighted: number,
  weighted: number,
  settings: Settings,
) {
  chrome.storage.local.get(["GPAGraphArray"], function (data) {
    let graphHasSet = 0;
    const GPAGraphArray = data.GPAGraphArray;
    let hasbeen24hours = 0;
    let isrepeatvalue = 0;
    console.log(GPAGraphArray);
    if (GPAGraphArray == undefined) {
      console.log("GPA graph JSON value is not yet set");
      graphHasSet = 1;
    } else if (GPAGraphArray.length == 0) {
      console.log("GPA graph JSON value is not yet set");
      graphHasSet = 1;
    }
    const timestamp = Math.round(Date.now() / 10000);
    if (graphHasSet == 0) {
      console.log("graphHasSet is 0, checking for repeat");
      if (GPAGraphArray[GPAGraphArray.length - 1].weighted == weighted) {
        console.log("repeated value");
        graphHasSet = 2;
        isrepeatvalue = 1;
      } else if (
        GPAGraphArray[GPAGraphArray.length - 1].unweighted == unweighted
      ) {
        console.log("repeated value");
        graphHasSet = 2;
        isrepeatvalue = 1;
      }
      console.log(GPAGraphArray[GPAGraphArray.length - 1].timestamp);
      console.log(timestamp);
      if (
        GPAGraphArray[GPAGraphArray.length - 1].timestamp + 8600 <
        timestamp
      ) {
        graphHasSet = 0;
        hasbeen24hours = 1;
        console.log("last date is 24 hours before");
      }
    }
    if (settings.autosaveSetting == true) {
      settings.originalGraphHasSet = settings.graphHasSet;
      settings.graphHasSet = 3;
    }
    if (settings.graphHasSet == 0) {
      console.log("appending GPA to array and saving");
      GPAGraphArray.push({
        unweighted: unweighted,
        weighted: weighted,
        timestamp: timestamp,
      });
      chrome.storage.local.set({ GPAGraphArray: GPAGraphArray });
      document.getElementById("saveGraphBtn").outerHTML =
        '<button type="button" style="float: right;" id="saveGraphBtn" disabled>Save to graph</button>';
    } else if (graphHasSet == 1) {
      console.log("saving GPA for first time");
      let GPAGraphTempValues = [
        {
          unweighted: unweighted,
          weighted: weighted,
          timestamp: timestamp,
        },
      ];
      chrome.storage.local.set({ GPAGraphArray: GPAGraphTempValues });
      document.getElementById("saveGraphBtn").outerHTML =
        '<button type="button" style="float: right;" id="saveGraphBtn" disabled>Save to graph</button>';
    } else if (graphHasSet == 3) {
      console.log("autosave is enabled");
      document.getElementById("saveGraphBtn").outerHTML =
        '<button type="button" style="float: right;" id="saveGraphBtn" disabled>autosave enabled</button>';
      if (hasbeen24hours == 1 || settings.originalGraphHasSet == 0) {
        console.log("appending GPA to array and saving");
        GPAGraphArray.push({
          unweighted: unweighted,
          weighted: weighted,
          timestamp: timestamp,
        });
        chrome.storage.local.set({ GPAGraphArray: GPAGraphArray });
      } else if (originalGraphHasSet == 1) {
        console.log("saving GPA for first time");
        let GPAGraphTempValues = [
          {
            unweighted: unweighted,
            weighted: weighted,
            timestamp: timestamp,
          },
        ];
        chrome.storage.local.set({ GPAGraphArray: GPAGraphTempValues });
      }
    } else {
      console.log("not saving GPA value due to repeat");
      document.getElementById("saveGraphBtn").outerHTML =
        '<button type="button" style="float: right;" id="saveGraphBtn" disabled>cannot save duplicate GPA</button>';
    }
  });
}
