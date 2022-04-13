import React from 'react'
import { Link } from 'react-router-dom';
//Lista de urls de la fuente de datos.
const urls = {
    "4": "http://localhost/backend/dictionary.php?length=4",
    "5": "http://localhost/backend/dictionary.php?length=5",
    "6": "http://localhost/backend/dictionary.php?length=6"
};
/**
 * Componente Navbar. Recibe por props el método setUrl del padre App y lo utiliza en el onClick del dropdown
 * para cambiar la url de la fuente de datos y utilizar un largo de palabra diferente.
 * @param {*} props 
 * @returns 
 */
export default function Navbar(props) {

    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="navbar-brand rounded-3 p-2">
                    <img src="logo.png" alt="" width="240" height="40" className="align-text-center" />
                    <Link className="btn btn-secondary ms-2" to="/">Play</Link>
                    <Link className="btn btn-secondary ms-2" to="/leaderboard">Leaderboard</Link>
                </div>
                <div className="dropstart ">
                    <button className="btn btn-secondary dropdown-toggle p-2" type="button" id="dropdownDifficulty" data-bs-toggle="dropdown" aria-expanded="false">
                        Dificultad
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><button className="dropdown-item" value="ugin" onClick={() => {props.setUrl(urls["4"]);
                                                                                           props.setLength(4);}}>Facil(4)</button>
                        </li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li><button className="dropdown-item" value="2016" onClick={() => {props.setUrl(urls["5"]);
                                                                                           props.setLength(5);}}>Medio(5)</button>
                        </li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li><button className="dropdown-item" value="2017" onClick={() => {props.setUrl(urls["6"]);
                                                                                           props.setLength(6);}}>Dificil(6)</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
