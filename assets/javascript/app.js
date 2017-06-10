var config = {
    apiKey: "AIzaSyB9PK_c6oyAElSXsImKolh8yi1_69zV0y0",
    authDomain: "train-schedule-fbe6f.firebaseapp.com",
    databaseURL: "https://train-schedule-fbe6f.firebaseio.com",
    projectId: "train-schedule-fbe6f",
    storageBucket: "train-schedule-fbe6f.appspot.com",
    messagingSenderId: "934656586451"
  };
  firebase.initializeApp(config);
var database = firebase.database();
var trainName;
var destination;
var firstTime;
var frequency;




$("#train-input").submit(function(event) {
  event.preventDefault();
  trainName = $("#train-name").val().trim();
  destination  = $("#destination").val().trim();
  firstTime = $("#first-train").val();
  frequency = $("#frequency").val();
  console.log(firstTime);

  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTime: firstTime,
    frequency: frequency
  });
});

database.ref().on('child_added', function (childSnapshot) {
  var firstTimeConverted = moment(childSnapshot.val().firstTime, "HH:mm");

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

  
  var tRemainder = diffTime % childSnapshot.val().frequency;

  // Minute Until Train
  var tMinutesTillTrain = childSnapshot.val().frequency - tRemainder;

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");


  $('#train-output').append('<tr id=""><td>' +
  childSnapshot.val().trainName  +'</td>'+
  '<td>'+childSnapshot.val().destination+'</td>'+
  '<td>'+childSnapshot.val().frequency+'</td>'+
  '<td>'+ nextTrain + '</td></tr>');
  },
  function (errorObject){
    console.log('Error handling: ' + errorObject.code);
  });
