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
var arrivalTime = '';
var minutesAway = '';
//collect data on click
$('#submit-train').on('click',function(){
    trainName = $('#new-train-name').val().trim();
    destination = $('#new-destination').val().trim();
    frequency = $('#new-frequency').val().trim();
    arrivalTime = $('#new-arrival-time').val().trim();
    //keep adding information to the database
    database.ref().push({
      trainName:trainName,
      destination:destination,
      arrivalTime:arrivalTime,
      frequency:frequency,
      dateAdded:firebase.database.ServerValue.TIMESTAMP
    })
  });
  //add subsequesnt entries by user to the bottom of the table
  database.ref().orderByChild('dateAdded').limitToLast(1).on('value', function(snapshot) {
    $('#train-body').html(
        '<tr><td>'+snapshot.val().trainName
        +'<td>'+snapshot.val().destination+'</td>'
        +'<td>'+snapshot.val().frequency+'</td>'
        +'<td>'+snapshot.val().arrivalTime+'</td>'
        +'<td>'+snapshot.val().minutesAway+'</td>'
      )
  });
  //create table row based on child-added feqturels
  database.ref().on('child_added',function(snapshot){
      var tableRow = '<tr><td>'+snapshot.val().trainName+'</td>'
      +'<td>'+snapshot.val().destination+'</td>'
      +'<td>'+snapshot.val().frequency+'</td>'
      +'<td>'+snapshot.val().arrivalTime+'</td>'
      +'<td>'+snapshot.val().minutesAway+'</td>';
      $('#train-body').append(tableRow);
  });
