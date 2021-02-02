// these two lines contain the base64-encoded images for the on/off buttons.
var RECORD_ON ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAASFBMVEUAAAAAAADMzMz/AABmZmaZmZnMAABmAACZAAAzAAAzMzP/MzPMZmaZMzPMMzP/MwD/////Zmb/ZgBmMzPMmZmZZmb/mQD/mZlxvxKlAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQffCBIMMyVTqZicAAACK0lEQVRIx43W63aDIAwA4KJJhVjrVtfu/d90kASIFlzzp5fDd5KAgJdLJwa8fB6YYojBXz4EQw1EgNPxAGDHqzpDBqDV0EN5DDoToIhagkSAOwb2DIEBRLEWINJf2DQspCQ7AwiUy0M69pEFyCR/xZCl4cTE/CgQtYoU2xZC2J6YiXNHA3ai4uApRwjaj+RBs+JWpKHLcrstiyAz3WjFUFJMk4/jf39+fqPyCdXJLmmwzi4L7+8a8avPhlwtzSQRcY0x3+9z+mSz8bSY0jRJWoEirtdxlM+IluczEXA7In+FbVm8jJ9jqIpmC2nBSjc6XXFZwvS83XwC4/wdI5pRDLczUE6TSJoPisRrDhNCkqFSmTY/pN6ZpIo05pguGZk1qawSKL3PxnznNIGHkDSjK1/q4tZNnlFI0CdNCeiTooRjXVfTTV5PJnggWTxejzNCDfJ6PdYWGd6zXHOWR7ewXi/jOrYJ8PbCvFH8cSGFlBmjQoZC/Dup68LbjAmWR39fWaOu1MRFCNg0rWesrCQTU1njuaxPZW1lX1neYRXwvgy1rkLQGN2WZVOWJHFPDZBPMUTXMVZAvZ+gnolqfBlvT6VEymGJelzryedL7M4+MFdTvIwAnDn8JnPCupbgO7KaeijHLz1xNKzseBVweTPketEQQgDagLAhssFWIl6P5j3OpK5QzgB8lXVufiFoFkl/n71fZIPlDeYsxa64+l7yH1BFUAv6ANgZ7wz/A295IO9de7kCAAAAAElFTkSuQmCC";
var RECORD_OFF = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAFVBMVEVvcm0AAAAzMzNmZmbMzMyZmZn///8pcdebAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQffCBINBR5qfIr6AAABv0lEQVQ4y22UQZaCMAyGffo8QED3Q9E9EDmAYzrrgZIbzJv7H2GStFLLmA22H/+fWNLsdi/hd2+DeSHP/A6Qhg9duX/AhVJskAGPoyLsNmACjVrQkMFe3u0hxUKPj5W0BqoWh0YeSxbtb2o1xvyNGPqnCMkLYPr6/SEOABcKqeKbF8mV2UE1KgHysbyDStaQTCKKR8GpYHDoIJVuJ3hcyJZVK1ZanFbuv5XQIypaRBycoupkdkx3kzhBg3NOMl2j3UJ9LS+6NRCufSLyq9KtqBFVPWmi4+KBoUbZkQoUiMHniZTcYYYqmylpjUgBdyVohu2s5HxOpDdiSWbNA3UlZR/lBBqw/CYyIkenRL9ZqjfVFgln0vJckiaTkIkvNYXba57WZRLku03xPHPo2sj9DamVLFuiFZ2pE2IfbkNOQnY32hBdXrR7RoLSzhrhYWQqRNYj/NB281MhsrZiVGJtuYpiw7E16RiajGIrYrxdGHooo0ZMdxQ3BJ8XErHfSrrnxcamlOB65Qu/K+bbLWTOXrxKDKU/JU3I/DoQDsjMgwmYyyFyGNkGj4ykgOXgET8bSf+AqAZ1DIhvBhwivu7/ATYxlvOTH50RAAAAAElFTkSuQmCC";

// setup connection to the ROS server and prepare the topic
var ros = new ROSLIB.Ros();

ros.on('connection', function() { console.log('Connected to websocket server.');});

ros.on('error', function(error) { console.log('Error connecting to websocket server: ', error); window.alert('Error connecting to websocket server'); });

ros.on('close', function() { console.log('Connection to websocket server closed.');});

var hostname = window.location.hostname;
// var hostname = "offinto.space";
// var hostname = "192.168.1.8";

function rosConnect() {
  if (!ros.isConnected) {
    ros.connect("wss://" + hostname + ":9090");
  }
}
