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

    /*
     * Objecto donde vamos a guardar la información de la plabra
     */
    var infoPalabra = {
        palabra: "",
        posiciones: [],
        isAcertada: 0
    };

    $('.CuentaAtras').hide();
    sessionStorage.clear();
    /*
     * click para guardar cada plabra
     */
    $('#add-word').click(function () {
        var newWord = $('#word').val().toUpperCase();
        if (newWord != '') {
            arrayWords = [];
            /*
             * Guardamos el array de palabras en sessionStorage
             */
            for (var key in sessionStorage) {
                arrayWords = JSON.parse(sessionStorage.getItem("arrayWords"));
            }
            arrayWords.push(newWord.toUpperCase());

            if (maxlengthWord < newWord.length) {
                maxlengthWord = newWord.length;
            }

            sessionStorage.setItem("arrayWords", JSON.stringify(arrayWords));
            $('<li>').appendTo('#words').text(newWord);
            $("#word").val('');
        }
    });

    /*
     * Funcion que pinta la sopa de letras
     */
    $('#add-play').click(function () {
        cronometro();
        $('.CuentaAtras').show();
        $('#words').hide();
        var selectedWord = "";
        var palabras = arrayWords.length;
        var alto = palabras * 2 + 6;
        var ancho = palabras * 2 + 6;
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

        /*
         * Pintamos la tabla con todas la letras aleatorias
         */
        $("#sopa").html(content);


        var arrayNumbersAleatori = [];
        /*
         * Pintamos las plabras en la tabla de forma aleatoria pero con cierto control y coherencia para que no se sobreescriban las posiciones
         */
        for (r = 0; r < arrayWords.length; r++) {
            var pWord = "";
            var posiWords = [];
            /*
             * Primera palabra
             */
            if (r == 0 || r == 3) {
                for (f = 0; f < arrayWords[r].length; f++) {
                    var xa = "";
                    if (r == 0) {
                        xa = f + 1 + "" + ancho - 1;
                    } else {
                        xa = f + 3 + "" + ancho - 3;
                    }
                    $("#" + xa).text(arrayWords[r].charAt(f));
                    pWord += arrayWords[r].charAt(f);
                    infoPalabra.posiciones.push("#" + xa);
                }
                guardaInfoPalabra(infoPalabra);
            } else {
                /*
                 * El resto de palabras horizontales pero de forma aleatoria
                 */
                var aleatoriPosition = Math.floor(Math.random() * (alto - 0)) + 0;

                /*
                 * Comrpobamos que la posicion donde vamos a escribir no se haya utilzado ya
                 * arrayNumbersAleatori contiene la primera de las posiciones donde se ha escrito
                 */
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
                guardaInfoPalabra(infoPalabra);
            }
        }

        /*
         * Esta función guarda el objeto infoPalabra en sessionStorage
         */
        function guardaInfoPalabra(infoPalabra) {
            infoPalabra.palabra = pWord;
            sessionStorage.setItem(pWord, JSON.stringify(infoPalabra));
            infoPalabra.posiciones = [];
        }

        /*
         * Función click que comprueba cuando el usuario pulsa con el ratón una letra
         * Va guardando las letras que se van pulsando y lo va comparando con las palbras que se ha de acertar
         * en caso de que coincidan las pinta de verde. Si el numero de letras que se van pulsando supera en logitud
         * la palabra mas larga introducida reinicia el tablero de color negro.
         */
        $('td').click(function () {
            $(this).css('backgroundColor', '#ff0000');
            var leter = $(this).html();
            selectedWord += leter;
            if (selectedWord.length > maxlengthWord) {
                selectedWord = '';
                $('td').css('backgroundColor', '#333333');
                palabrasAcertadas();
                notifyInfo('No vamos bien!!!', 500, 3000, 'KO');
            } else {
                for (var key in sessionStorage) {
                    if (key != 'arrayWords') {
                        var infoPalabra = JSON.parse(sessionStorage.getItem(key));
                        if (selectedWord == infoPalabra.palabra) {
                            infoPalabra = JSON.parse(sessionStorage.getItem(infoPalabra.palabra));
                            infoPalabra.isAcertada = 1;
                            sessionStorage.setItem(infoPalabra.palabra, JSON.stringify(infoPalabra));
                            $('td').css('backgroundColor', '#333333');
                            palabrasAcertadas();
                            notifyInfo('Has acertado!!!', 500, 3000, 'OK');
                            selectedWord = '';
                        }
                    }
                }
            }
            /*
             * Esta función pinta las plabras acertadas
             */
            function palabrasAcertadas() {
                for (var key in sessionStorage) {
                    if (key != 'arrayWords') {
                        var infoPalabra = JSON.parse(sessionStorage.getItem(key));
                        if (infoPalabra.isAcertada == 1) {
                            for (d = 0; d < infoPalabra.posiciones.length; d++) {
                                $(infoPalabra.posiciones[d]).css('backgroundColor', '#33cc33');
                            }
                        }
                    }
                }
            }

            function notifyInfo(msg, speed, fadeSpeed, type) {
                $('.notify' + type).remove();
                if (typeof fade != "undefined") {
                    clearTimeout(fade);
                }
                $('body').append('<div class="notify' + type + '" style="display:none;position:fixed;left:10"><p>' + msg + '</p></div>');
                notifyHeight = $('.notify' + type).outerHeight();
                $('.notify' + type).css('top', -notifyHeight).animate({
                    top: 10,
                    opacity: 'toggle'
                }, speed);
                fade = setTimeout(function () {
                    $('.notify' + type).animate({
                        top: notifyHeight + 10,
                        opacity: 'toggle'
                    }, speed);
                }, fadeSpeed);
            }
        });
    });
});

