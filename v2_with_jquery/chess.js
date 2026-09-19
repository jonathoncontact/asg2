$(function () {
    render_chessboard();
    $("#move-button").on("click", move_piece);
    $("#reset-button").on("click", reset_board);
});

function render_chessboard() {
    let data = JSON.parse($("#board-data").html());
    let table = $("<table>", { class: "chessboard" });

    $.each(data.chessboard, function (_, row) {
        let table_row = $("<tr>");
        $.each(row, function (square, piece) {
            table_row.append($("<td>", { id: square }).html(piece));
        });
        table.append(table_row);
    });

    $("#chessboard").empty().append(table);
}

function move_piece() {
    let source = $("#src").val().toLowerCase();
    let destination = $("#dst").val().toLowerCase();
    let source_cell = $("#" + source);
    let destination_cell = $("#" + destination);

    if (!source_cell.length || !destination_cell.length || source === destination ||
        source_cell.html() === "&nbsp;") {
        return false;
    }

    destination_cell.html(source_cell.html());
    source_cell.html("&nbsp;");
    $("#src").val("");
    $("#dst").val("");
    return false;
}

function reset_board() {
    window.location.reload();
    return false;
}
