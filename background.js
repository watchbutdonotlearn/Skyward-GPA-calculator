function myFunction() {
	var x = document.getElementById("weightselectordiv");
	var GPAForms = document.getElementsByClassName("GPAForm");
	var openSkyward = document.getElementById("openSkyward");
	var GPAFormHolder = document.getElementById("GPAFormHolder")
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
	chrome.storage.local.get(['numberOfClasses', 'classNames'], function(data){
		console.log('Number Of Classes (from storage): ')
		console.log(data)
		if(!data.numberOfClasses || !data.classNames) {
			openSkyward.style.display = 'block';
		}
		else {
			let biggestClassTitleWidth = 0;
			openSkyward.style.display = 'none';
			GPAFormHolder.style.display = "block";
			console.log(GPAForms)
			for (let i = 0; i < GPAForms.length; i++) {
				if(i < parseInt(data['numberOfClasses'])) {
					GPAForms[i].style.display = "block";
					let classTitleEl = GPAForms[i].getElementsByClassName('classTitle')[0]
					classTitleEl.innerHTML = data.classNames[i]
					if(classTitleEl.offsetWidth > biggestClassTitleWidth) biggestClassTitleWidth = classTitleEl.offsetWidth
				}
			}
			console.log('biggestClassTitleWidth: '+biggestClassTitleWidth+"px")
			let classTitles = document.getElementsByClassName('classTitle')
			for (let o = 0; o < classTitles.length; o++) {
				classTitles[o].style.minWidth = `${biggestClassTitleWidth+20}px`	
			}
		}
	})
}

function myFunction3() {
	var x = document.getElementById("settingsdiv");
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}

function myFunction2() {
	var z = document.getElementById("mainPage");
	if (z.style.display === "none") {
		z.style.display = "block";
	} else {
		z.style.display = "none";
	}
}

var y = document.getElementById("weightselectordiv");
y.style.display = "none";

var z = document.getElementById("settingsdiv");
z.style.display = "none";

window.onload=function(){
    document.getElementById('popupBtn').addEventListener('click', showhide);
	document.getElementById('closeWeight').addEventListener('click', showhide);
	document.getElementById('closeWeight').addEventListener('click', getGPAValues);
	document.getElementById('closeNoSave').addEventListener('click', showhide);
	document.getElementById('closeNoSave').addEventListener('click', returnWeights);
	document.getElementById('popupBtn2').addEventListener('click', showhide2);
	document.getElementById('closeSettings').addEventListener('click', showhide2);
	document.getElementById('closeSettings').addEventListener('click', getAlgorithm);
	document.getElementById('closeSettings').addEventListener('click', storeDivNumberGrades);
	document.getElementById('closeSettingsNoSave').addEventListener('click', showhide2);
	document.getElementById('closeSettingsNoSave').addEventListener('click', returndivgrades);
	document.getElementById('closeSettingsNoSave').addEventListener('click', returnAlgorithm);
	document.getElementById('clearWeightSelections').addEventListener('click', clearWeightForms);
	
	function returnWeights(){
		clearRads();
		var i = 1;
		for(i=1; i<9; i++){(function(mykey) {
			console.log(i);
			//Now get value from Chrome Storage using this myKey.
			mykey = 'storedGPA' + i;
			var a = i;
			chrome.storage.local.get(mykey , function(items) {
				someValue = items[mykey];
				console.log(someValue);
				let seeIfUndefined = someValue;
				seeIfUndefined = +seeIfUndefined || 0;
				if(seeIfUndefined === 0){
					console.log('Weights currently unselected')
				}else{
					let getRadioId = someValue.toString() + '-' + a.toString();
					console.log(getRadioId);
					let getFormId = 'form' + someValue.toString();
					const selectItem = document.getElementById(getRadioId);
					const newItem = document.createElement('radio');
					newItem.innerHTML = '<input type="radio" id="' + getRadioId + '" name="GPA" value="' + someValue + '" checked="checked">';
					selectItem.parentNode.replaceChild(newItem, selectItem);
				}
			});
		}('storedGPA' + i.toString()))}
	}
	
	returnWeights();
	
	function returnAlgorithm(){
		chrome.storage.local.get(['storedAlgorithm'] , function(items) {
			console.log(items.storedAlgorithm);
			let algValue = items.storedAlgorithm;
			algValue = +algValue || 0;
			var algValueCorrected = algValue;
			if(algValue === 0){
				chrome.storage.local.set({storedAlgorithm: 1});
				console.log("changing stored algorithm from blank to default value of 1")
				algValueCorrected = 1;
			}
			//change radio of settings to saved value
			let getRadioId = "Alg" + algValueCorrected.toString();
			console.log(getRadioId);
			let getFormId = "algorithmsetting";
			const selectedItem = document.getElementById(getRadioId);
			console.log(selectedItem);
			const newItem1 = document.createElement('radio');
			newItem1.innerHTML = '<input type="radio" id="Alg' + algValue + '" name="algorithm" value="' + algValue + '" checked="checked">';
			selectedItem.parentNode.replaceChild(newItem1, selectedItem);
		})
	}
	returnAlgorithm();
	
	function returndivgrades(){
		chrome.storage.local.get(['storedGradesDivNum'] , function(items) {
			console.log(items.storedGradesDivNum);
			let numValue = items.storedGradesDivNum;
			numValue = +numValue || 0;
			var numValueCorrected = numValue;
			if(numValue === 0){
				chrome.storage.local.set({storedGradesDivNum: 1});
				console.log("changing stored grade div number from blank to default value of 1")
				numValueCorrected = 1;
			}
			//change radio of settings to saved value
			let getRadioId = "gradeDiv" + numValueCorrected.toString();
			console.log(getRadioId);
			let getFormId = "divnumbersetting";
			const selectedItem = document.getElementById(getRadioId);
			console.log(selectedItem);
			const newItem1 = document.createElement('radio');
			newItem1.innerHTML = '<input type="radio" id="gradeDiv' + numValue + '" name="gradeDivNumber" value="' + numValue + '" checked="checked">';
			selectedItem.parentNode.replaceChild(newItem1, selectedItem);
		})
	}
	returndivgrades();
	
}
function showhide(){
    console.log("ok this works i guess lol");
	myFunction();
	myFunction2();
}