/*****************************************************************
 ********************* INICIO Cronometro *************************
 ******************************************************************/
var inicio = 0;
var timeout = 0;
var result = "";
var endTime = new Date().getTime() + (120 * 1000);

/* Variable que contiene el tiempo restante */
var tiempRestante = 15;

function cronometro() {
    /* Ejecutamos la funcion updateReloj() al cargar la pagina */
    updateReloj();

    if (timeout == 0) {
        // iniciamos el proceso
        inicio = new Date().getTime()
        funcionando();
    }
}

function funcionando() {
    // obteneos la fecha actual
    var actual = new Date().getTime();

    // obtenemos la diferencia entre la fecha actual y la de inicio
    var diff = new Date(actual - inicio);

    // mostramos la diferencia entre la fecha actual y la inicial
    result = LeadingZero(diff.getUTCHours()) + ":" + LeadingZero(diff.getUTCMinutes()) + ":" + LeadingZero(diff.getUTCSeconds());
    // Indicamos que se ejecute esta función nuevamente dentro de 1 segundo
    timeout = setTimeout("funcionando()", 1000);
}

/* Funcion que pone un 0 delante de un valor si es necesario */
function LeadingZero(Time) {
    return (Time < 10) ? "0" + Time : +Time;
}

function updateReloj() {
    if (tiempRestante > 0) {
        var Seconds = tiempRestante;

        var Days = Math.floor(Seconds / 86400);
        Seconds -= Days * 86400;

        var Hours = Math.floor(Seconds / 3600);
        Seconds -= Hours * (3600);

        var Minutes = Math.floor(Seconds / 60);
        Seconds -= Minutes * (60);

        var TimeStr = ((Days > 0) ? Days + " dias " : "") + LeadingZero(Hours) + ":" + LeadingZero(Minutes) + ":" + LeadingZero(Seconds);
        /* Este muestra el total de hora, aunque sea superior a 24 horas */

        document.getElementById("CuentaAtras").innerHTML = TimeStr;
        if (endTime <= new Date().getTime()) {
            document.getElementById("CuentaAtras").innerHTML = "00:00:00";
        } else {
            /* Restamos un segundo al tiempo restante */
            tiempRestante -= 1;
            /* Ejecutamos nuevamente la función al pasar 1000 milisegundos (1 segundo) */
            setTimeout("updateReloj()", 1000);
        }
    } else {
        var puntos = 0;
        for (var key in sessionStorage) {
            if (key != 'arrayWords') {
                var infoPalabra = JSON.parse(sessionStorage.getItem(key));
                if (infoPalabra.isAcertada == 1) {
                    puntos = puntos + 50;
                    for (t = 0; t < infoPalabra.posiciones.length; t++) {
                        $(infoPalabra.posiciones[t]).css('backgroundColor', '#33cc33');
                    }
                } else {
                    for (g = 0; g < infoPalabra.posiciones.length; g++) {
                        $(infoPalabra.posiciones[g]).css('backgroundColor', '#ffff99');
                    }
                }
            }
        }
        $("#points").html("Puntos: " + puntos);
    }
}

/*****************************************************************
 ********************* FIN Cronometro *************************
 ******************************************************************/
