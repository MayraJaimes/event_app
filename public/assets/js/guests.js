$(document).ready(function () {

    //on click function for creating an event
    $(".#create-guest-form").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var id = $(".event-name").text();

        // Getting jQuery references of new event
        var guest_name = $("#guest-name");
        var contact = $("#contact");

        // Constructing a event object to hand to the database
        var newGuest = {
            guest_name: guest_name
                .val()
                .trim(),
            contact: contact
                .val()
                .trim()
        };

        // Send the POST request.
        $.ajax("/api/guests", {
            type: "POST",
            data: newGuest
        }).then(
            function () {
                // Send the PUT request.
                $.ajax("/api/events/" + id, {
                    type: "PUT",
                    data: newGuest
                }).then(
                    function () {
                        console.log("updated guest");
                        // Reload the page to get the updated list
                        window.location.href = "/events";
                    })
            });
        console.log("created new guest");
        // Reload the page to get the updated list
        location.reload();
});

//on click function for updating an event
$("#update-guest").on("click", function (event) {
    var id = $(this).data("id");

    event.preventDefault();

    // Getting jQuery references of new event
    var guest_name = $("#guest-name");
    var contact = $("#contact");

    // Constructing a event object to hand to the database
    var updatedGuest = {
        guest_name: guest_name
            .val()
            .trim(),
        contact: contact
            .val()
            .trim()
    };

    // Send the PUT request.
    $.ajax("/api/guests/" + id, {
        type: "PUT",
        data: updatedGuest
    }).then(
        function () {
            console.log("updated guest");
            // Reload the page to get the updated list
            window.location.href = "/events";
        })
});
  
    });