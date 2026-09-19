
let startingBoard = [];
let board = [];

$(function () {
	render_chessboard();
	$("#move-button").on("click", move_piece);
	$("#reset-button").on("click", reset_board);
});

// Load the starting position from JSON and draw the board.
function render_chessboard() {
	$.getJSON("chessboard.json", function (data) {
		startingBoard = [];
		$.each(data.chessboard, function (_, row) {
			startingBoard.push(Object.values(row));
		});
		board = [];
		$.each(startingBoard, function (_, row) {
			board.push(row.slice());
		});
		draw_chessboard();
	});
}

// Draw the current board using jQuery-created elements.
function draw_chessboard() {
	const table = $("<table>", { class: "chessboard" });

	$.each(board, function (rowIndex, row) {
		const tableRow = $("<tr>");
		$.each(row, function (columnIndex, piece) {
			const cell = $("<td>", {
				id: String.fromCharCode(97 + columnIndex) + (8 - rowIndex)
			});
			cell.html(piece);
			tableRow.append(cell);
		});
		table.append(tableRow);
	});

	$("#chessboard").empty().append(table);
}

function move_piece() {
	const source = $("#src").val().toLowerCase();
	const destination = $("#dst").val().toLowerCase();
	const squarePattern = /^[a-h][1-8]$/;
	if (!squarePattern.test(source) || !squarePattern.test(destination)) {
		return false;
	}
	const sourceCell = $("#" + source);
	const destinationCell = $("#" + destination);

	if (source === destination || !sourceCell.length || !destinationCell.length ||
		sourceCell.html() === "&nbsp;") {
		return false;
	}

	destinationCell.html(sourceCell.html());
	sourceCell.html("&nbsp;");
	board[8 - Number(source[1])][source.charCodeAt(0) - 97] = "&nbsp;";
	board[8 - Number(destination[1])][destination.charCodeAt(0) - 97] = destinationCell.html();
	$("#src").val("");
	$("#dst").val("");
	return false;
}

function reset_board() {
	window.location.reload();
	return false;
}
