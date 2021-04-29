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
	
	// START GETELEMENTBYIDing EVERYTHING NOW LMAO I HATE LIFE
	
	
}
function showhide(){
    console.log("ok this works i guess lol");
	myFunction();
	myFunction2();
}

function getGPAValues(){
	
	
}