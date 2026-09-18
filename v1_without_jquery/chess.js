// Starting position for a new game
const startingBoard = [
	["&#9820;", "&#9822;", "&#9821;", "&#9819;", "&#9818;", "&#9821;", "&#9822;", "&#9820;"],
	["&#9823;", "&#9823;", "&#9823;", "&#9823;", "&#9823;", "&#9823;", "&#9823;", "&#9823;"],
	["&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"],
	["&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"],
	["&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"],
	["&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"],
	["&#9817;", "&#9817;", "&#9817;", "&#9817;", "&#9817;", "&#9817;", "&#9817;", "&#9817;"],
	["&#9814;", "&#9816;", "&#9815;", "&#9813;", "&#9812;", "&#9815;", "&#9816;", "&#9814;"]
];

let board = startingBoard.map(function(row) {
	return row.slice();
});

// Draw the current board
function render_chessboard() {
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
	render_chessboard();
}
