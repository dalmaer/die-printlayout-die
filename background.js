"use strict";

//
// Extention Events
//

// When a tab is updated to Google Docs, load the content script if the extension is on
chrome.tabs.onUpdated.addListener((_, changeInfo, tab) => {
  ifExtensionIsTurnedOn(() => {
    if (
      changeInfo.status == "complete" &&
      tab.url.startsWith("https://docs.google.com/document/") &&
      tab.active
    ) {
      chrome.tabs.executeScript({ file: "content.js" }, (result) => {
        // Catch errors such as "This page cannot be scripted due to an ExtensionsSettings policy."
        const lastErr = chrome.runtime.lastError;
        if (lastErr) {
          console.log("Error: " + lastErr.message);
        }
      });
    }
  });
});

// Toggle the extension on and off when you tap on the icon
chrome.browserAction.onClicked.addListener((tab) => {
  chrome.storage.local.get("off", (result) => {
    if (result.off) {
      // turn it on
      chrome.storage.local.set({ off: false });
      chrome.browserAction.setIcon({ path: "icon-on.png" });
      chrome.browserAction.setBadgeText({ text: "" });

      // run the thing and setup the timer
    } else {
      // turn it off
      chrome.storage.local.set({ off: true });
      chrome.browserAction.setIcon({ path: "icon-off.png" });
      chrome.browserAction.setBadgeText({ text: "" });
    }
  });
});

//
// Helper Functions
//

// Given a function, only run it if the extension is turned on by the user
function ifExtensionIsTurnedOn(callback) {
  chrome.storage.local.get("off", (result) => {
    if (!result.off) {
      callback();
    }
  });
}
