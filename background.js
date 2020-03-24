'use strict';

chrome.webRequest.onBeforeRequest.addListener(function(details) {
  if (details.type !== 'main_frame' || details.method !== 'GET') {
    return;
  }

  const url = new URL(details.url);
  const match = /^\/(\d+)?$/.exec(url.pathname);
  if (match === undefined || match[1] === undefined) {
    return;
  }

  // Save a round trip if the user requested a non-https url
  url.protocol = 'https:';
  url.pathname = '/' + encodeURIComponent(match[1]) + '/webrtc';
  return {
    redirectUrl: url.href
  }
}, { urls: ['*://*.bluejeans.com/*'] }, ['blocking']);
