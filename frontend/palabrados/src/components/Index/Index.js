import React from 'react'
import Game from '../Game/Game'

//Lista de urls de la fuente de datos.
const urls = {
  "4": "http://localhost/backend/dictionary.php?length=4",
  "5": "http://localhost/backend/dictionary.php?length=5",
  "6": "http://localhost/backend/dictionary.php?length=6"
};

export default function Index(props) {
  return (
    <div className="container main">
      <div className="dropend">
        <button className="btn btn-dark dropdown-toggle p-2 mt-3" type="button" id="dropdownDifficulty" data-bs-toggle="dropdown" aria-expanded="false">
          Dificultad
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><button className="dropdown-item" value="4" onClick={() => {
            props.setUrl(urls["4"]);
            props.setLength(4);
          }}>Facil(4)</button>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li><button className="dropdown-item" value="5" onClick={() => {
            props.setUrl(urls["5"]);
            props.setLength(5);
          }}>Medio(5)</button>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li><button className="dropdown-item" value="6" onClick={() => {
            props.setUrl(urls["6"]);
            props.setLength(6);
          }}>Dificil(6)</button>
          </li>
        </ul>
      </div>
      <Game length={props.length} wordList={props.wordList}></Game>
    </div>
  )
}
