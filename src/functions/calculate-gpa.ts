import { Settings } from "../settings";
import { setNumberOfClasses, setClassNames } from "./class-functions";
import { saveGPAtoGraph } from "./graph-functions";

const GET_GRADES_FAIL: [number, number, number[]] = [-1, -1, []];

type GPAJSONDictonary = {
    [key: string]: {
      classNames: string[],
      inputtedGPAValues: number[],
      inputtedGradeValues: number[],
      setNumberOfClasses: string
    };
};

export interface calculateGPAParams {
  numberOfWeights: number;
  weightArray: number[];
  isPrevGradesSet: boolean;
  prevSemesterGrades: number[];
  prevSemesterWeights: number[];
  currentGPAJSON: GPAJSONDictonary;
  weightAverage: number;
  algNumber: number;
  numberOfGradeDivs: number;
}

/**
 * Get a list of grades for each individual class.
 *
 * @param {number} numberOfGradeDivs - The number of grade divs in Skyward
 * */
function getGrades(numberOfGradeDivs: number): [number, number, number[]] {
  const container = document.getElementById("printGradesContainer"); // Get main node
  // Find grade node
  let counterthing = 1;
  let grade_container = null;
  for (let i = 0; i < container.children.length; i++) {
    const child = container.children[i];
    if (numberOfGradeDivs == 1) {
      console.log("number of grade divs is 1");
      if (child.id.substring(0, 18) === "grid_stuGradesGrid") {
        grade_container = child;
        break;
      }
    } else {
      console.log("number of grade divs is 2");
      if (child.id.substring(0, 18) === "grid_stuGradesGrid") {
        counterthing++;
        if (counterthing === 2) {
          continue;
        }
        grade_container = child;
        break;
      }
    }
  }
  console.log(grade_container);
  if (grade_container === null) {
    console.log("[ERROR] Grades not found");
    return GET_GRADES_FAIL;
  }
  const detectUndefined = grade_container;
  if (detectUndefined === undefined) {
    console.log("[ERROR] Grades not found");
    return GET_GRADES_FAIL;
  }
  // Get grades
  const inner_grades =
    grade_container.children[2].children[0].children[0].children[0].children[1]
      .children[0].children[0];
  console.log(inner_grades);
  let gpa_sub = 0;
  let gpa_cnt = 0;

  const tempGrades = [];
  for (let i = 0; i < inner_grades.children.length; i++) {
    const child = inner_grades.children[i];
    if (child.hasAttribute("group-parent")) {
      let final_grade = -1;
      for (let j = 0; j < child.children.length; j++) {
        const c_child = child.children[j];
        if (c_child.children[0].innerHTML.length < 10) continue;
        final_grade = parseInt(c_child.children[0].children[0].innerHTML);
      }

      if (final_grade !== -1) {
        gpa_sub += 0.05 * (100 - final_grade);
        gpa_cnt++;
      }

      console.log("final_grade: " + final_grade);
      tempGrades.push(final_grade);
    }
  }
  console.log(tempGrades);
  return [gpa_sub, gpa_cnt, tempGrades];
}

/**
 * Calculate GPA
 *
 * TODO: Update this because of how horrifying it is
 *
 * @param {calculateGPAParams} params - An object that contains all of the parameters used
 * */
