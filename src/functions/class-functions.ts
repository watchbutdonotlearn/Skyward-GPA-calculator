export function setClassNamesAndNumberOfClasses() {
  let classNamesArray = [];
  const classNames = document.getElementsByClassName("bld classDesc");
  for (let l = 0; l < classNames.length; l++) {
    classNamesArray.push(classNames[l].firstChild.innerText);
  }
  classNamesArray = [...new Set(classNamesArray)];
  console.log("Class Names: " + classNamesArray);
  console.log("Number of classes: " + classNamesArray.length);
  chrome.storage.local
    .set({ classNames: classNamesArray })
    .catch(() => "Error in setting class names!");
  chrome.storage.local
    .set({ numberOfClasses: classNamesArray.length })
    .catch(() => "Error in setting number of classes!");
}
