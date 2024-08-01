/** Get the algorithm that we'll be using */
export function delayStorageGet(): number {
  let algNumber = 1;
  chrome.storage.local.get(["storedAlgorithm"], function (data) {
    console.log(data);
    algNumber = data.storedAlgorithm;
    let senseNaN = algNumber;
    senseNaN = +senseNaN || 0;
    if (senseNaN === 0) {
      algNumber = 1;
    }
  });
  return algNumber;
}

/** Get the number of grade divs */
export function delayStorageGet2(): number {
  let numberOfGradeDivs: number;
  chrome.storage.local.get(["storedGradesDivNum"], function (data) {
    console.log(data);
    numberOfGradeDivs = data.storedGradesDivNum;
    let senseNaN = numberOfGradeDivs;
    senseNaN = +senseNaN || 0;
    if (senseNaN === 0) {
      numberOfGradeDivs = 1;
    }
    console.log(numberOfGradeDivs);
  });
  return numberOfGradeDivs;
}

/** Get the stored cumulative grades */
export function delayStorageGet3() {
  chrome.storage.local.get(["storedCumulativeGrades"], function (data) {});
}
