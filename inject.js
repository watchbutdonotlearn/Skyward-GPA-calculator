console.log("Attempting to inject script")

var myJavaScript = "console.log('injected script successfully');setInterval(function(){gUsrIdle.clearIdle();console.log('cleared idle');}, 10000);";
var scriptTag = document.createElement("script");
scriptTag.innerHTML = myJavaScript;
document.head.appendChild(scriptTag); 

let url = location.href;
let page = url.split("/scripts/wsisa.dll/WService=wsEAplus/")[1];
console.log("[DEBUG] page = " + page);

chrome.storage.local.get(['skywardDarkTheme'], function(data){
	console.log(data);
	if(data.skywardDarkTheme == true) {
		let newElem1 = document.createElement("link")
		newElem1.rel = "STYLESHEET"
		newElem1.href = chrome.extension.getURL("css/qsfmain001.css");
		document.head.appendChild(newElem1);
		
		let newElem2 = document.createElement("link")
		newElem2.rel = "STYLESHEET"
		newElem2.href = chrome.extension.getURL("css/sfhome001.css");
		document.head.appendChild(newElem2);
		
		let oldCSS = document.getElementsByTagName("link");
		
		for (let i = 0; i < oldCSS.length; i++) {
			const element = oldCSS[i];
			if(element.href.includes("qcssloader.p?file=qsfmain001.css")) {
				element.remove();
			}
			if(element.href.includes("qcssloader.p?file=sfhome001.cs")) {
				element.remove();
			}
		}
	}
});

var weightaverage = 4.0;
var algNumber = 1;
var classSumArray = [];
var weightArray = [];

function calculateGPA() {

	setNumberOfClasses()
	setClassNames()

    let container = document.getElementById("printGradesContainer"); // Get main node
    // Find grade node
    let counterthing = 1;
	let grade_container = null;
    for(let i = 0; i < container.children.length; i++){
        let child = container.children[i];
        if(numberOfGradeDivs == 1){
			console.log('number of grade divs is 1')
			if(child.id.substring(0, 18) === "grid_stuGradesGrid"){
				grade_container = child;
				break;
			}
		}else{
			console.log('number of grade divs is 2')
			if(child.id.substring(0, 18) === "grid_stuGradesGrid"){
				counterthing++
				if(counterthing === 2){
					continue;
				}
				grade_container = child;
				break;
			}
		}
    }
	console.log(grade_container)
    if(grade_container === null){
        console.log("[ERROR] Grades not found");
        return;
    }
	let detectUndefined = grade_container;
	//detectUndefined = +detectUndefined || 0;
	if(detectUndefined === undefined){
        console.log("[ERROR] Grades not found");
        return;
    }
    // Get grades
    let inner_grades = grade_container.children[2].children[0].children[0].children[0].children[1].children[0].children[0];
    console.log(inner_grades);
    let gpa_sub = 0;
    let gpa_cnt = 0;
	let classSum = 0;
    for(let i = 0; i < inner_grades.children.length; i++){
        let child = inner_grades.children[i];
        if(child.hasAttribute("group-parent")){
            let final_grade = -1;
            for(let j = 0; j < child.children.length; j++){
                let c_child = child.children[j];
                if(c_child.children[0].innerHTML.length < 10) continue;
                final_grade = parseInt(c_child.children[0].children[0].innerHTML);
            }
            //console.log(final_grade);
			if(final_grade === -1) continue;
            gpa_sub += 0.05 * (100 - final_grade);
            gpa_cnt++;
			if(gpa_cnt % 2 == 0){
				//gpa_cnt is even
				classSum += final_grade;
				let pushClassArray = classSumArray.push(classSum / 2);
				classSum = 0;
			}else{
				//gpa_cnt is an odd number
				classSum += final_grade;
			}
        }
    }
    let finalerrormessage = 0;
	//average formula weighted
	let preGPAw = 0;
	let preGPAsum = 0;
	let numberOfGrades = classSumArray.length;
	let numberOfGrades1 = classSumArray.length;
	if(numberOfGrades > numberOfWeights){
		console.log(numberOfGrades.toString() + 'grades found, but only' + numberOfWeights.toString() + 'weights selected.');
		finalerrormessage = 2;
		numberOfGrades1 = numberOfWeights;
	}
	if(numberOfGrades < numberOfWeights){
		finalerrormessage = 3;
		console.log(numberOfGrades.toString() + ' grades found, but ' + numberOfWeights.toString() + ' weights selected');
	}
	for(let i=0; i < numberOfGrades1; i++){
		preGPAw = weightArray[i] * classSumArray[i] * 0.01;
		preGPAsum = preGPAsum + preGPAw;
		preGPAw = 0;
	}
	var gpaAverageW = preGPAsum / numberOfGrades1;
	console.log("gpaAverageW: "+gpaAverageW);
	let preGPAu = 0;
	preGPAsum = 0
	for(let i=0; i < numberOfGrades; i++){
		preGPAu = 4 * classSumArray[i] * 0.01;
		preGPAsum = preGPAsum + preGPAu;
		preGPAu = 0;
	}
	var gpaAverageU = preGPAsum / numberOfGrades;
	console.log("gpaAverageU: "+gpaAverageU);
	console.log("classSumArray: "+classSumArray);
	//subtraction formula
	console.log(gpa_sub + " " + gpa_cnt);
    let unweighted = 4.0 - gpa_sub / gpa_cnt;
    let weighted = weightaverage - gpa_sub / gpa_cnt;
    console.log("weighted: "+weighted);
    //use algorithm value to see which GPA value to use
	var finalWeightedNumber;
	var finalUnweightedNumber;
	console.log("algNumber: "+algNumber)
	if(algNumber == 1){
		finalWeightedNumber = weighted;
		finalUnweightedNumber = unweighted;
		console.log('algnumber is 1');
	}else{
		finalWeightedNumber = gpaAverageW;
		finalUnweightedNumber = gpaAverageU;
		console.log('algnumber is 2');
	}
	// Display GPA
	let gpa_container = document.createElement("div");
    gpa_container.style = "float:right; margin-right:5px;";
    let GPAstr = "<h2 class=\"sf_heading\">Unweighted GPA: " + (Math.round(finalUnweightedNumber * 1000) / 1000).toString() + " || ";
    let detectNaN = weightaverage;
    detectNaN = +detectNaN || 0;
    /* if(numberOfWeights != classSumArray.length){
		weighted = NaN;
	} */
	if(detectNaN === 0){
		finalerrormessage = 1;
	}
	
	if(finalerrormessage === 1){
        GPAstr += "Select class weights to see weighted GPA </h2>";
    }else if(finalerrormessage === 2){
		GPAstr += numberOfGrades.toString() + ' grades found, but only ' + numberOfWeights.toString() + ' weights selected'
	}else if(finalerrormessage === 3){
		GPAstr += numberOfGrades.toString() + ' grades found, but ' + numberOfWeights.toString() + ' weights selected'
	}
	else{
        GPAstr += "Weighted GPA: " + (Math.round(finalWeightedNumber * 1000) / 1000).toString() + "</h2>"   
    }
    gpa_container.innerHTML = GPAstr;
    console.log("detectNaN: "+detectNaN);
    console.log(gpa_container.innerHTML);
    container.prepend(gpa_container);
};

