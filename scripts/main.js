// Initialize Firebase
var config = {
apiKey: "AIzaSyDkMpL21nU9qkRljcXncj-9BAtFLhy04K0",
authDomain: "my-train-scheduler-e13da.firebaseapp.com",
databaseURL: "https://my-train-scheduler-e13da.firebaseio.com",
projectId: "my-train-scheduler-e13da",
storageBucket: "",
messagingSenderId: "35194440748"
};

firebase.initializeApp(config);
var database = firebase.database();

console.log(database);
console.log('foo');

//variables for application
var database = firebase.database();

var trainName = '';
var destination = '';
var frequency = '';
var arrivalTime = '';
var minutesAway = '';

//grab info from submit to store in database
$('#submit-train').on('click',function(){
    trainName = $('#new-train-name').val().trim();
    destination = $('#new-destination').val().trim();
    frequency = $('#new-frequency').val().trim();
    arrivalTime = $('#new-arrival-time').val().trim();

    database.ref().push({
      trainName:trainName,
      destination:destination,
      arrivalTime:arrivalTime,
      frequency:frequency
    })
  })

  database.ref().on('child_added', function(snapshot){
      console.log(snapshot);
  })