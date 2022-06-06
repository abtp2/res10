/* 
* TrebEdit
* Copyright (c) 2021 Joel Etetafia
*
* You are not permitted to copy, modify, or use any part of this document.
*
*/
function compile() { 
var code = document.getElementById("iframe").contentWindow.document; 

var h =localStorage.getItem("html");			
var c =localStorage.getItem("css");			
var j =localStorage.getItem("js");			
window.onload = function() { 
code.open(); code.writeln( h + "<style>" + c + "</style>" + "<script>" + j + "</script>" ); code.close(); }; } compile();




var iFrame = document.getElementById("iframe");
var iFrameContainer = document.getElementById("iframe_container");
var rightHandle = document.getElementById("right_handle");
var bottomHandle = document.getElementById("bottom_handle");
var cornerHandle = document.getElementById("corner_handle");
const MIN_FRAME_WIDTH = 100;
const MIN_FRAME_HEIGHT = 100;
const IFRAME_SCROLLBAR_WIDTH = 12;

var isResizeEnabled = true;


document.addEventListener('DOMContentLoaded', function (event) {
    if (isResizeObserverSupported()) {
        try {
            var resizer = new ResizeObserver(onResize);
            resizer.observe(iFrame);
        } catch (error) {
            //ResizerObserver is not supported, initialize mutation observer
            initMutationObserver();
        }
    } else {
        //ResizerObserver is not supported, initialize mutation observer
        initMutationObserver();
    }
});

function isResizeObserverSupported() {
    return typeof ResizeObserver != "undefined";
}

var startWidth, startHeight;
//right handle
var rightHandleHammer = new Hammer.Manager(rightHandle);
rightHandleHammer.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
rightHandleHammer.on('panstart', function (e) {
    startWidth = iFrameContainer.clientWidth;
    notifyAndroidOfResizeStarted();
});
rightHandleHammer.on('panmove', function (e) {
    if (!isResizeEnabled) {
        notifyAndroidOfResizeOnDisabled();
        return;
    }
    setFrameWidth(startWidth + e.deltaX);
})


//bottomHandle
var bottomHandleHammer = new Hammer.Manager(bottomHandle);
bottomHandleHammer.add(new Hammer.Pan({ direction: Hammer.DIRECTION_VERTICAL }));
bottomHandleHammer.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));

// bottomHandleHammer.get('pan').recognizeWith('doubletap');

bottomHandleHammer.on('panstart', function (e) {
    startHeight = iFrameContainer.clientHeight;
    notifyAndroidOfResizeStarted();
});
bottomHandleHammer.on('panmove', function (e) {
    if (!isResizeEnabled) {
        notifyAndroidOfResizeOnDisabled();
        return;
    }
    setFrameHeight(startHeight + e.deltaY);
})
//double clickListener
bottomHandleHammer.on("doubletap", setFrameHeightToMatchViewportHeight);


//cornerHandle
var cornerHandleHammer = new Hammer.Manager(cornerHandle);
cornerHandleHammer.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
cornerHandleHammer.on('panstart', function (e) {
    startHeight = iFrameContainer.clientHeight;
    startWidth = iFrameContainer.clientWidth;
    notifyAndroidOfResizeStarted();

});
cornerHandleHammer.on('panmove', function (e) {
    if (!isResizeEnabled) {
        notifyAndroidOfResizeOnDisabled();
        return;
    }
    setFrameHeight(startHeight + e.deltaY);
    setFrameWidth(startWidth + e.deltaX);
})


function onResize(entries) {
    var iframeRect = entries[0].contentRect;

    var width = Math.round(iframeRect.width).toString();
    var height = Math.round(iframeRect.height).toString();

    notifyAndroidOfDimenChanges(width, height);
}

function setFrameUrl(url) {
    iFrame.src = url;
}

function setWindowZoom(zoom) {
    document.body.style.zoom = zoom + "%";
}

function setFrameWidth(width) {
    var width_float = parseFloat(width);
    if (width_float < MIN_FRAME_WIDTH) {
        setFrameWidth(MIN_FRAME_WIDTH);
        return;
    }
    iFrameContainer.style.width = width + "px";
}

function setFrameHeight(height) {
    var height_float = parseFloat(height);
    if (height_float < MIN_FRAME_HEIGHT) {
        setFrameHeight(MIN_FRAME_HEIGHT);
        return;
    }
    iFrameContainer.style.height = `${height}px`;
}

function setFrameDimens(width, height) {
    setFrameWidth(width);
    setFrameHeight(height);
}

function setIsResizeEnabled(isEnabled) {
    isResizeEnabled = isEnabled;
}


function notifyAndroidOfResizeStarted() {
    Android.onResizeStarted();
}

function notifyAndroidOfDimenChanges(width, height) {
    Android.setDimens(width, height);
}

function notifyAndroidOfResizeOnDisabled() {
    Android.onResizeWhenDisabled();
}

function setFrameHeightToMatchViewportHeight() {
    if (!isResizeEnabled) {
        notifyAndroidOfResizeOnDisabled();
        return;
    }
    iFrameContainer.style.height = (window.innerHeight - 120) + "px";

}

function initMutationObserver() {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

    var list = document.getElementById("iframe_container");

    var config = {
        attributes: true,
        childList: false,
        characterData: false,
        subtree: false,
    };
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === "attributes") {

                notifyAndroidOfDimenChanges(parseInt(list.style.width), parseInt(list.style.height));
            }
        });
    });
    observer.observe(list, config);
}

