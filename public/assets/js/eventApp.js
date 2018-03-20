$(document).ready(function () {

  //on click function for creating an event
  $("#create-event-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    // Getting jQuery references of new event
    var event_name = $("#event_name");
    var event_date = $("#date");
    var location = $("#location");
    var start_time = $("#start_time");
    var end_time = $("#end_time");

    // Constructing a event object to hand to the database
    var newEvent = {
      event_name: event_name
        .val()
        .trim(),
      event_date: event_date
        .val()
        .trim(),
      location: location
        .val()
        .trim(),
      start_time: start_time
        .val()
        .trim(),
      end_time: end_time
        .val()
        .trim()
    };

    // Send the POST request.
    $.ajax("/api/events", {
      type: "POST",
      data: newEvent
    }).then(
      function () {
        console.log("created new event");
        // Reload the page to get the updated list
        window.location.href = "/events";
      }
    );
  });

  //on click function for updating an event
  $("#update-event").on("click", function (event) {
    var id = $(".event-name").text();

    event.preventDefault();

    // Getting jQuery references of new event
    var event_name = $("#event-name");
    var event_date = $("#date");
    var location = $("#location");
    var start_time = $("#start-time");
    var end_time = $("#end-time");

    // Constructing a event object to hand to the database
    var updatedEvent = {
      event_name: event_name
        .val()
        .trim(),
      event_date: event_date
        .val()
        .trim(),
      location: location
        .val()
        .trim(),
      start_time: start_time
        .val()
        .trim(),
      end_time: end_time
        .val()
        .trim()
    };

    // Send the PUT request.
    $.ajax("/api/events/" + id, {
      type: "PUT",
      data: updatedEvent
    }).then(
      function () {
        console.log("updated event");
        // Reload the page to get the updated list
        window.location.href = "/events";
      })
    });

  });