export function calculateGPA(params: calculateGPAParams): [number, number] {
  setNumberOfClasses();
  setClassNames();
  let [gpa_sub, gpa_cnt, tempGrades] = getGrades(params.numberOfGradeDivs);

  // Error occurred
  if (tempGrades === GET_GRADES_FAIL) {
    return;
  }
  let numberOfUngradedClasses = 0;
  //this finds how many classes show up as -1, meaning the grades are not in yet
  for (let i = 0; i < tempGrades.length; i++) {
    if (tempGrades[i] == -1) {
      numberOfUngradedClasses++;
    }
  }
  console.log(numberOfUngradedClasses);

  // this finds the index number of ungraded classes in tempGrades,
  // so those indexes can be removed from weightArray later
  const ungradedIndexNumber: number[] = [];
  for (let i = 0; i < tempGrades.length; i++) {
    if (tempGrades[i] == -1) {
      ungradedIndexNumber.push(i);
    }
  }
  console.log("ungraded index numbers:" + ungradedIndexNumber);

  if (tempGrades.includes(-1)) {
    // it is the first semester or not all grades are in, this just
    // removes all elements that show up as -1, which would mean
    // that the grades aren't in yet.
    tempGrades = tempGrades.filter((a) => a !== -1);
  }

  const numberOfSelectedWeights = params.numberOfWeights;

  const weightArrayTemporary: number[] = [];
  const weightArrayOriginal = params.weightArray;

  console.log(tempGrades);

  // if its the second semester, duplicate the weights selected in the GUI
  if (tempGrades.length > numberOfSelectedWeights) {
    for (let i = 0; i < params.weightArray.length; i++) {
      weightArrayTemporary.push(params.weightArray[i]);
      weightArrayTemporary.push(params.weightArray[i]);
    }
    params.weightArray = weightArrayTemporary;
  }

  // now remove the problematic indexes in weightArray where the weights are for ungraded classes
  for (let i = ungradedIndexNumber.length - 1; i >= 0; i--) {
    // go in reverse order here to not mess up item indexes
    // https://stackoverflow.com/questions/9425009/remove-multiple-elements-from-array-in-javascript-jquery
    console.log(params.weightArray.splice(ungradedIndexNumber[i], 1));
  }

  console.log(params.weightArray);

  console.log("isprevgradesSet:");
  console.log(params.isPrevGradesSet);

  if (params.isPrevGradesSet) {
    console.log("concatenating previous grades to current ones");
    console.log(params.prevSemesterGrades);
    params.weightArray = params.weightArray.concat(params.prevSemesterWeights);
    console.log(params.weightArray);
    tempGrades = tempGrades.concat(params.prevSemesterGrades);
  }

  console.log(tempGrades);

  const tempGrades1 = tempGrades;

  // average formula weighted
  let preGPAw = 0;
  let preGPAsum = 0;
  const numberOfGrades = tempGrades1.length;
  const numberOfGrades1 = tempGrades1.length;

  params.numberOfWeights = params.weightArray.length;
  console.log(params.numberOfWeights);
  console.log(params.weightArray);
  for (let i = 0; i < numberOfGrades1; i++) {
    preGPAw = params.weightArray[i] * tempGrades[i] * 0.01;
    if (preGPAw > 0) {
      preGPAsum = preGPAsum + preGPAw;
      console.log(preGPAsum);
    }
    preGPAw = 0;
  }

  for (let i = 0; i < params.weightArray.length; i++) {
    params.weightArray[i] = +params.weightArray[i].toFixed(1);
  }
  params.currentGPAJSON["Current Skyward Grades"].setNumberOfClasses =
    numberOfGrades.toString();
  params.currentGPAJSON["Current Skyward Grades"].inputtedGPAValues =
    weightArrayOriginal;
  params.currentGPAJSON["Current Skyward Grades"].inputtedGradeValues =
    tempGrades;

  const gpaAverageW = preGPAsum / numberOfGrades1;
  console.log("gpaAverageW: " + gpaAverageW);
  let preGPAu = 0;
  preGPAsum = 0;
  for (let i = 0; i < numberOfGrades; i++) {
    preGPAu = 4 * tempGrades[i] * 0.01;
    preGPAsum = preGPAsum + preGPAu;
    preGPAu = 0;
  }
  const gpaAverageU = preGPAsum / numberOfGrades;
  console.log("gpaAverageU: " + gpaAverageU);
  console.log("tempGrades: " + tempGrades);

  //subtraction formula
  let tempWeightAverage = 0;
  let tempsubtotal = 0;
  let tempMinus = 0;

  for (let i = 0; i < numberOfGrades1; i++) {
    tempWeightAverage += params.weightArray[i];
    tempMinus = 0.05 * (100 - tempGrades[i]);
    tempsubtotal += tempMinus; // 0.05*(100 - tempGrades[i]);
    console.log(
      "grade: " +
        tempGrades[i] +
        " gpaWeight: " +
        params.weightArray[i] +
        " index: " +
        i +
        " tempMinus: " +
        tempMinus +
        " tempsubtotal: " +
        tempsubtotal +
        " tempWeightAverage: " +
        tempWeightAverage,
    );
  }
  const weightaverage2 = tempWeightAverage / numberOfGrades1;

  let unweighted = 0;
  let weighted = 0;
  console.log(tempWeightAverage);
  if (params.isPrevGradesSet) {
    console.log(
      "calculating cumulative: weightaverage2 (" +
        weightaverage2 +
        ") " +
        "- tempsubtotal (" +
        tempsubtotal +
        ") " +
        "/ numberOfGrades1 (" +
        numberOfGrades1 +
        ")",
    );
    unweighted = 4.0 - tempsubtotal / numberOfGrades1;
    weighted = weightaverage2 - tempsubtotal / numberOfGrades1;
  } else {
    console.log(gpa_sub + " " + gpa_cnt);
    unweighted = 4.0 - gpa_sub / gpa_cnt;
    weighted = params.weightAverage - gpa_sub / gpa_cnt;
  }
  console.log("weighted: " + weighted + " unweighted:" + unweighted);

  // use algorithm value to see which GPA value to use
  console.log("algNumber: " + params.algNumber);
  let finalWeightedNumber = 0;
  let finalUnweightedNumber = 0;
  if (params.algNumber == 1) {
    finalWeightedNumber = weighted;
    finalUnweightedNumber = unweighted;
    console.log("algnumber is 1");
  } else {
    finalWeightedNumber = gpaAverageW;
    finalUnweightedNumber = gpaAverageU;
    console.log("algnumber is 2");
  }
  return [finalUnweightedNumber, finalWeightedNumber];
}

