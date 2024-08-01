export function setDarkMode(page: string) {
  let variablesCSS = document.createElement("link");
  variablesCSS.rel = "STYLESHEET";
  variablesCSS.href = chrome.runtime.getURL("css/variables.css");
  document.head.appendChild(variablesCSS);

  let qsfmainCSS = document.createElement("link");
  qsfmainCSS.rel = "STYLESHEET";
  qsfmainCSS.href = chrome.runtime.getURL("css/qsfmain001.css");
  document.head.appendChild(qsfmainCSS);

  if (page != "seplog01.w") {
    let newElem2 = document.createElement("link");
    newElem2.rel = "STYLESHEET";
    newElem2.href = chrome.runtime.getURL("css/sfhome001.css");
    document.head.appendChild(newElem2);

    let newElem4 = document.createElement("link");
    newElem4.rel = "STYLESHEET";
    newElem4.href = chrome.runtime.getURL("css/sfgradebook001.css");
    document.head.appendChild(newElem4);
  } else {
    let newElem3 = document.createElement("link");
    newElem3.rel = "STYLESHEET";
    newElem3.href = chrome.runtime.getURL("css/qclssbase001.css");
    document.head.appendChild(newElem3);

    let newElem4 = document.createElement("link");
    newElem4.rel = "STYLESHEET";
    newElem4.href = chrome.runtime.getURL("css/qclsslogin001.css");
    document.head.appendChild(newElem4);

    var children = document.getElementById("loginBrading").children;
    console.log(children);
    for (let child in children) {
      if (children[child].getAttribute("src")) {
        children[child].setAttribute(
          "src",
          chrome.runtime.getURL("SkyLogoBlue.png"),
        );
      }
    }
  }

  if (page == "sfgradebook001.w") {
    let styleElements = document.getElementsByTagName("style");
    for (let i = 0; i < styleElements.length; i++) {
      let element = styleElements[i];
      if (
        element.innerHTML.includes(
          "#sf_OuterWrap td.cCl {background-color:#FFFFFF",
        )
      ) {
        element.innerHTML = `
					#sf_OuterWrap td.cCl {
						background-color:var(--main-bg-color) !important;
						border-bottom:1px solid #D6DFEA !important;
						padding:3px 4px 3px 2px !important;
					}
					#sf_OuterWrap th.cCl {
						padding:3px 4px 3px 2px !important;
					}
					`;
      }
    }
  }

  if (page == "sfcalendar002.w") {
    let calenderJQueryCSS = document.createElement("link");
    calenderJQueryCSS.rel = "STYLESHEET";
    calenderJQueryCSS.href = chrome.runtime.getURL("css/jquery.cluetip.css");
    document.head.appendChild(calenderJQueryCSS);

    let styleElements = document.getElementsByTagName("style");
    for (let i = 0; i < styleElements.length; i++) {
      let element = styleElements[i];
      if (
        element.innerHTML.includes(
          "span.fc-event-title {overflow:hidden; white-space:nowrap}",
        )
      ) {
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
					`;
      }
    }
  }
}
