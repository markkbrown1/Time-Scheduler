  // initialize firebase
  var config = {
    apiKey: "AIzaSyASoydLFPRkN2HKqVUO7EmKr79SUj7XwoQ",
    authDomain: "train-timer-7df49.firebaseapp.com",
    databaseURL: "https://train-timer-7df49.firebaseio.com",
    storageBucket: "train-timer-7df49.appspot.com",
    messagingSenderId: "310514589154"
  };
  firebase.initializeApp(config);

  // create database variable
   var database=firebase.database();

   // initialize variables

    // var trainName = "";
    // var destination = "";
    // var firstTrain = "";
    // var frequency = "";
    // var nextTrain = "";

	$('#add-Train').on("click", function() {
		// event.preventDefault();
  // train inputs
   var trainName = $("#train-Input").val().trim();
   var destination = $("#destination-Input").val().trim();
   var firstTrain = $("#time-Input").val().trim();
   var frequency = $("#frequency-Input").val().trim();


  // to create local temporary object to hold train data
  var newTrain = {
      name: trainName,
      place: destination,
      firstTrain: firstTrain,
      freq: frequency
    }
    // uploads train data to the database
  database.ref().push(newTrain);
  console.log(newTrain.name);
  // clears all the text-boxes
  $("#train-Input").val("");
  $("#destination-Input").val("");
  $("#time-Input").val("");
  $("#frequency-Input").val("");
  // Prevents moving to new page
  return false;
});
// add firebase event listener for adding trains to database
database.ref().on("child_added", function(childSnapshot) {
	// event.preventDefault();
  console.log(childSnapshot.val());
  // store the childSnapshot values into variables
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().place;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().freq;

  // first Train pushed back to make sure it comes before current time
  var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
  
  var currentTime = moment();
  
  // difference between currentTime and first time converted.
  var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
 
  console.log("Difference in Time: " + timeDiff);
  // find Remainder of the time left modulus of time difference and frequency
  var timeRemaining = timeDiff % frequency;
  console.log(timeRemaining);

  // to calculate minutes to next train
  var minToTrain = frequency - timeRemaining;
  console.log(minToTrain);

  // next train
  var nextTrain = moment().add(minToTrain, "minutes").format("hh:mm");

  // Write results to table
  $("#trainSchedule>tbody").append("<tr><td>" + trainName + "</td><td>"
   + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + 
   "</td><td>" + minToTrain + "</td></tr>");
});
// remove train
$("panel-body").on("click", "#remove-train", function(){
	(console.log("where am I"));
     $(this).closest ('tr').remove();
     getKey = $(this).parent().parent().attr('id');
     database.ref().child(getKey).remove();
});

