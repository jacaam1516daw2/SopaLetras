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
    var maxlengthWord = 0;
    var arrayAceertadas = [];

    var infoPalabra = {
        palabra: "",
        posiciones: [],
        isAcertada: 0
    };

    $('#add-word').click(function () {
        var newWord = $('#word').val();
        arrayWords = [];
        for (var key in sessionStorage) {
            arrayWords = JSON.parse(sessionStorage.getItem("arrayWords"));
        }
        arrayWords.push(newWord.toUpperCase());
        if (maxlengthWord < newWord.length) {
            maxlengthWord = newWord.length;
        }
        sessionStorage.setItem("arrayWords", JSON.stringify(arrayWords));
        $('<li>').appendTo('#words').text(newWord);
        $("#word").text("");
    });

    $('#add-play').click(function () {
        $('#words').hide();
        var selectedWord = "";
        var palabras = arrayWords.length;
        var alto = palabras * 2 + 5;
        var ancho = palabras * 2 + 5;
        var content = '<table border=1 id=sletras align= center>';
        /*
         * llenamos la tabla de letras aleatorias
         */
        for (x = 0; x < alto; x++) {
            content += '<tr>';

            for (i = 0; i < ancho; i++) {
                position = x + '' + i
                content += '<td id=' + position + '>' + abcdario[Math.floor(Math.random() * (27 - 0)) + 0] + '</td>';
            }
            content += '</tr>';
        }

        content += '</table>';

        $("#sopa").html(content);


        var arrayNumbersAleatori = [];
        /*
         * Pintamos las plabras en la tabla de forma aleatoria pero con cierto control para que no se sobreescriban
         */

        for (r = 0; r < arrayWords.length; r++) {
            var pWord = "";
            var posiWords = [];
            //primera palabra
            if (r == 0) {
                for (f = 0; f < arrayWords[r].length; f++) {
                    var xa = f + 1 + "" + ancho - 1;
                    $("#" + xa).text(arrayWords[r].charAt(f));
                    pWord += arrayWords[r].charAt(f);
                    infoPalabra.posiciones.push("#" + xa);
                }
                infoPalabra.palabra = pWord;
                sessionStorage.setItem(pWord, JSON.stringify(infoPalabra));
                infoPalabra.posiciones = [];
            } else if (r == 1) {
                //segunda palabra
                for (f = 0; f < arrayWords[r].length; f++) {
                    var xa = f + 3 + "" + ancho - 3;
                    $("#" + xa).text(arrayWords[r].charAt(f));
                    pWord += arrayWords[r].charAt(f);
                    infoPalabra.posiciones.push("#" + xa);
                }
                infoPalabra.palabra = pWord;
                sessionStorage.setItem(pWord, JSON.stringify(infoPalabra));
                infoPalabra.posiciones = [];
            } else {
                //El resto de palabras horizontales pero de forma aleatoria
                var aleatoriPosition = Math.floor(Math.random() * (alto - 0)) + 0;

                // comrpobamos que la posicion donde vamos  a escribir no se haya utilzado para no sobrescribir
                while ($.inArray(aleatoriPosition, arrayNumbersAleatori) !== -1) {
                    aleatoriPosition = Math.floor(Math.random() * (alto - 0)) + 0;
                }

                arrayNumbersAleatori.push(aleatoriPosition);
                var other = Math.floor(Math.random() * (4 - 0)) + 0;
                for (z = 0; z < arrayWords[r].length; z++) {
                    var xo = aleatoriPosition + "" + (z + other);
                    $("#" + xo).text(arrayWords[r].charAt(z));
                    pWord += arrayWords[r].charAt(z);
                    infoPalabra.posiciones.push("#" + xo);
                }
                infoPalabra.palabra = pWord;
                sessionStorage.setItem(pWord, JSON.stringify(infoPalabra));
                infoPalabra.posiciones = [];
            }
        }

        $('td').click(function () {
            $(this).css('backgroundColor', '#ff0000');
            var leter = $(this).html();
            selectedWord += leter;
            if (selectedWord.length > maxlengthWord) {
                selectedWord = '';
                $('td').css('backgroundColor', '#333333');
                palabrasAcertadas();
            } else {
                for (pos = 0; pos < arrayWords.length; pos++) {
                    if (selectedWord == arrayWords[pos]) {
                        infoPalabra = JSON.parse(sessionStorage.getItem(arrayWords[pos]));
                        infoPalabra.isAcertada = 1;
                        sessionStorage.setItem(arrayWords[pos], JSON.stringify(infoPalabra));
                        $('td').css('backgroundColor', '#333333');
                        palabrasAcertadas();
                    }
                }
            }

            function palabrasAcertadas() {
                for (var key in sessionStorage) {
                    var infoPalabra = JSON.parse(sessionStorage.getItem(key));
                    if (infoPalabra.isAcertada == 1) {
                        for (d = 0; d < infoPalabra.posiciones.length; d++) {
                            $(infoPalabra.posiciones[d]).css('backgroundColor', '#33cc33');
                        }
                    }
                }
            }
        });
    });
});
