// Reloads the current page to start a brand new game
function newGame() {
    // Forces the browser to reload the page
    window.location.reload();
}

// Handles a player's move in the game
function makeMove() {
    // Get the ID of the table cell where the move should be placed
    let table_cell = document.getElementById("id_location").value;

    // Get the number (or value) the player wants to place in the cell
    let number = document.getElementById("id_number").value;

    // Insert the number into the specified table cell
    var cell = document.getElementById(table_cell);
    cell.innerHTML = number;
    cell.classList.add("user-value");
    
    // Clear the location input field after the move
    document.getElementById("id_location").value = "";

    // Clear the number input field after the move
    document.getElementById("id_number").value = "";

    // Prevent the default form submission behavior (if this function is called from a form)
    return false;
}
