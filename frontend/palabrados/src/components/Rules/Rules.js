import React from 'react'
/**
 * Componente Rules. Muestra las reglas del juego. Se incluye en el componente Game siempre que la partida no esté empezada
 * @returns 
 */
export default function Rules() {
    return (
        <div className='main container pt-3'>
            <div className="row">
                <h1 className="text-center underline mt-3">Como jugar</h1>
                <div className="col-12 text-center">
                    PalabraDos es un juego de adivinación de palabras en el que conseguirás puntos por cada letra acertada.<br /><br />
                    En primer lugar selecciona tu dificultad, lo que cambiará el numero de letras por palabra, pero también la puntuación que conseguirás.<br /><br />
                    A continuación empieza una partida y tendras tantos intentos como letras haya en la palabra para adivinarla. Solo se considerarán 
                    palabras válidas aquellas que estén en nuestro diccionario y que rellenen todos los campos de letra. <br/><br/>
                    Si lo consigues y eres un usuario registrado tu puntuación se sumará a tu perfil, y los 10 usuarios con mejores puntuaciones aparecerán
                    en nuestra tabla de puntuaciones públicas.<br/><br/>
                    En cualquier momento puedes cancelar la partida, pero perderás todos los puntos que habrías conseguido al terminarla.
                </div>
                <h1 className="text-center underline mt-3">Modo de puntuación</h1>
                <div className="col-12 text-center">
                    La manera de obtener puntos es la siguiente: <br/><br/>
                    Las letras pueden ser consideradas <i className="guess">adivinadas</i> (si están en la palabra) y <i className="good">acertadas</i> (si están en la posición correcta). <br/><br/>
                    Los puntos conseguidos dependerán de la dificultad o largo de palabra (4, 5 o 6). A esto lo llamaremos <i className="points">puntaje</i><br/> <br/>
                        <ul>
                            <li>Cada letra <i className="guess">adivinada</i>  valdrá  <i className="points">puntaje</i></li>
                            <li>Cada letra <i className="good">acertada</i>  valdrá  <i className="points">puntaje</i> x2</li>
                            <li>Se sumará el número de intentos restantes x5 a la puntuación</li>
                            <li>En caso de victoria se multiplicará la puntuación final x5</li>
                        </ul>
                </div>
            </div>
        </div>
    )
}
