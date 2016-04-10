var abcdario = new Array();
abcdario[0] = "A";
abcdario[1] = "B";
abcdario[2] = "C";
abcdario[3] = "D";
abcdario[4] = "E";
abcdario[5] = "F";
abcdario[6] = "G";
abcdario[7] = "H";
abcdario[8] = "I";
abcdario[9] = "J";
abcdario[10] = "K";
abcdario[11] = "L";
abcdario[12] = "M";
abcdario[13] = "N";
abcdario[14] = "Ñ";
abcdario[15] = "O";
abcdario[16] = "P";
abcdario[17] = "Q";
abcdario[18] = "R";
abcdario[19] = "S";
abcdario[20] = "T";
abcdario[21] = "U";
abcdario[22] = "V";
abcdario[23] = "W";
abcdario[24] = "X";
abcdario[25] = "Y";
abcdario[26] = "Z";

$(document).ready(function () {
    var arrayWords = [];
    var maxlengthword = 0;
    var arrayAceertadas = [];

    $('#add-word').click(function () {
        var newWord = $('#word').val();
        arrayWords = [];
        for (var key in sessionStorage) {
            arrayWords = JSON.parse(sessionStorage.getItem("arrayWords"));
        }
        arrayWords.push(newWord);
        if (maxlengthword < newWord.length) {
            maxlengthword = newWord.length;
        }
        sessionStorage.setItem("arrayWords", JSON.stringify(arrayWords));
        $('<li>').appendTo('#words').text(newWord);
    });

    $('#add-play').click(function () {
        $('#words').hide();
        var selectedWord = "";
        var palabras = arrayWords.length;
        var alto = palabras * 2 + 5;
        var ancho = palabras * 2 + 5;
        var content = '<table border=1 id=sletras align= center>';

        for (x = 0; x < alto; x++) {
            content += '<tr>';

            for (i = 0; i < ancho; i++) {
                position = x + '' + i
                content += '<td id=' + position + '>' + abcdario[Math.floor(Math.random() * (27 - 0)) + 0] + '</td>';
            }
            content += '</tr>';
        }


        /*for (i = 0; i < palabra.length(); i++) {
            content += '<tr><td>' + palabra.charAt(i).toUpperCase() + '</td></tr>';
        }*/

        content += '</table>';

        $("#sopa").html(content);

        $('td').click(function () {
            $(this).css('backgroundColor', '#ff0000');
            var leter = $(this).html();
            selectedWord += leter;
            if (selectedWord.length > maxlengthword) {
                selectedWord = '';
                $('td').css('backgroundColor', '#333333');
            } else {
                for (pos = 0; pos < arrayWords.length; pos++) {
                    if (selectedWord.toUpperCase() === arrayWords[pos].toUpperCase()) {
                        $(this).css('backgroundColor', '#33cc33');
                    }
                }
            }
        });
    });
});