/**
 * Display the final GPA on Skyward
 *
 * @param {number} unweighted - Unweighted GPA
 * @param {number} weighted - Weighted GPA
 * @param {calculateGPAParams} params - Object containing some parameters
 * @param {Settings} settings - Extension settings
 */
export function displayGPA(
  unweighted: number,
  weighted: number,
  params: calculateGPAParams,
  settings: Settings,
) {
  const gpa_container = document.createElement("div");
  gpa_container.setAttribute("style", "float:right; margin-right:5px;");
  let GPAstr =
    '<h2 class="sf_heading">Unweighted GPA: ' +
    (Math.round(unweighted * 1000) / 1000).toString() +
    " || ";
  let detectNaN = params.weightAverage;
  let finalerrormessage = 0;
  detectNaN = +detectNaN || 0;
  if (detectNaN === 0) {
    finalerrormessage = 1;
  }

  if (finalerrormessage === 1) {
    GPAstr += "Select class weights to see weighted GPA </h2>";
  } else {
    GPAstr +=
      "Weighted GPA: " +
      (Math.round(weighted * 1000) / 1000).toString() +
      "</h2>";
  }

  const currentGPAStr = JSON.stringify(params.currentGPAJSON).replace(/"/g, "'");
  GPAstr += `<a target="_blank" href="http://captainbboy.github.io?import=${currentGPAStr}">Export to captainbboy.github.io</a>`;

  GPAstr +=
    '<button type="button" style="float: right;" id="saveGraphBtn">Save to graph</button><p><a target="_blank" style="text-align: right;" href=' +
    chrome.runtime.getURL("gpachart.html") +
    ">See GPA graph</a></p>";

  gpa_container.innerHTML = GPAstr;
  console.log("detectNaN: " + detectNaN);
  console.log(gpa_container.innerHTML);

  const container = document.getElementById("printGradesContainer");
  container.prepend(gpa_container);

  document
    .getElementById("saveGraphBtn")
    .addEventListener("click", function(){saveGPAtoGraph(unweighted, weighted, settings)});

  chrome.storage.local.get(["autosaveSetting"], function (data) {
    settings.autosaveSetting =
      data.autosaveSetting == undefined ? false : data.autosaveSetting;
    if (settings.autosaveSetting == true) {
      saveGPAtoGraph(unweighted, weighted, settings);
    }
    if (settings.autosaveSetting == false) {
      console.log(
        "Setting to automatically save GPA to graph has been disabled",
      );
    }
  });
}
