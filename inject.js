console.log("lmao")

var myJavaScript = "setInterval(function(){gUsrIdle.clearIdle();console.log('lmao1');}, 10000);gUsrIdle = null;";
var scriptTag = document.createElement("script");
scriptTag.innerHTML = myJavaScript;
document.head.appendChild(scriptTag);

(function() {
    'use strict';
    let url = location.href;
    let page = url.split("/scripts/wsisa.dll/WService=wsEAplus/")[1];
    console.log("[DEBUG] page = " + page);
    if(page == "sfgradebook001.w"){
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
        for(let i = 0; i < inner_grades.children.length; i++){
            let child = inner_grades.children[i];
            if(child.hasAttribute("group-parent")){
                let final_grade = -1;
                for(let j = 0; j < child.children.length; j++){
                    let c_child = child.children[j];
                    console.log(c_child.children[0].innerHTML);
                    if(c_child.children[0].innerHTML.length < 10) continue;
                    final_grade = parseInt(c_child.children[0].children[0].innerHTML);
                }
                if(final_grade === -1) continue;
                gpa_sub += 0.05 * (100 - final_grade);
                gpa_cnt++;
            }
        }
        console.log(gpa_sub + " " + gpa_cnt);
        let unweighted = 4 - gpa_sub / gpa_cnt;
        console.log(unweighted);
        // Display GPA
        let gpa_container = document.createElement("div");
        gpa_container.style = "float:right; margin-right:5px;";
        gpa_container.innerHTML = "<h2 class=\"sf_heading\">GPA: " + (Math.round(unweighted * 1000) / 1000).toString() + "</h2>";
        container.prepend(gpa_container);
    }
})();