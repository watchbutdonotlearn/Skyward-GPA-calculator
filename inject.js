console.log("lmao")

var myJavaScript = "setInterval(function(){gUsrIdle.clearIdle();console.log('lmao1');}, 10000);";
var scriptTag = document.createElement("script");
scriptTag.innerHTML = myJavaScript;
document.head.appendChild(scriptTag); 

let url = location.href;
let page = url.split("/scripts/wsisa.dll/WService=wsEAplus/")[1];
console.log("[DEBUG] page = " + page);

var weightaverage = 4.0;
var algNumber = 1;
var classSumArray = [];
var weightArray = [];
function calculateGPA() {
    let container = document.getElementById("printGradesContainer"); // Get main node
    // Find grade node
    let grade_container = null;
    for(let i = 0; i < container.children.length; i++){
        let child = container.children[i];
        if(child.id.substring(0, 18) === "grid_stuGradesGrid"){
            grade_container = child;
            break;
        }
    }
    if(grade_container === null){
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
				//console.log(final_grade);
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
				//console.log(classSumArray);
			}else{
				//gpa_cnt is an odd number
				classSum += final_grade;
			}
        }
    }
    //average formula weighted
	let preGPAw = 0;
	let preGPAsum = 0
	for(let i=0; i < 7; i++){
		preGPAw = weightArray[i] * classSumArray[i] * 0.01;
		//console.log(preGPAw);
		preGPAsum = preGPAsum + preGPAw;
		preGPAw = 0;
	}
	var gpaAverageW = preGPAsum / 7;
	console.log(gpaAverageW);
	let preGPAu = 0;
	preGPAsum = 0
	for(let i=0; i < 7; i++){
		preGPAu = 4 * classSumArray[i] * 0.01;
		//console.log(preGPAu);
		preGPAsum = preGPAsum + preGPAu;
		preGPAu = 0;
	}
	var gpaAverageU = preGPAsum / 7;
	console.log(gpaAverageU);
	//subtraction formula
	console.log(gpa_sub + " " + gpa_cnt);
    let unweighted = 4.0 - gpa_sub / gpa_cnt;
    let weighted = weightaverage - gpa_sub / gpa_cnt;
    console.log(weighted);
    //use algorithm value to see which GPA value to use
	var finalWeightedNumber;
	var finalUnweightedNumber;
	console.log(algNumber)
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
    let detectNaN = weighted;
    detectNaN = +detectNaN || 0;
    if(detectNaN === 0){
        GPAstr += "Select class weights to see weighted GPA </h2>";
    }else{
        GPAstr += "Weighted GPA: " + (Math.round(finalWeightedNumber * 1000) / 1000).toString() + "</h2>"   
    }
    gpa_container.innerHTML = GPAstr;
    console.log(detectNaN);
    console.log(gpa_container.innerHTML)
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
		console.log(algNumber);
	});
}
something();

//get weights
if(page == "sfgradebook001.w"){
    chrome.storage.local.get(['storedGPA1', 'storedGPA2', 'storedGPA3', 'storedGPA4', 'storedGPA5', 'storedGPA6', 'storedGPA7'], function(data){
		let weightsum = 0.0;
        let data_len = 0;
		for(let [key, value] of Object.entries(data)){
            weightsum += parseFloat(value);
            data_len++;
			pushWeightArray = weightArray.push(parseFloat(value));
        }
		console.log(weightArray);
        if(data_len < 7){
            weightsum = NaN;
            console.log(weightsum);
        }
        console.log(weightsum);
        weightaverage = weightsum / 7;
        console.log(weightaverage);
        
		calculateGPA();
    });
}
