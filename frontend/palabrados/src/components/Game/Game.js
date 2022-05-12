import React, { useState } from 'react'
import Rules from '../Rules/Rules';
/**
 * Componente Game, contiene toda la lógica necesaria para jugar y muestra todos los componentes necesarios para 
 * la interacción con el usuario
 * @param {*} props 
 * @returns 
 */
export default function Game(props) {
  const [tries, setTries] = useState(0); //Numero de intentos
  const [currentWord, setCurrentWord] = useState(""); //Palabra actual
  const [gameEnded, setGameEnded] = useState(false); //Variable de partida terminada
  const [winBool, setWinBool] = useState(false); //Variable de victoria/derrota
  const [score, setScore] = useState(0); //Puntuación del usuario

  let coincidences = 0; //Coincidencias
  let successes = 0; //Aciertos

  /**
   * Funcion de desarrollo. hace lo que se necesite en el momento 
   */
  function test() {
    console.log(currentWord);
  }
  /**
   * Función que renderiza los inputs de letras dependiendo del tamaño de palabra e intento
   * @returns 
   */
  function renderForms() {
    let count = tries;
    let uiItems = [];
    while (count--) { //Esto se repite hasta llegar a 0 
      let inputArray = [];
      for (let i = 0; i < props.length; i++) {
        inputArray.push(
          <input type="text" maxLength="1" id={count + "-" + i} key={count + "-" + i} className="small-input" onChange={autoTab} onKeyDown={deleteAlso}/>
        )
      }
      uiItems.push(
        <div key={count}>
          <form name="formName" onSubmit={handleSubmit}>
            <div>
              {inputArray}
            </div>
            <button type="button" className="btn btn-dark me-3" onClick={() => {
              if (window.confirm("¿Estas seguro de cancelar la partida?")) {
                reset();
              }
            }}>Cancelar partida</button>
            <button type="submit" className="btn btn-dark">Comprobar</button>
          </form>
        </div>
      )
    }
    return uiItems;
  };
  /**
   * Función utilizada para mover el focus entre los campos de letra al borrar letras
   * @param {*} event 
   */
  function deleteAlso(event){
    let inputs = Array.from(document.getElementsByClassName("small-input"));
    let current = inputs.indexOf(event.target);
    if (event.target.value.length < 1) {
      if (current > 0) {
        if (event.keyCode === 8){
          inputs[current - 1].value = "";
          inputs[current - 1].focus();
        } 
      }
    }
  }
  /**
   * Función utilizada para mover el focus entre los campos de letra del juego al introducir letras
   * @param {*} event 
   */
  function autoTab(event) {
    let inputs = Array.from(document.getElementsByClassName("small-input"));
    let current = inputs.indexOf(event.target);
    if (event.target.value.length === parseInt(event.target.attributes.maxlength.value)) {
      if (current < props.length - 1) {
        inputs[current + 1].focus();
      }
    } /*else if (event.target.value.length < 1) {
      if (current > 0) {
        inputs[current - 1].focus();
      }
    }*/
  }
  /**
   * Enseñamos el contenido de fin de partida condicionalmente
   * @returns 
   */
  function renderEnd() {
    let uiItems = [];
    if (gameEnded) {
      uiItems.push(<div key="a" >Partida terminada</div>);
      if (winBool) {
        uiItems.push(<div key="b">Has ganado con una puntuacion de {score}</div>);
      } else {
        uiItems.push(<div key="b">Has perdido con una puntuacion de {score}</div>);
      }
      if (props.loggedIn){
        uiItems.push(<div key="c">Se ha sumado la puntuación a tu perfil, {props.username}</div>);
      }else{
        uiItems.push(<div key="c">Inicia sesión o regístrate para acumular tus puntuaciones</div>);
      }
      uiItems.push(<button key="d" onClick={reset} className="btn btn-dark mt-2">Jugar otra vez</button>)
    }
    return uiItems;
  };
  /**
   * Recargamos la página para evitar problemas
   */
  function reset() {
    setTries(0);
    setCurrentWord("");
    setGameEnded(false);
    setWinBool(false);
    setScore(0);
    document.getElementById("startbutton").disabled = false;
    document.getElementById("startbutton").classList.remove("none");
    document.getElementById("dropdownDifficulty").disabled = false;
  }
  /**
   * Funcion que inicia la partida con el primer intento y asignando la palabra
   */
  function newGame() {
    setTries(1);
    setCurrentWord(props.wordList[Math.floor(Math.random() * props.wordList.length)]);
    document.getElementById("startbutton").disabled = true;
    document.getElementById("startbutton").classList.add("none");
    document.getElementById("dropdownDifficulty").disabled = true;
  };
  /**
   * Función ejecutada en el submit, evita la recarga de la página y recoge los datos de los
   * input de tipo texto y los introduce en un array.
   * @param {*} event 
   */
  function handleSubmit(event) {
    event.preventDefault(); //Evita el comportamiento normal de submit (recargar página y enviar en post/get)
    let arrayLetters = [];
    const elements = event.target.elements //Objeto que contiene los elementos html del formulario
    for (const key in elements) {
      if (Object.hasOwnProperty.call(elements, key)) { //Solo lo guardamos si es un objeto (para evitar el length)
        const element = elements[key];
        if (element.type === "text") { //Solo recogemos el valor de los input text (para evitar el botón)
          arrayLetters.push(element.value.toLowerCase());
        }
      }
    }
    checkLetters(arrayLetters, elements);
  };
  /**
   * Funcion que calcula la puntuación final con las siguientes normas:
   * *Length* = Tamaño de la palabra 
   * Cada coincidencia vale *Length* puntos
   * Cada acierto vale *Length* x 2 puntos
   * Se sumará el numero de intentos x 5 a la puntuación 
   * En caso de victoria se multiplicarán los puntos finales por 5
   */
  function calculateScore(boolWin) {
    let triescore = (props.length - tries) * 5;
    let score = (props.length * coincidences + props.length * successes + triescore);
    if (boolWin) {
      score *= 5;
    }
    return score;
  }
  /**
   * Función de victoria de partida
   */
  function win() {
    let localScore = calculateScore(true);
    setScore(localScore);
    setWinBool(true);
    setGameEnded(true);
    if (props.loggedIn) {
      saveScore(localScore);
    }
  }
  /**
   * Función de derrota de partida
   */
  function lose() {
    let localScore = calculateScore(false);
    setScore(localScore);
    setWinBool(false);
    setGameEnded(true);
    if (props.loggedIn) {
      saveScore(localScore);
    }
  }
  /**
   * Función que llama al backend para guardar la puntuación del usuario registrado
   * @param {*} localScore 
   */
  async function saveScore(localScore) {
    const response = await fetch("http://localhost/backend/savescore.php?score="+localScore, {credentials: "include"});
    await response.json();
  }
  /**
   * Función que realiza las comprobaciones de letras y posiciones, la más importante del juego
   * @param {*} arrayLetters 
   * @param {*} inputs 
   */
  function checkLetters(arrayLetters, inputs) {
    //En los primeros dos casos no avanzamos intento
    if (arrayLetters.some(function (e) { return e === "" || e === " " })) {
      alert("Rellena todas las letras");
    } else if (!props.wordList.includes(arrayLetters.join(""))) {
      alert("La palabra que has introducido no está en nuestro diccionario") //comprueba si esta en el diccionario, comentar para test
    }
    else if (tries <= props.length) {
      if (arrayLetters.join("") === currentWord) { //Primero comprobamos si las palabras son iguales pa ahorrar cálculos
        for (const key in inputs) {
          if (Object.hasOwnProperty.call(inputs, key)) { //Solo lo guardamos si es un objeto (para evitar el length)
            const element = inputs[key];
            element.setAttribute("disabled", "disabled");
            if (element.type === "text") { //Solo recogemos el valor de los input text (para evitar el botón)
              element.classList.add("success");
            }
          }
          successes = props.length;
        }
        win();
      } else {
        let position = 0; //Posicion de la letra, empezamos en 0 
        let successIndexes = []; //Array de posiciones correctas
        let coincidenceIndexes = []; //Array de letras correctas sin posicionar
        arrayLetters.forEach(guessLetter => { //Por cada letra de la palabra introducida
          if (currentWord.includes(guessLetter)) { //Si esa letra está en la palabra a adivinar
            for (let i = 0; i < currentWord.length; i++) {
              if (currentWord[i] === guessLetter) {
                if (i === position) {
                  successIndexes.push(position);
                  successes = successIndexes.length;
                } else {
                  coincidenceIndexes.push(position);
                  coincidences = coincidenceIndexes.length;
                }
              }
            }
          }
          position++; //Pasamos a la siguiente letra
        });
        successIndexes.forEach(element => {
          inputs[element].classList.add("success");
        });
        coincidenceIndexes.forEach(element => {
          inputs[element].classList.add("coincidence");
        });
        for (const key in inputs) {
          if (Object.hasOwnProperty.call(inputs, key)) { //Solo lo guardamos si es un objeto (para evitar el length)
            const element = inputs[key];
            element.setAttribute("disabled", "disabled");
            if (element.type !== "text") {
              element.setAttribute("class", "none");
            }
          }
        }
        if (tries === props.length) { //Significa que era el último intento
          lose();
        } else {
          setTries(tries + 1);
        }
      }
    }
  };

  test();
  return (
    <div className="gamecontainer text-center">
      {tries !== 0 ? null : <div className="text-center mb-2">Dificultad actual: {props.length}</div>}
      <button type="button" onClick={newGame} id="startbutton" className="btn btn-dark">Empezar partida</button>
      {renderEnd()}
      {renderForms()}
      {tries !== 0 ? null : <Rules></Rules>}
    </div>
    
  )
}