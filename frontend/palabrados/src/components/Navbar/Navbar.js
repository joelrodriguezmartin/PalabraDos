import React from 'react'
import { Link, useNavigate } from 'react-router-dom';


/**
 * Componente Navbar. Recibe por props el método setUrl del padre App y lo utiliza en el onClick del dropdown
 * para cambiar la url de la fuente de datos y utilizar un largo de palabra diferente.
 * @param {*} props 
 * @returns 
 */
export default function Navbar(props) {
    const navigate = useNavigate();
    function test() {

    }
    /**
     * Funcion que cierra el modal y navega a otra página, de otra manera da problemas
     */
    function closeModal() {
        document.getElementById("closeButton").click();
        navigate('/newaccount');
    }
    test();
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="navbar-brand rounded-3 p-2">
                    <img src="logo.png" alt="" width="240" height="40" className="align-text-center" />
                    <Link className="btn btn-secondary ms-2" to="/">Play</Link>
                    <Link className="btn btn-secondary ms-2" to="/leaderboard">Leaderboard</Link>

                </div>
                <div>
                    <Link className="btn btn-secondary ms-2" to="/newaccount">Crear cuenta</Link>
                    <button type="button" className="btn btn-secondary ms-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Inicia sesión
                    </button>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content bg-dark">
                                <div className="modal-header">
                                    <h5 className="modal-title text-light" id="exampleModalLabel">Inicia sesión</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="form-group text-center mx-4">
                                            <label htmlFor="user" className="text-light">Nombre de usuario:</label><br />
                                            <input type="text" name="user" className="form-control"></input>
                                        </div>
                                        <div className="form-group text-center mt-4 mx-4">
                                            <label htmlFor="password" className="text-light">Contraseña</label><br />
                                            <input type="password" name="password" className="form-control"></input>
                                        </div>
                                        <div className="form-group text-center mt-4">
                                            <button type="button" className="btn btn-secondary">Iniciar sesion</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary me-auto" id="closeButton" data-bs-dismiss="modal">Cerrar</button>
                                    <button className="btn btn-secondary " onClick={closeModal}>Crear cuenta</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
