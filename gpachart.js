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
                data: unweightedValues
            },{
                pointRadius: 4,
                label: "weighted",
                backgroundColor: "rgb(0,170,90)",
                data: weightedValues
            }]
        },
        options: {
            legend: {display: true},
            scales: {
                //yAxes: [{ticks: {max:5}}],
                //xAxes: {ticks: {min: (GPAGraphArray[0].timestamp-0.2)}/*, type:'time', time: {tooltipFormat: 'DD T'}*/}
            }
        }
    })
}

function clearValues(){
    let emptyarray = [];
    chrome.storage.local.set({GPAGraphArray: emptyarray});
    console.log('clearing array')
}

window.onload=function(){
    document.getElementById('clearGraphBtn').addEventListener('click', clearValues);
    getChartStorage()
}
