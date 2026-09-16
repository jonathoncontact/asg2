function render_chessboard() {
    var request = new XMLHttpRequest();

    request.open("GET", "chessboard.json", true);

    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var boardData = JSON.parse(request.responseText);
            var boardContainer = document.getElementById("chessboard");

            var boardLayout = document.createElement("div");
            boardLayout.className = "board-layout";

            var rankLabels = document.createElement("div");
            rankLabels.className = "rank-labels";

            for (var rank = 8; rank >= 1; rank--) {
                var rankLabel = document.createElement("span");
                rankLabel.innerHTML = rank;
                rankLabels.appendChild(rankLabel);
            }

            var boardWrapper = document.createElement("div");
            boardWrapper.className = "board-wrapper";

            var table = document.createElement("table");
            table.className = "chessboard";

            for (var row = 0; row < boardData.chessboard.length; row++) {
                var tableRow = document.createElement("tr");
                var rowData = boardData.chessboard[row];

                for (var square in rowData) {
                    var tableCell = document.createElement("td");

                    tableCell.id = square;
                    tableCell.innerHTML = rowData[square];

                    tableRow.appendChild(tableCell);
                }

                table.appendChild(tableRow);
            }

            var fileLabels = document.createElement("div");
            fileLabels.className = "file-labels";

            var files = ["a", "b", "c", "d", "e", "f", "g", "h"];

            for (var file = 0; file < files.length; file++) {
                var fileLabel = document.createElement("span");
                fileLabel.innerHTML = files[file];
                fileLabels.appendChild(fileLabel);
            }

            boardWrapper.appendChild(table);
            boardWrapper.appendChild(fileLabels);
            boardLayout.appendChild(rankLabels);
            boardLayout.appendChild(boardWrapper);

            boardContainer.innerHTML = "";
            boardContainer.appendChild(boardLayout);
        }
    };

    request.send();
}

function move_piece() {
    var sourceSquare = document.getElementById("src").value.trim().toLowerCase();
    var destinationSquare = document.getElementById("dst").value.trim().toLowerCase();

    var sourceCell = document.getElementById(sourceSquare);
    var destinationCell = document.getElementById(destinationSquare);

    if (sourceCell && destinationCell) {
        destinationCell.innerHTML = sourceCell.innerHTML;
        sourceCell.innerHTML = "&nbsp;";
    }
}

function reset_board() {
    window.location.reload();
}