function something(){
	chrome.storage.local.get(['storedAlgorithm'], function(data){
		console.log(data);
		algNumber = data.storedAlgorithm;
		let senseNaN = algNumber;
		senseNaN = +senseNaN || 0;
		if(senseNaN === 0){
			algNumber = 1;
		}
	});
}
something();

var numberOfGradeDivs;
function something2(){
	chrome.storage.local.get(['storedGradesDivNum'], function(data){
		console.log(data);
		numberOfGradeDivs = data.storedGradesDivNum;
		let senseNaN = numberOfGradeDivs;
		senseNaN = +senseNaN || 0;
		if(senseNaN === 0){
			numberOfGradeDivs = 1;
		}
		console.log(numberOfGradeDivs)
	});
}
something2();

//get weights
var numberOfWeights;
if(page == "sfgradebook001.w"){
    chrome.storage.local.get(['storedGPA1', 'storedGPA2', 'storedGPA3', 'storedGPA4', 'storedGPA5', 'storedGPA6', 'storedGPA7', 'storedGPA8'], function(data){
		let weightsum = 0.0;
        let data_len = 0;
		for(let [key, value] of Object.entries(data)){
            data_len++;
			let value1 = value;
			if(!!value == false){
				value1 = 0;
			}
			weightsum += parseFloat(value1);
			pushWeightArray = weightArray.push(parseFloat(value));
        }
		console.log(weightArray);
		weightArray = weightArray.filter(e => (e === 0 || e));
		console.log(weightArray);
		numberOfWeights = weightArray.length;
		console.log(numberOfWeights);
		console.log(weightsum);
        if(data_len < 8){
            weightsum = NaN;
        }
        console.log(weightsum);
        weightaverage = weightsum / numberOfWeights;
        console.log(weightaverage);
        
		calculateGPA();
    });
}

function setNumberOfClasses() {
	let length = 0;
	length = document.getElementsByClassName('cPd vAm bZe tOA gDt3R').length
	length = length / 2 // 2 Semesters
	length = length / 2 // 2 Elements per row (title and grades)
	console.log("Number Of Classes: "+length)
	chrome.storage.local.set({numberOfClasses: length});
}

function setClassNames() {
	let classNamesArray = []
	let classNames = document.getElementsByClassName('bld classDesc')
	for (let l = 0; l < classNames.length; l++) {
		classNamesArray.push(classNames[l].firstChild.innerText)
	}
	classNamesArray = [...new Set(classNamesArray)]
	chrome.storage.local.set({classNames: classNamesArray});
}