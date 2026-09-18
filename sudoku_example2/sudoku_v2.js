<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
    integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous">
</script>

// Reloads the current page to reset the game state
function newGame() {
    // Forces the browser to reload the page (no change here from vanilla JS version)
    window.location.reload();
}

// Processes a player's move using jQuery
function makeMove() {
    // Read the ID of the target table cell from the input field
    let table_cell = $("#id_location").val();

    // Read the value (number) the player wants to place
    let number = $("#id_number").val();

    // Use the cell ID to select the table cell and insert the number
    $("#" + table_cell).html(number).addClass("user-value");

    // Clear the location input field after the move
    $("#id_location").val("");

    // Clear the number input field after the move
    $("#id_number").val("");

    // Prevent default form submission behavior
    return false;
}
