function randomIntFromInterval(min,max) // min and max included
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

imglink = '';

function getLink () {
  imglink = $( ".is-current-page > img" ).attr("src");
  // alert(linkList[1]);
  console.log(imglink);
};

function downloadIt () {
  var pageEmp = location.href.substring(location.href.lastIndexOf('/') + 1, location.href.length).padStart(3, '0');
  var page = $.trim(document.getElementById("nav-hud").innerText);
  downloadImg(imglink,page,pageEmp);
  console.log(pageEmp, ' Wordy Title: ', page)
  // window.open(linkList[1], '_blank');
}

function clickNext() {
  nextbutton=document.querySelector('[title="Next Page"]');
  // alert(nextbutton);
  $(nextbutton)[0].click();
}
function processes() {
  getLink();
  downloadIt();
  clickNext();
}

function downloadImg (pathos, pagenumber, pageEmpirical) {
	var a = document.createElement('A');
	a.href = pathos;
  console.log(a.href);
  filename = ('Page (' + pageEmpirical + ') [' + pagenumber + '].png');
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
      var t = setInterval(function () {
        if ($( "img[src*='https://platform.<__<__<__<__AFFECTED_PLATFORM__>__>__>__>.com/private/page_images']" ).length > 2) {
          clearInterval(t);
        }
      }, 50);
      currentpage = request.url.substring(request.url.lastIndexOf('/') + 1, request.url.length);
      console.log(request.url); // new url is now in content scripts!
      processes();
      wait(randomIntFromInterval(2000,10000)); // hang out for a human-reasonable period of time
      wait(randomIntFromInterval(2000,10000)); // dirty code re-use fix to prevent Chrome page timeouts
      wait(randomIntFromInterval(2000,10000));
    }
});
