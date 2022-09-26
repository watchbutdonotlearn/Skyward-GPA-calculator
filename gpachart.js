var graphHasSet;
var GPAGraphArray;

function getChartStorage(){
	chrome.storage.local.get(['GPAGraphArray'], function(data){
		graphHasSet = true
        GPAGraphArray = data.GPAGraphArray;
        console.log(GPAGraphArray)
        if(GPAGraphArray == undefined){
            console.log('GPA graph JSON value is not yet set')
            graphHasSet = false
        }
        if(graphHasSet == true){
            initChart()
        }
	});
}

function initChart(){
    /*
    var xValues = [];
    for(i=0;i<GPAGraphArray.length;i++){
        xValues.push(GPAGraphArray[i].timestamp)
    }
    */
    var unweightedValues = [];
    for(i=0;i<GPAGraphArray.length;i++){
        unweightedValues.push({x:GPAGraphArray[i].timestamp, y:GPAGraphArray[i].unweighted})
    }
    var weightedValues = [];
    for(i=0;i<GPAGraphArray.length;i++){
        weightedValues.push({x:GPAGraphArray[i].timestamp, y:GPAGraphArray[i].weighted})
    }
    
    new Chart("GPAChart", {
        type: "scatter",
        data: {
            datasets: [{
                label: "unweighted",
                pointRadius: 4,
                backgroundColor: "rgb(0,30,255)",
                pointBackgroundColor: "rgb(0,30,255)",
                pointBorderColor: "rgb(0,30,255)",
                BorderColor: "rgb(0,30,255)",
                data: unweightedValues,
                fill: false,
                tension: 0,
                showLine: true
            },{
                pointRadius: 4,
                label: "weighted",
                backgroundColor: "rgb(0,170,90)",
                data: weightedValues,
                fill: false,
                tension: 0,
                showLine: true
            }]
        },
        options: {
            legend: {display: true},
            scales: {
                //yAxes: [{ticks: {max:5}}],
                //xAxes: {ticks: {min: (GPAGraphArray[0].timestamp-0.2)}/*, type:'time', time: {tooltipFormat: 'DD T'}*/}
            }
        },
        plugins: [{
            beforeDraw: function(c) {
                var legends = c.legend.legendItems;
                //console.log(c.legend.legendItems);
                c.legend.legendItems[0].fillStyle = "blue";
                c.legend.legendItems[1].fillStyle = "rgb(0,170,90)";
                /*legends.forEach(function(e) {
                    e.fillStyle = 'red';
                });*/
                //console.log(c.legend.legendItems);
            }
        }]
    })
}

function clearValues(){
    let emptyarray = [];
    chrome.storage.local.set({GPAGraphArray: emptyarray});
    console.log('clearing array')
}
function saveAutosaveSetting(){
    var settingValue = document.forms.divdarkmodeForm.autosaveRadio.value;
    console.log(settingValue)
    if(settingValue == 1){
        settingValue = true
    }
    else{
        settingValue = false
    }
    chrome.storage.local.set({autosaveSetting: settingValue});
}


window.onload=function(){
    document.getElementById('clearGraphBtn').addEventListener('click', clearValues);
    document.getElementById('autosavetrue').addEventListener('click', saveAutosaveSetting);
    document.getElementById('autosavefalse').addEventListener('click', saveAutosaveSetting);
    document.getElementById('divdarkmodesetting').addEventListener('click', saveAutosaveSetting);
    getChartStorage()
    function returnAutosaveSetting(){
		chrome.storage.local.get(['autosaveSetting'] , function(items) {
			let enabled = items.autosaveSetting;
			if(enabled === undefined || enabled === null || enabled === 0 || typeof enabled != "boolean"){
				chrome.storage.local.set({autosaveSetting: false});
				console.log("changing stored autosave setting blank to default value of false")
				enabled = false;
			}
			//change radio of settings to saved value
			let getRadioId = "autosave" + enabled.toString();
			const selectedItem = document.getElementById(getRadioId);
			console.log(selectedItem);
			const newItem1 = document.createElement('radio');
			newItem1.innerHTML = '<input type="radio" id="autosave' + enabled.toString() + '" name="autosaveRadio" value="' + (enabled ? "1" : "2") + '" checked="checked">';
			selectedItem.parentNode.replaceChild(newItem1, selectedItem);
            saveAutosaveSetting();
		})
	}
	returnAutosaveSetting();
}
