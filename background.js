
function onRequest(request, sender, sendResponse) {

  console.log("triggering new download: "+request.image);
  chrome.downloads.download(
    {
      url: request.image
    },
    function (downloadid) {
      console.log('download started: '+downloadid);
    }
  )

  // Return nothing to let the connection be cleaned up.
  sendResponse({});
};

// Listen for the content script to send a message to the background page.
chrome.extension.onRequest.addListener(onRequest);

// dont wanna have google ads
chrome.webRequest.onBeforeRequest.addListener(
    function(details){
        console.log("item-page: blocking request"+details);
        return {cancel: true};
    },
    {urls:[
        "*://www.google.com/adsense/*",
        "*://www.google.de/adsense/*",
        "*://adservice.google.com/*",
        "*://www.googletagservices.com/*",
        "*://*.bluekai.com/*",
        "*://*.datacaciques.com/*",
        "*://assets.adobedtm.com/*",
    ]},
    ["blocking"]
);
