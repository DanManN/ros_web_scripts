// init button as off
document.getElementById('startstopgps').setAttribute('src', RECORD_OFF);

var gpsTopic = new ROSLIB.Topic({
  ros : ros,
  name : '/gps',
  messageType : 'sensor_msgs/NavSatFix'
});

var latitude, longitude, altitude, accuracy;
var navId;
var gpsTimer;


function gpsWatchHandler(position) {
  // Grab the latitude/longitude and error of gps fix
  var coords = position.coords;
  latitude = coords.latitude;
  longitude = coords.longitude;
  accuracy = coords.accuracy;
  if (coords.altitude) {
    altitude = coords.altitude;
  } else {
    altitude = null;
  }
}

function gpssnapshot() {
  var gpsMessage = new ROSLIB.Message({
    header : {
      frame_id : "world"
    },
    status: {
      status: 0,
      service: 1
    },
    latitude: latitude,
    longitude: longitude,
    altitude: altitude,
    position_covariance: [0,0,0,0,0,0,0,0,0], // how to get this from accuracy?
    position_covariance_type: 0
  });

  gpsTopic.publish(gpsMessage);
}

// turning on and off the timer that triggers sending gps information several times a second
startstopgps.addEventListener('click', function(ev){
  if (navigator.geolocation) {
    if(gpsTimer == null) {
      rosConnect();
      navId = navigator.geolocation.watchPosition(gpsWatchHandler);
      gpsTimer = setInterval(function(){
        gpssnapshot();
      }, 1000);       // publish a gps message every second
      document.getElementById('startstopgps').setAttribute('src', RECORD_ON);
    } else {
      // ros.close();
      navigator.geolocation.clearWatch(navId);
      clearInterval(gpsTimer);
      document.getElementById('startstopgps').setAttribute('src', RECORD_OFF);
      gpsTimer = null;
    }
  } else {
    window.alert("Geolocation not supported by this browser and/or device");
  }
}, false);
