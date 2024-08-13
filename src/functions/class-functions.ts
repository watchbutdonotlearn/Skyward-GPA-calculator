export function setNumberOfClasses() {
  let length = 0;
  length = document.getElementsByClassName("cPd vAm bZe tOA gDt3R").length;
  length = length / 2; // 2 Semesters
  length = length / 2; // 2 Elements per row (title and grades)
  console.log("Number Of Classes: " + length);
  chrome.storage.local.set({ numberOfClasses: length });
}

export function setClassNames() {
  let classNamesArray = [];
  let classNames = document.getElementsByClassName("bld classDesc");
  for (let l = 0; l < classNames.length; l++) {
    classNamesArray.push(classNames[l].firstChild.innerText);
  }
  classNamesArray = [...new Set(classNamesArray)];
  chrome.storage.local.set({ classNames: classNamesArray }).catch(() => "Error in setting class names!");
}
