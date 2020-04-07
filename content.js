//
// MAIN
//

// kill the page break "-------" UI
document.body.insertAdjacentHTML(
  "beforeend",
  "<style type=text/css>.kix-page-compact:before {border: none;}</style>"
);

// turn off page layout
turnOffPageLayout();

//
// HELPERS
//

function turnOffPageLayout(el) {
  // Find the print layout parent DOM element by hunting down the aria layout and working backwards
  try {
    let pageLayoutEl = document.querySelector('[aria-label="Print layout p"]')
      .parentNode.parentNode;
    if (pageLayoutEl.classList.contains("goog-option-selected")) {
      // only click if it's selected
      mouseDownThenUp(pageLayoutEl);
    }
  } catch (e) {} // I hope the author sees that the DOM structure has changed and fixes this if it does!
}

// Simulate a mousedown on an element and then a mouseup as that is what Google Docs is listening for. A "click" doesn't work :)
function mouseDownThenUp(el) {
  dispatchMouseEvent(el, "mousedown", true, true);
  setTimeout(function () {
    // make sure the mousedown has triggered
    dispatchMouseEvent(el, "mouseup", true, true);
  }, 0);
}

// Simulate a mouse event
function dispatchMouseEvent(el) {
  let ev = document.createEvent("MouseEvents");
  ev.initMouseEvent.apply(ev, Array.prototype.slice.call(arguments, 1));
  el.dispatchEvent(ev);
}
