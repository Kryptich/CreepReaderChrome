
// jQuery( "img[src*='https://platform.<__<__<__<__AFFECTED_PLATFORM__>__>__>__>.com/private/page_images']" )
function randomIntFromInterval(min,max) // min and max included
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

var t = setInterval(function () {
  if ($( "img[src*='https://platform.<__<__<__<__AFFECTED_PLATFORM__>__>__>__>.com/private/page_images']" ).length > 2) {
    clearInterval(t);
    processes();
  }
}, 50);


function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}
linkList = [];
function runIt () {
  var getLinks = document.querySelectorAll(".page-image");
  linkList = [];
  for (var i = 0; i < getLinks.length; i++) {
      var object = getLinks[i];
      linkList.push(object.getAttribute("src"));
  }
  linkList = linkList.filter(Boolean);
  // alert(linkList[1]);
  console.log(linkList);
};

function downloadIt () {
  var page = $.trim(document.getElementById("nav-hud").innerText);
  downloadImg(linkList[1],page);
  // window.open(linkList[1], '_blank');
}

downloadIt;
function clickNext() {
  nextbutton=document.querySelector('[title="Next Page"]');
  // alert(nextbutton);
  $(nextbutton)[0].click();
}
function processes() {
  runIt();
  downloadIt();
  clickNext();
}

function downloadImg (pathos, pagenumber) {
	var a = document.createElement('A');
	a.href = pathos;
  console.log(a.href);
  filename = ('Page (' + pagenumber + ').png');
	a.download = filename;
	a.target = "_blank";
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // listen for messages sent from background.js
    if (request.message === 'urlUpdate') {
      currentpage = request.url.substring(request.url.lastIndexOf('/') + 1, request.url.length);
      console.log(request.url); // new url is now in content scripts!
      // processes();
      wait(randomIntFromInterval(2000,10000));
      console.log("Waited ", randomtime, " milliseconds.")
    }
});


// window.onload = function(){
//     window.document.body.onload = runIt; // note removed parentheses
// };

//
// var observer = new MutationObserver(function (mutations) {
//     mutations.forEach(function (mutation) {
//         if (!mutation.addedNodes) {
//             return;
//         }
//         for (var i = 0; i < mutation.addedNodes.length; i++) {
//             if (mutation.addedNodes[i].classList.contains("page-image")) {
//                 main();
//             }
//         }
//     });
// });
//
// observer.observe(document.body, {
//     childList: true,
//     subtree: true
// });
