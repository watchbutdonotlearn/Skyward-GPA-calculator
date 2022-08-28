console.log("Attempting to inject script")

var sLoad = document.createElement('script2');
sLoad.src = chrome.runtime.getURL('script2.js');
(document.head || document.documentElement).appendChild(sLoad);

//var myJavaScript = "console.log('injected script successfully');setInterval(function(){gUsrIdle.clearIdle();console.log('cleared idle');}, 10000);";
var scriptTag = document.createElement("script");
scriptTag.src = chrome.runtime.getURL('script2.js');
document.head.appendChild(scriptTag);

/*
function refreshLogin() {
	console.log('injected script successfully');setInterval(function(){gUsrIdle.clearIdle();console.log('cleared idle');}, 10000);
}

 */

//I REALLY REALLY HATE MANIFEST V3
//console.log('injected script successfully');setInterval(function(){gUsrIdle.clearIdle();console.log('cleared idle');}, 10000);

let url = location.href;
let page = url.split("/scripts/wsisa.dll/WService=")[1].split("/")[1];
console.log("[DEBUG] page = " + page);

chrome.storage.local.get(['skywardDarkTheme'], function(data){
	console.log(data);
	if(data.skywardDarkTheme == true) {
		let variablesCSS = document.createElement("link")
		variablesCSS.rel = "STYLESHEET"
		variablesCSS.href = chrome.runtime.getURL("css/variables.css");
		document.head.appendChild(variablesCSS);

		let qsfmainCSS = document.createElement("link")
		qsfmainCSS.rel = "STYLESHEET"
		qsfmainCSS.href = chrome.runtime.getURL("css/qsfmain001.css");
		document.head.appendChild(qsfmainCSS);

		if(page != "seplog01.w") {
			let newElem2 = document.createElement("link")
			newElem2.rel = "STYLESHEET"
			newElem2.href = chrome.runtime.getURL("css/sfhome001.css");
			document.head.appendChild(newElem2);

			let newElem4 = document.createElement("link")
			newElem4.rel = "STYLESHEET"
			newElem4.href = chrome.runtime.getURL("css/sfgradebook001.css");
			document.head.appendChild(newElem4);
		} else {
			let newElem3 = document.createElement("link")
			newElem3.rel = "STYLESHEET"
			newElem3.href = chrome.runtime.getURL("css/qclssbase001.css");
			document.head.appendChild(newElem3);

			let newElem4 = document.createElement("link")
			newElem4.rel = "STYLESHEET"
			newElem4.href = chrome.runtime.getURL("css/qclsslogin001.css");
			document.head.appendChild(newElem4);

			var children = document.getElementById("loginBrading").children
			console.log(children)
			for(child in children) {
				if(children[child].src) children[child].src = chrome.runtime.getURL("SkyLogoBlue.png");
			}
		}

		if(page == "sfgradebook001.w") {
			let styleElements = document.getElementsByTagName("style");
			for (let i = 0; i < styleElements.length; i++) {
				let element = styleElements[i];
				if(element.innerHTML.includes("#sf_OuterWrap td.cCl {background-color:#FFFFFF")) {
					element.innerHTML = `
					#sf_OuterWrap td.cCl {
						background-color:var(--main-bg-color) !important;
						border-bottom:1px solid #D6DFEA !important;
						padding:3px 4px 3px 2px !important;
					}
					#sf_OuterWrap th.cCl {
						padding:3px 4px 3px 2px !important;
					}
					`
				}
			}
		}

		if(page == "sfcalendar002.w") {
			let calenderJQueryCSS = document.createElement("link")
			calenderJQueryCSS.rel = "STYLESHEET"
			calenderJQueryCSS.href = chrome.runtime.getURL("css/jquery.cluetip.css");
			document.head.appendChild(calenderJQueryCSS);

			let styleElements = document.getElementsByTagName("style");
			for (let i = 0; i < styleElements.length; i++) {
				let element = styleElements[i];
				if(element.innerHTML.includes("span.fc-event-title {overflow:hidden; white-space:nowrap}")) {
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
					`
				}
			}
		}

		let oldCSS = document.getElementsByTagName("link");
			
		// for (let i = 0; i < oldCSS.length; i++) {
		// 	const element = oldCSS[i];
		// 	if(element.href.includes("qcssloader.p?file=sfgradebook.css")) {
		// 		element.remove();
		// 	}
		// 	/* // Has to stay commented for some reason bc it breaks gradebook without it.
		// 	if(element.href.includes("qcssloader.p?file=qsfmain001.css")) {
		// 		element.remove();
		// 	}
		// 	*/
		// 	if(element.href.includes("qcssloader.p?file=sfhome001.cs")) {
		// 		element.remove();
		// 	}
		// 	if(element.href.includes("qcssloader.p?file=qclssbase001.css")) {
		// 		element.remove();
		// 	}
		// 	if(element.href.includes("qcssloader.p?file=qclsslogin001.css")) {
		// 		element.remove();
		// 	}
		// 	if(element.href.includes("qcssloader.p?file=jquery.cluetip.css")) {
		// 		element.remove();
		// 	}
		// }
	}
});

var weightaverage = 4.0;
var algNumber = 1;
// var classSumArray = [];
var weightArray = [];

var currentGPAJSON = {
	"Current Skyward Grades": {
		classNames: [

		], 
		inputtedGPAValues: [

		],
		inputtedGradeValues: [

		],
		setNumberOfClasses: ""
	}
};

var finalWeightedNumber;
var finalUnweightedNumber;
var timestamp;

var autosaveSetting;

var prevSemesterGrades = [];
var prevSemesterWeights = [];


let myPromise = new Promise(function(myResolve, myReject) {
    // "Producing Code" (May take some time)
    
    chrome.storage.local.get(['storedCumulativeGrades'], function(data){
        console.log(JSON.parse(data.storedCumulativeGrades))
        if(typeof data != undefined){
            isPrevGradesSet = 1
        }
        if(isPrevGradesSet == 1){
            let tempPrevSemesterGrades = data.storedCumulativeGrades;
            let PrevSemesterGradesJSON = JSON.parse(tempPrevSemesterGrades);
            for(i in PrevSemesterGradesJSON){
                console.log(PrevSemesterGradesJSON[i].inputtedGradeValues);
                prevSemesterGrades = prevSemesterGrades.concat(PrevSemesterGradesJSON[i].inputtedGradeValues);
                console.log(prevSemesterGrades);
                prevSemesterWeights = prevSemesterWeights.concat(PrevSemesterGradesJSON[i].inputtedGPAValues);
            }
        }
        
        prevSemesterWeights = prevSemesterWeights.map(Number);
        prevSemesterGrades = prevSemesterGrades.map(Number);
    });
    
    myResolve(); // when successful
});


function saveGPAtoGraph(){
    chrome.storage.local.get(['GPAGraphArray'], function(data){
        let graphHasSet = 0
        let GPAGraphArray = data.GPAGraphArray;
        let hasbeen24hours = 0;
        let isrepeatvalue = 0;
        console.log(GPAGraphArray)
        if(GPAGraphArray == undefined){
            console.log('GPA graph JSON value is not yet set')
            graphHasSet = 1
        }
        else if(GPAGraphArray == []){
            console.log('GPA graph JSON value is not yet set')
            graphHasSet = 1
        }
        else if(GPAGraphArray.length == 0){
            console.log('GPA graph JSON value is not yet set')
            graphHasSet = 1
        }
        timestamp = Math.round(Date.now()/10000);
        if(graphHasSet == 0){
            console.log('graphHasSet is 0, checking for repeat')
            if(GPAGraphArray[GPAGraphArray.length - 1].weighted == finalWeightedNumber){
                console.log('repeated value')
                graphHasSet = 2
                isrepeatvalue = 1
            }
            else if(GPAGraphArray[GPAGraphArray.length - 1].unweighted == finalUnweightedNumber){
                console.log('repeated value')
                graphHasSet = 2
                isrepeatvalue = 1
            }
            console.log(GPAGraphArray[GPAGraphArray.length-1].timestamp)
            console.log(timestamp)
            if(GPAGraphArray[GPAGraphArray.length-1].timestamp + 8600 < timestamp){
                graphHasSet = 0
                hasbeen24hours = 1
                console.log('last date is 24 hours before')
            }
        }
        if(autosaveSetting == true){
            originalGraphHasSet = graphHasSet
            graphHasSet = 3
        }
        if(graphHasSet == 0){
            console.log('appending GPA to array and saving')
            GPAGraphArray.push({unweighted:finalUnweightedNumber, weighted:finalWeightedNumber, timestamp:timestamp})
            chrome.storage.local.set({GPAGraphArray: GPAGraphArray});
            document.getElementById('saveGraphBtn').outerHTML = '<button type="button" style="float: right;" id="saveGraphBtn" disabled>Save to graph</button>'
        }
        else if(graphHasSet == 1){
            console.log('saving GPA for first time')
            let GPAGraphTempValues = [{unweighted:finalUnweightedNumber, weighted:finalWeightedNumber, timestamp:timestamp}]
            chrome.storage.local.set({GPAGraphArray: GPAGraphTempValues});
            document.getElementById('saveGraphBtn').outerHTML = '<button type="button" style="float: right;" id="saveGraphBtn" disabled>Save to graph</button>'
        }
        else if(graphHasSet == 3){
            console.log('autosave is enabled')
            document.getElementById('saveGraphBtn').outerHTML = '<button type="button" style="float: right;" id="saveGraphBtn" disabled>autosave enabled</button>'
            if(hasbeen24hours == 1 || originalGraphHasSet == 0){
                console.log('appending GPA to array and saving')
                GPAGraphArray.push({unweighted:finalUnweightedNumber, weighted:finalWeightedNumber, timestamp:timestamp})
                chrome.storage.local.set({GPAGraphArray: GPAGraphArray});
            }
            else if(originalGraphHasSet == 1){
                console.log('saving GPA for first time')
                let GPAGraphTempValues = [{unweighted:finalUnweightedNumber, weighted:finalWeightedNumber, timestamp:timestamp}]
                chrome.storage.local.set({GPAGraphArray: GPAGraphTempValues});
            }
        }
        else{
            console.log('not saving GPA value due to repeat')
            document.getElementById('saveGraphBtn').outerHTML = '<button type="button" style="float: right;" id="saveGraphBtn" disabled>cannot save duplicate GPA</button>'
        }
    })
}

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

	// let classNamesArray = [];
	// let classNames = document.getElementsByClassName('bld classDesc') // Class Names:
	// for (let l = 0; l < classNames.length; l++) {
	// 	classNamesArray.push(classNames[l].firstChild.innerText)
	// }

	// let currentClass = 0;
	let tempGrades = [];

    for(let i = 0; i < inner_grades.children.length; i++){
        let child = inner_grades.children[i];
        if(child.hasAttribute("group-parent")){
            let final_grade = -1;
            for(let j = 0; j < child.children.length; j++){
                let c_child = child.children[j];
                if(c_child.children[0].innerHTML.length < 10) continue;
                final_grade = parseInt(c_child.children[0].children[0].innerHTML);
            }
            
			if(final_grade !== -1) {
				gpa_sub += 0.05 * (100 - final_grade);
				gpa_cnt++;
			}
			
            //gpa_sub += 0.05 * (100 - final_grade);
            //gpa_cnt++;
			
			console.log("final_grade: "+final_grade)

			tempGrades.push(final_grade)

			/*

			if(classNamesArray[currentClass] == classNamesArray[currentClass + 1]) {
				// then this is the first semester of a year long class
				classSum = 0;
				
			}

			if(classNamesArray[currentClass] == classNamesArray[currentClass - 1]) {
				// then this is the second semester of a year-long class.
				if(final_grade === -1) {
					continue;
				}
				gpa_sub += 0.05 * (100 - final_grade);
				gpa_cnt++;
				classSum += final_grade;
				if(gpa_cnt % 2 == 0){
					//gpa_cnt is even
					classSum += final_grade;
					classSumArray.push(classSum / 2);
					classSum = 0;
				} else {
					//gpa_cnt is an odd number
					classSum += final_grade;
					classSumArray.push(classSum);
				}
			}

			*/

		}
    }

	console.log(tempGrades)
    
	if(tempGrades.includes(-1)) { // it is the first semester or not all grades are in.
		tempGrades = tempGrades.filter(a=>a!==-1)
	}
    
	var numberOfSelectedWeights = numberOfWeights;
    
    let weightArrayTemporary = [];
	let weightArrayOriginal = weightArray
    
    console.log(tempGrades)
    
    if(tempGrades.length > numberOfSelectedWeights){
        for(let i=0; i < weightArray.length; i++){
            weightArrayTemporary.push(weightArray[i])
            weightArrayTemporary.push(weightArray[i])
        }
        weightArray = weightArrayTemporary;
    }
    
    
    
    console.log(weightArray);
    
    console.log("isprevgradesSet:")
    console.log(isPrevGradesSet)
    
    if(isPrevGradesSet == 1){
        console.log('concatenating previous grades to current ones')
        console.log(prevSemesterGrades)
        weightArray = weightArray.concat(prevSemesterWeights)
        console.log(weightArray)
        tempGrades = tempGrades.concat(prevSemesterGrades)
    }
    
    console.log(tempGrades)
    
    let tempGrades1 = tempGrades;
    
    let finalerrormessage = 0;
	//average formula weighted
	let preGPAw = 0;
	let preGPAsum = 0;
	let numberOfGrades = tempGrades1.length;
	let numberOfGrades1 = tempGrades1.length;
	
    numberOfWeights = weightArray.length;
    console.log(numberOfWeights)
    
    /*
    if(numberOfGrades > numberOfWeights){
		console.log(numberOfGrades.toString() + 'grades found, but only' + numberOfWeights.toString() + 'weights selected.');
		finalerrormessage = 2;
		numberOfGrades1 = numberOfWeights;
	}
    if(numberOfGrades < numberOfWeights){
		finalerrormessage = 3;
		console.log(numberOfGrades.toString() + ' grades found, but ' + numberOfWeights.toString() + ' weights selected');
	}
	if(numberOfGrades / 2 != numberOfWeights){
        finalerrormessage = 2;
        console.log((numberOfGrades/2).toString() + 'grades found, but ' + numberOfWeights.toString() + ' weights selected.');
    }*/
	
    console.log(weightArray)
    //console.log(numberOfGrades1)
    let debugcounter = 0
	for(let i=0; i < numberOfGrades1; i++){
        preGPAw = weightArray[i] * tempGrades[i] * 0.01;
        if(preGPAw > 0){
            preGPAsum = preGPAsum + preGPAw;
            debugcounter++;
            console.log(preGPAsum)
        }
        preGPAw = 0;
	}
	//console.log(debugcounter)
	
	for(let i=0; i<weightArray.length; i++){
		weightArray[i]=weightArray[i].toFixed(1)
	}
	currentGPAJSON["Current Skyward Grades"].setNumberOfClasses = numberOfGrades.toString();
	currentGPAJSON["Current Skyward Grades"].inputtedGPAValues = weightArrayOriginal
	currentGPAJSON["Current Skyward Grades"].inputtedGradeValues = tempGrades
	
	var gpaAverageW = preGPAsum / numberOfGrades1;
	console.log("gpaAverageW: "+gpaAverageW);
	let preGPAu = 0;
	preGPAsum = 0
	for(let i=0; i < numberOfGrades; i++){
		preGPAu = 4 * tempGrades[i] * 0.01;
		preGPAsum = preGPAsum + preGPAu;
		preGPAu = 0;
	}
	var gpaAverageU = preGPAsum / numberOfGrades;
	console.log("gpaAverageU: "+gpaAverageU);
	console.log("tempGrades: "+tempGrades);
	
    //subtraction formula
	var tempWeightAverage = 0
    var tempsubtotal = 0
    
    for(let i=0; i < numberOfGrades1; i++){
//         preGPAw = 0.05*(100-weightArray[i]) * tempGrades[i] * 0.01;
//         if(preGPAw > 0){
//             preGPAsum = preGPAsum + preGPAw;
//             console.log(preGPAsum)
//         }
//         preGPAw = 0;
        console.log('grade: ' + tempGrades[i] + " gpaWeight: " + weightArray[i] + " index: " + i)
        tempWeightAverage += parseFloat(weightArray[i]);
        tempsubtotal += 0.05*(100 - tempGrades[i]);
	}
    //tempWeightAverage = parseInt(weightArray => weightArray.reduce((a,b) => a + b, 0))
    
    var weightaverage2 = tempWeightAverage / weightArray.length;
    
    let unweighted = 0
    let weighted = 0
    console.log(tempWeightAverage)
    if(isPrevGradesSet == 1){
        console.log('calculating cumulative')
        unweighted = 4.0 - tempsubtotal / numberOfGrades1
        weighted = weightaverage2 - tempsubtotal / numberOfGrades1
    }
    else{
        console.log(gpa_sub + " " + gpa_cnt);
        unweighted = 4.0 - gpa_sub / gpa_cnt;
        weighted = weightaverage - gpa_sub / gpa_cnt;
    }
    console.log("weighted: "+weighted);
    
    //use algorithm value to see which GPA value to use
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
    /* if(numberOfWeights != tempGrades.length){
		weighted = NaN;
	} */
	if(detectNaN === 0){
		finalerrormessage = 1;
	}
	
	if(finalerrormessage === 1){
        GPAstr += "Select class weights to see weighted GPA </h2>";
    }
    /*else if(finalerrormessage === 2){
		GPAstr += numberOfGrades.toString() + ' grades found, but only ' + numberOfWeights.toString() + ' weights selected</h2>'
	}else if(finalerrormessage === 3){
		GPAstr += numberOfGrades.toString() + ' grades found, but ' + numberOfWeights.toString() + ' weights selected</h2>'
	}*/
	else{
        GPAstr += "Weighted GPA: " + (Math.round(finalWeightedNumber * 1000) / 1000).toString() + "</h2>"   
    }
    
	var currentGPAStr = JSON.stringify(currentGPAJSON).replace(/\"/g, "'");
	GPAstr += `<a target="_blank" href="http://captainbboy.github.io?import=${currentGPAStr}">Export to captainbboy.github.io</a>`
	
	GPAstr += '<button type="button" style="float: right;" id="saveGraphBtn">Save to graph</button><p><a target="_blank" style="text-align: right;" href=' + chrome.runtime.getURL('gpachart.html') + '>See GPA graph</a></p>'
	
    gpa_container.innerHTML = GPAstr;
    console.log("detectNaN: "+detectNaN);
    console.log(gpa_container.innerHTML);
    container.prepend(gpa_container);
    
    document.getElementById('saveGraphBtn').addEventListener('click', saveGPAtoGraph);
    
    chrome.storage.local.get(['autosaveSetting'], function(data){
        autosaveSetting = data.autosaveSetting;
        console.log(autosaveSetting)
        if(autosaveSetting == undefined){
            console.log('GPA graph autosave setting value is not yet set')
        }
        else{
            if(autosaveSetting == true){
                saveGPAtoGraph()
            }
            if(autosaveSetting == false){
                console.log('Setting to automatically save GPA to graph has been disabled')
            }
        }
    });
};

function delayStorageGet(){
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
delayStorageGet();

var numberOfGradeDivs;
function delayStorageGet2(){
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
delayStorageGet2();

var isPrevGradesSet = 0
function delayStorageGet3(){
    
    chrome.storage.local.get(['storedCumulativeGrades'], function(data){
        
	});
}
delayStorageGet3()
console.log(isPrevGradesSet)

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
        
        myPromise.then(
            function(value) {console.log('success ig'); calculateGPA();},
        );
        
		
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
