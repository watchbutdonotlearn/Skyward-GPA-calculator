console.log("injected script successfully");
setInterval(function () {
  if (gUsrIdle != undefined) {
    gUsrIdle.clearIdle();
    console.log("cleared idle");
  }
}, 10000);
