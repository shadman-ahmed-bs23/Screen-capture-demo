const videoElement = document.getElementById('video');
const start = document.getElementById('start');
const stop = document.getElementById('stop');

// Options for getDisplayMedia()

var displayMediaOptions = {
    video: {
        cursor: "always"
    },
    audio: false
};

start.addEventListener('click', function(e) {
    startCapture();
});

stop.addEventListener('click', function(e) {
    stopCapture();
});

async function startCapture() {
    //logElem.innerHTML = "";

    try {
        videoElement.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
        //dumpOptionsInfo();
    } catch(err) {
        console.error("Error: " + err);
    }
}

function stopCapture(evt) {
    let tracks = videoElement.srcObject.getTracks();

    tracks.forEach(track => track.stop());
    videoElement.srcObject = null;
}

/**
 * Calculate height from width and screen aspect ratio.
 * @param {number} width
 * @returns {number}
 */
 var findHeight = function (width) {
    var currentAspectRatio = screen.width / screen.height;
    var newHeight = width / currentAspectRatio;
    return newHeight;
}

var takeScreenshot = function() {
    //var screenoff = document.getElementById('invigilator_screen_off_flag').value;
    if (videoElement.srcObject !== null) {
        const videoTrack = videoElement.srcObject.getVideoTracks()[0];
        // var currentStream = videoElement.srcObject;
        // var active = currentStream.active;

        // var settings = videoTrack.getSettings();
        // var displaySurface = settings.displaySurface;

        // Capture Screen
        var videoScreen = document.getElementById('video');
        var canvasScreen = document.getElementById('invigilator-canvas-screen');
        var screenContext = canvasScreen.getContext('2d');
        // Var photo_screen = document.getElementById('photo_screen');
        var widthConfig = 860
        var heightConfig = findHeight(widthConfig);
        canvasScreen.width = widthConfig;
        canvasScreen.height = heightConfig
        screenContext.drawImage(videoScreen, 0, 0, widthConfig, heightConfig);
        var screenData = canvasScreen.toDataURL('image/png');
        var link = document.createElement('a');
        link.download = 'filename.png';
        link.href = screenData;
        link.click();
        // Photo_screen.setAttribute('src', screenData);
        // console.log(screenData);

        // API Call
        // var wsfunction = 'quizaccess_invigilator_send_screenshot';
        // var params = {
        //     'courseid': props.courseid,
        //     'cmid': props.cmid,
        //     'quizid': props.quizid,
        //     'screenshot': screenData
        // };

        // var request = {
        //     methodname: wsfunction,
        //     args: params
        // };

        // // Console.log('params', params);
        // if (screenoff == "0") {
        //     Ajax.call([request])[0].done(function(data) {
        //         if (data.warnings.length < 1) {
        //             // NO; pictureCounter++;
        //         } else {
        //             if (videoScreen) {
        //                 Notification.addNotification({
        //                     message: somethingwentwrong,
        //                     type: 'error'
        //                 });
        //                 clearInterval(screenShotInterval);
        //             }
        //         }
        //     }).fail(Notification.exception);
        // }
    }
    return true;
};

var screenShotInterval = setInterval(takeScreenshot, 10 * 1000);