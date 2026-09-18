
let startingBoard = [];
let board = [];

// Load the starting position from the JSON file and draw the board
function render_chessboard() {
	fetch("chessboard.json")
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			startingBoard = data.chessboard.map(function(row) {
				return Object.values(row);
			});
			board = startingBoard.map(function(row) {
				return row.slice();
			});
			draw_chessboard();
		});
}

// Draw the current board
function draw_chessboard() {
	let chessboard = document.getElementById("chessboard");
	let table = document.createElement("table");
	table.className = "chessboard";

	board.forEach(function(row, rowIndex) {
		let tableRow = document.createElement("tr");

		row.forEach(function(piece, columnIndex) {
			let cell = document.createElement("td");
			cell.id = String.fromCharCode(97 + columnIndex) + (8 - rowIndex);
			cell.innerHTML = piece;
			tableRow.appendChild(cell);
		});

		table.appendChild(tableRow);
	});

	chessboard.replaceChildren(table);
}

// Move a piece between two board locations
function move_piece() {
	let source = document.getElementById("src").value.toLowerCase();
	let destination = document.getElementById("dst").value.toLowerCase();
	let sourceCell = document.getElementById(source);
	let destinationCell = document.getElementById(destination);

	if (!sourceCell || !destinationCell || source === destination || sourceCell.innerHTML === "&nbsp;") {
		return false;
	}

	destinationCell.innerHTML = sourceCell.innerHTML;
	sourceCell.innerHTML = "&nbsp;";
	board[8 - Number(source[1])][source.charCodeAt(0) - 97] = "&nbsp;";
	board[8 - Number(destination[1])][destination.charCodeAt(0) - 97] = destinationCell.innerHTML;
	document.getElementById("src").value = "";
	document.getElementById("dst").value = "";
	return false;
}

// Restore the starting position
function reset_board() {
	board = startingBoard.map(function(row) {
		return row.slice();
	});
	draw_chessboard();
}
