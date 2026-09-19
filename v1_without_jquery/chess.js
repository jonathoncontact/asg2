
// Loads the starting board from the JSON file
function render_chessboard() {
	fetch("chessboard.json")
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			draw_chessboard(data.chessboard);
		});
}

// Creates the chessboard table
function draw_chessboard(chessboard) {
	let table = document.createElement("table");
	table.className = "chessboard";

	chessboard.forEach(function (row, rowIndex) {
		let table_row = table.insertRow();

		Object.values(row).forEach(function (piece, columnIndex) {
			let cell = table_row.insertCell();
			cell.id = String.fromCharCode(97 + columnIndex) + (8 - rowIndex);
			cell.innerHTML = piece;
		});
	});

	document.getElementById("chessboard").replaceChildren(table);
}

// Moves a piece between two board locations
function move_piece() {
	let source = document.getElementById("src").value.toLowerCase();
	let destination = document.getElementById("dst").value.toLowerCase();
	let source_cell = document.getElementById(source);
	let destination_cell = document.getElementById(destination);

	if (!source_cell || !destination_cell || source === destination ||
		source_cell.innerHTML === "&nbsp;") {
		return false;
	}

	destination_cell.innerHTML = source_cell.innerHTML;
	source_cell.innerHTML = "&nbsp;";
	document.getElementById("src").value = "";
	document.getElementById("dst").value = "";

	return false;
}

// Reloads the current page to reset the board
function reset_board() {
	window.location.reload();
	return false;
}
