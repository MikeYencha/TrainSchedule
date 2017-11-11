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

// console.log(database);
// console.log('foo');

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
//push captured data to the database
    database.ref().push({
      trainName:trainName,
      destination:destination,
      arrivalTime:arrivalTime,
      frequency:frequency
    })
  })
  
  database.ref().on('child_added', function(snapshot){
    //   console.log(snapshot);
    var tn = snapshot.val().trainName;
    var ds = snapshot.val().destination;
    var fq = snapshot.val().frequency;
    var at = snapshot.val().arrivalTime;
    // $('#train-name').append(snapshot.val().trainName);
    $('#train-row').html('<td>'+tn+'</td>'+'<td>'+ds+'</td>'+'<td>'+fq+'</td>'+'<td>'+at+'</td>');
  })

//   <td id="train-name">foo</td>
//   <td id="destination">foo</td>
//   <td id="frequency">foo</td>
//   <td id="arrival-time">foo</td>
//   <td id="minutes-away">bar</td>