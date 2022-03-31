window.addEventListener("load", function() {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const property_id = params.get('property_id');

    var buttoncontainer = document.getElementById("myButton1");
    buttoncontainer.addEventListener("click", function(event) {
        var XHR = new XMLHttpRequest();

        // On success
        XHR.addEventListener("load", book_interested_success);

        // On error
        XHR.addEventListener("error", on_error);

        // Set up request
        XHR.open("GET", "api/booked.php?property_id=" + property_id);

        // Initiate the request
        XHR.send();

        document.getElementById("loading").style.display = 'block';
        event.preventDefault();
    });
});

var book_interested_success = function(event) {



    document.getElementById("loading").style.display = 'none';

    var response = JSON.parse(event.target.responseText);
    if (response.success) {
        var buttoncontainer = document.getElementById("myButton1");


        if (response.is_booked) {

            alert("BOOKED");
            buttoncontainer.value = "Booked";

        } else {
            alert("UNBOOKED");

            buttoncontainer.value = "Book Now";

        }
    } else if (!response.success && !response.is_logged_in) {
        window.$("#login-modal").modal("show");
    }
};