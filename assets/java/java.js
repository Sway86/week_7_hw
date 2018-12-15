// start firebase


<script src="https://www.gstatic.com/firebasejs/5.7.0/firebase.js"></script>

var config = {
    apiKey: "AIzaSyBd_-dh-RoU5auzMIKprgBUJtffKWA3y6g",
    authDomain: "train-schedule-4c653.firebaseapp.com",
    databaseURL: "https://train-schedule-4c653.firebaseio.com",
    projectId: "train-schedule-4c653",
    storageBucket: "train-schedule-4c653.appspot.com",
    messagingSenderId: "802552248745"
};

firebase.initializeApp(config);

var trainData = firebase.database();

//populate the databse

$("#add-train-btn").on("click", function () {

    //recives user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var fristTrain = $("#first-train-input").val().trim();
    var frequency = $("$frequency-input").val().trim();

    //parking lot
    var newTrain = {
        name: trainName,
        destination: destination,
        fristTrain: fristTrain,
        frequency: frequency
    };

    //updates database
    trainData.ref().push(newTrain);

    //loging console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);

    //clearing text boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");

    return false;
});

trainData.ref().on




trainData.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Storeing data
    var tName = childSnapshot.val().name;
    var tDestination = childSnapshot.val().destination;
    var tFrequency = childSnapshot.val().frequency;
    var tFirstTrain = childSnapshot.val().firstTrain;
     var timeArr = tFirstTrain.split(":");
    var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
    var maxMoment = moment.max(moment(), trainTime);
    var tMinutes;
    var tArrival;


    if (maxMoment === trainTime) {
        tArrival = trainTime.format("hh:mm A");
        tMinutes = trainTime.diff(moment(), "minutes");
    } else {

        //math logic
        var differenceTimes = moment().diff(trainTime, "minutes");
        var tRemainder = differenceTimes % tFrequency;
        tMinutes = tFrequency - tRemainder;
        tArrival = moment().add(tMinutes, "m").format("hh:mm A");
    }
    console.log("tMinutes:", tMinutes);
    console.log("tArrival:", tArrival);


    //table input
    $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
        tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
});