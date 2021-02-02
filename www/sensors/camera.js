// init button as off
document.getElementById('startstopcam').setAttribute('src', RECORD_OFF);

var imageTopic = new ROSLIB.Topic({
  ros : ros,
  name : '/camera/image/compressed',
  messageType : 'sensor_msgs/CompressedImage'
});

var cameraTimer

// request access to the video camera and start the video stream
var hasRunOnce = false,
  video        = document.querySelector('#video'),
  canvas       = document.querySelector('#canvas'),
  width = 640,
  height, // calculated once video stream size is known
  cameraStream;


function cameraOn() {
  navigator.getMedia = ( navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia ||
    navigator.mediaDevices.getUserMedia);

  navigator.getMedia(
    {
      video: true,
      audio: false
    },
    function(stream) {
      cameraStream = stream;
      if (navigator.mozGetUserMedia) {
        video.mozSrcObject = stream;
      } else {
        var vendorURL = window.URL || window.webkitURL;
        console.log(stream);
        // video.src = vendorURL.createObjectURL(stream);
        video.srcObject = stream;
      }
      video.play();
    },
    function(err) {
      console.log("An error occured! " + err);
      window.alert("An error occured! " + err);
    }
  );
}


function cameraOff() {
  if (cameraStream.stop) {
    cameraStream.stop();
  } else {
    cameraStream.getTracks().forEach(track => track.stop());
  }
  hasRunOnce = false;
  takepicture(); // blank the screen to prevent last image from staying
}

// function that is run once scale the height of the video stream to match the configured target width
video.addEventListener('canplay', function(ev){
  if (!hasRunOnce) {
    height = video.videoHeight / (video.videoWidth/width);
    video.setAttribute('width', width);
    video.setAttribute('height', height);
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    hasRunOnce = true;
  }
}, false);

// function that is run by trigger several times a second
// takes snapshot of video to canvas, encodes the images as base 64 and sends it to the ROS topic
function takepicture() {
  canvas.width = width;
  canvas.height = height;

  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

  var data = canvas.toDataURL('image/jpeg');
  var imageMessage = new ROSLIB.Message({
    format : "jpeg",
    data : data.replace("data:image/jpeg;base64,", "")
  });

  imageTopic.publish(imageMessage);
}

// turning on and off the timer that triggers sending pictures several times a second
startstopcam.addEventListener('click', function(ev){
  if(cameraTimer == null) {
    rosConnect();
    cameraOn();
    cameraTimer = setInterval(function(){
      takepicture();
    }, 250);       // publish an image 4 times per second
    document.getElementById('startstopcam').setAttribute('src', RECORD_ON);
  } else {
    // ros.close();
    cameraOff();
    clearInterval(cameraTimer);
    document.getElementById('startstopcam').setAttribute('src', RECORD_OFF);
    cameraTimer = null;
  }
}, false);
