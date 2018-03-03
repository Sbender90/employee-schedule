$(document).ready(function(){


    var config = {
        apiKey: "AIzaSyAWs7N9gNJbcRFnjr33PPltBoC-A5fAvho",
        authDomain: "employeedatabase-89286.firebaseapp.com",
        databaseURL: "https://employeedatabase-89286.firebaseio.com",
        projectId: "employeedatabase-89286",
        storageBucket: "",
        messagingSenderId: "40998418913"
      };
      firebase.initializeApp(config);

      var database = firebase.database();

      //initial values
      var name = "";
      var role = "";
      var rate = "";
      var start = "";

      $("#submit-employee").on("click", function(event) {
          event.preventDefault();

          name = $("#employee-name").val().trim();
          role = $("#employee-role").val().trim();
          rate = $("#employee-rate").val().trim();
          start = $("#employee-start").val().trim();

          database.ref().push({
            name: name,
            role: role,
            rate: rate,
            start: start,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
          });
      });
      
      database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val().name);
        console.log(childSnapshot.val().role);
        console.log(childSnapshot.val().rate);
        console.log(childSnapshot.val().start);

        
      }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
});

database.ref().orderByChild("dateAdded").limitToLast(5).on("child_added", function(snapshot) {
    // <tr>
    // <td><div id="name"></div></td>
    // <td><div id="role"></div></td>
    // <td><div id="start"></div></td>
    // <td><div id="months"></div></td>
    // </tr>
    var tr = $("<tr>");
    var nameTd = $("<td>").text(snapshot.val().name);
    var roleTd = $("<td>").text(snapshot.val().role);
    var rateTd = $("<td>").text(snapshot.val().rate);
    var startTd = $("<td>").text(snapshot.val().start);


    tr.append(nameTd);
    tr.append(roleTd);
    tr.append(rateTd);
    tr.append(startTd);

    $("#employeeTable").append(tr);
    console.log(snapshot.val());
    // $("#name").append(snapshot.val().name);
    // $("#role").append(snapshot.val().role);
})


});