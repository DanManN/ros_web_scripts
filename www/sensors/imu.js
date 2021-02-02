// init button as off
document.getElementById('startstopimu').setAttribute('src', RECORD_OFF);

var imuTopic = new ROSLIB.Topic({
  ros : ros,
  name : '/gyro',
  messageType : 'sensor_msgs/Imu'
});

var alpha, valpha, z;
var beta, vbeta, x;
var gamma, vgamma, y;

var imuTimer;

// setup event handler to capture the orientation event and store the most recent data in a variable
if (window.DeviceOrientationEvent) {
  // Listen for the deviceorientation event and handle the raw data
  window.addEventListener('deviceorientation', function(eventData) {
    // gamma is the left-to-right tilt in degrees, where right is positive
    gamma = eventData.gamma;

    // beta is the front-to-back tilt in degrees, where front is positive
    beta = eventData.beta;

    // alpha is the compass direction the device is facing in degrees
    alpha = eventData.alpha
  }, false);
};

// setup event handler to capture the acceleration event and store the most recent data in a variable
if (window.DeviceMotionEvent) {
  window.addEventListener('devicemotion', deviceMotionHandler, false);
} else {
  window.alert("Acceleration measurements not supported.");
}

function deviceMotionHandler(eventData) {
  // Grab the acceleration from the results
  var acceleration = eventData.acceleration;
  x = acceleration.x;
  y = acceleration.y;
  z = acceleration.z;

  // Grab the rotation rate from the results
  var rotation = eventData.rotationRate;
  vgamma = rotation.gamma;
  vbeta = rotation.beta;
  valpha = rotation.alpha;
}

function imusnapshot() {
  var beta_radian = ((beta + 360) / 360 * 2 * Math.PI) % (2 * Math.PI);
  var gamma_radian = ((gamma + 360) / 360 * 2 * Math.PI) % (2 * Math.PI);
  var alpha_radian = ((alpha + 360) / 360 * 2 * Math.PI) % (2 * Math.PI);
  var eurlerpose = new THREE.Euler(beta_radian, gamma_radian, alpha_radian);
  var quaternionpose = new THREE.Quaternion;
  quaternionpose.setFromEuler(eurlerpose);

  if (x === null)
    x = 0;
  if (y === null)
    y = 0;
  if (z === null)
    z = 0;
  if (vgamma === null)
    vgamma = 0;
  if (vbeta === null)
    vbeta = 0;
  if (valpha === null)
    valpha = 0;

  var imuMessage = new ROSLIB.Message({
    header : {
      frame_id : "world"
    },
    orientation : {
      x : quaternionpose.x,
      y : quaternionpose.y,
      z : quaternionpose.z,
      w : quaternionpose.w
    },
    orientation_covariance : [0,0,0,0,0,0,0,0,0],
    angular_velocity : {
      x : vbeta,
      y : vgamma,
      z : valpha,
    },
    angular_velocity_covariance  : [0,0,0,0,0,0,0,0,0],
    linear_acceleration : {
      x : x,
      y : y,
      z : z,
    },
    linear_acceleration_covariance  : [0,0,0,0,0,0,0,0,0],
  });

  imuTopic.publish(imuMessage);
}

// turning on and off the timer that triggers sending imu information several times a second
startstopimu.addEventListener('click', function(ev){
  if(imuTimer == null) {
    rosConnect();
    imuTimer = setInterval(function(){
      imusnapshot();
    }, 100);       // publish an IMU message 10 times per second
    document.getElementById('startstopimu').setAttribute('src', RECORD_ON);
  } else {
    // ros.close();
    clearInterval(imuTimer);
    document.getElementById('startstopimu').setAttribute('src', RECORD_OFF);
    imuTimer = null;
  }
}, false);
