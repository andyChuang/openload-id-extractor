var message;

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    updateCandidateUIList(findOpenload(request.source));
  }
});

// Update <ul> in pop.html with candidates
function updateCandidateUIList(candidates){

  initClipBoardJs();

  message.innerText = "No openload id is found!";

  $.each(candidates, function(idx, candidate){
    message.innerText = "Find openload id! Click to copy!";
    $("#candidate").append("<li id=\"openloadId\" data-clipboard-target=\"#candidate\"><a id=\"candidate\" href=\"#\">" + candidate + "</a></li>");
  });
}

// Use openload patterns to get video id
function findOpenload(content){
  var matchedCandidate = [];

  $.each(openloadPattern, function(idx, pattern){
    if(pattern.test(content)){
      console.log("Pattern " + pattern + " is found.");
      matchedCandidate.push(RegExp.$1);
    }
  });

  return matchedCandidate;
}

function initClipBoardJs(){

  var clipboard = new Clipboard('#openloadId', {
    text: function(trigger){
      return $("#hrefPrefix").find(":selected").val() + $(trigger).find("#candidate").html();
    }
  });

  clipboard.on('success', function(e) {
    $("#message").html("Copied " + e.text);

    e.clearSelection();
});

}

function onWindowLoad() {

  message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "js/getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    } 
  });
}

window.onload = onWindowLoad;