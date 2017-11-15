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
//initial variables
var database = firebase.database();
var trainName = '';
var destination = '';
var frequency = '';
var firstTime = '';
//setting variables for time arrival
var arrivalTime = '';
var minutesAway = '';

//collect data on click
$('#submit-train').on('click',function(){
    trainName = $('#new-train-name').val().trim();
    destination = $('#new-destination').val().trim();
    frequency = $('#new-frequency').val().trim();
    firstTime = $('#new-first-time').val().trim();
    //keep adding information to the database
    database.ref().push({
      trainName:trainName,
      destination:destination,
      firstTime:firstTime,
      frequency:frequency,
      dateAdded:firebase.database.ServerValue.TIMESTAMP
    })
  });
// moment.js function
function nextTrain(interval,startTime){
    var time = moment(startTime,"HH:mm").format("HH:mm");
    var tnow = moment(moment.now()).format("HH:mm");
    if (time < tnow){
      var nt = moment(time,"HH:mm").add(interval,"m").format("HH:mm");
      return nextTrain(interval, nt);
    }
    return time;
  }

  //add data for subsequent entries to be stored as next entry in database
  database.ref().orderByChild('dateAdded').limitToLast(1).on('child_added', function(snapshot) {
      trainName = snapshot.val().trainName;
      destination = snapshot.val().destination;
      frequency = snapshot.val().frequency;
      firstTime = snapshot.val().firstTime;
  });
  
  //create table row based on child-added feqturels
  database.ref().on('child_added',function(snapshot){
      var nextRun = nextTrain(snapshot.val().frequency, snapshot.val().firstTime);
      nextRun = moment(nextRun, "HH:mm").format("hh:mm a");
    //   var away = 
      var tableRow = '<tr><td>'+snapshot.val().trainName+'</td>'
      +'<td>'+snapshot.val().destination+'</td>'
      +'<td>'+snapshot.val().frequency+'</td>'
      +'<td>'+nextRun+'</td>'
      +'<td>'+ +'</td>';
      $('#train-body').append(tableRow);
  });
//snapshot.val().arrivalTime