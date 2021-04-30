function myFunction() {
  var x = document.getElementById("weightselectordiv");
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

/* document.getElementById('popupBtn').addEventListener('click', showhide);
 */

window.onload=function(){
    document.getElementById('popupBtn').addEventListener('click', showhide);
	document.getElementById('closeWeight').addEventListener('click', showhide);
	document.getElementById('closeWeight').addEventListener('click', getGPAValues);
	document.getElementById('closeNoSave').addEventListener('click', showhide);
	document.getElementById('closeNoSave').addEventListener('click', returnWeights);
	
	/* var i;
	for (i = 1; i < 8; i++){
		console.log(i);
		let toGetStorage = ['storedGPA' + i.toString()];
		var storedGPAweight;
		chrome.storage.local.get(toGetStorage, function(data){
			let storedGPAweight = data.toGetStorage;
			
		})
		console.log(storedGPAweight)
		
	} */
	function returnWeights(){
		var i = 1;
		for(i=1; i<8; i++){(function(mykey) {
			console.log(i);
			//Now get value from Chrome Storage using this myKey.
			mykey = 'storedGPA' + i;
			var a = i;
			chrome.storage.local.get(mykey , function(items) {
				someValue = items[mykey];
				console.log(someValue);
				let getRadioId = someValue.toString() + '-' + a.toString();
				console.log(getRadioId);
				let getFormId = 'form' + someValue.toString();
				// document.getElementById(getRadioId).innerHTML = '<input type="radio" id="' + getRadioId + '" name="GPA" value="' + someValue + '">';
				const selectItem = document.getElementById(getRadioId)
				const newItem = document.createElement('radio');
				newItem.innerHTML = '<input type="radio" id="' + getRadioId + '" name="GPA" value="' + someValue + '" checked="checked">';
				selectItem.parentNode.replaceChild(newItem, selectItem);
				
				
				/* const selectItem = document.getElementById(getFormId);
				const newItem = document.createElement('form');
				newItem.innerHTML = '<form id="form' + a + '" name="GPAform7"><div class="class' + a + '">Class ' + a + ' Weight<input type="radio" id="4-' + a + '" name="GPA" value="4"><label for="4">4</label> <input type="radio" id="4.5-' + a + '" name="GPA" value="4.5"><label for="4.5">4.5</label><input type="radio" id="5.0-' + 7 + '" name="GPA" value="5.0"><label for="5">5</label></div></form>';
				*/
				
			});
		}('storedGPA' + i.toString()))}
	}
	
	returnWeights();
}
function showhide(){
    console.log("ok this works i guess lol");
	myFunction();
	myFunction2();
}

function getGPAValues(){
	//begin saving the GPA weights to variables
	var gpa1 = document.forms.GPAform1.GPA.value;
	console.log(gpa1);
	var gpa2 = document.forms.GPAform2.GPA.value;
	console.log(gpa2);
	var gpa3 = document.forms.GPAform3.GPA.value;
	console.log(gpa3);
	var gpa4 = document.forms.GPAform4.GPA.value;
	console.log(gpa4);
	var gpa5 = document.forms.GPAform5.GPA.value;
	console.log(gpa5);
	var gpa6 = document.forms.GPAform6.GPA.value;
	console.log(gpa6);
	var gpa7 = document.forms.GPAform7.GPA.value;
	console.log(gpa7);
	
	// begin storing variables in local storage
	chrome.storage.local.set({storedGPA1: gpa1});
	chrome.storage.local.set({storedGPA2: gpa2});
	chrome.storage.local.set({storedGPA3: gpa3});
	chrome.storage.local.set({storedGPA4: gpa4});
	chrome.storage.local.set({storedGPA5: gpa5});
	chrome.storage.local.set({storedGPA6: gpa6});
	chrome.storage.local.set({storedGPA7: gpa7});
}