function showhide2(){
	console.log("ok this works i guess lol");
	myFunction2();
	myFunction3();
}


function getGPAValues(){
	//begin saving the GPA weights to variables
	var gpa1 = document.forms.GPAform1.GPA.value;
	console.log("GPA1 Form Value:"+gpa1);
	var gpa2 = document.forms.GPAform2.GPA.value;
	console.log("GPA2 Form Value:"+gpa2);
	var gpa3 = document.forms.GPAform3.GPA.value;
	console.log("GPA3 Form Value:"+gpa3);
	var gpa4 = document.forms.GPAform4.GPA.value;
	console.log("GPA4 Form Value:"+gpa4);
	var gpa5 = document.forms.GPAform5.GPA.value;
	console.log("GPA5 Form Value:"+gpa5);
	var gpa6 = document.forms.GPAform6.GPA.value;
	console.log("GPA6 Form Value:"+gpa6);
	var gpa7 = document.forms.GPAform7.GPA.value;
	console.log("GPA7 Form Value:"+gpa7);
	var gpa8 = document.forms.GPAform8.GPA.value;
	if(gpa8) console.log("GPA8 Form Value:"+gpa8);
	
	// begin storing variables in local storage
	chrome.storage.local.set({storedGPA1: gpa1});
	chrome.storage.local.set({storedGPA2: gpa2});
	chrome.storage.local.set({storedGPA3: gpa3});
	chrome.storage.local.set({storedGPA4: gpa4});
	chrome.storage.local.set({storedGPA5: gpa5});
	chrome.storage.local.set({storedGPA6: gpa6});
	chrome.storage.local.set({storedGPA7: gpa7});
	chrome.storage.local.set({storedGPA8: gpa8});
}

function getAlgorithm(){
	let algorithmValue = document.forms.algorithmForm.algorithm.value;
	console.log(algorithmValue);
	chrome.storage.local.set({storedAlgorithm: algorithmValue});
}

function clearRads() {
	var radList = document.getElementsByName("GPA");
	for (var i = 0; i < radList.length; i++) {
		if(radList[i].checked) document.getElementById(radList[i].id).checked = false;
	}
}

function clearWeightForms(){
	let currentform = "";
	clearRads();
}

function storeDivNumberGrades(){
	let gradesDivNumberValue = document.forms.divnumberForm.gradeDivNumber.value;
	console.log(gradesDivNumberValue);
	chrome.storage.local.set({storedGradesDivNum: gradesDivNumberValue});
}
