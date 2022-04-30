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
    function handleSubmit(event) {
        event.preventDefault(); //Evita el comportamiento normal de submit (recargar página y enviar en post/get)
        //Validacion
        const elements = event.target.elements;

        if (elements["loginpassword"].value.length >= 5 || elements["loginusername"] >= 5) {
            let url = "http://localhost/backend/login.php?username=" + elements["loginusername"].value + "&password=" + elements["loginpassword"].value;
            console.log(url);
            loginUser(url)
        } else {
            alert("La contraseña y el usuario deben tener al menos 5 caracteres")
        }


    };
    async function loginUser(url) {
        const response = await fetch(url, {credentials: "include"});
        const data = await response.json();
        if (data.isLoggedIn) {
            props.setLoggedIn(true);
            alert("Sesión iniciada correctamente")
            closeModal();
            navigate("/");
        } else if (!data.isLoggedIn) {
            console.log(data);
            alert("Fallo en usuario o contraseña");
        }
    }
    async function logoutUser(){
        const response = await fetch("http://localhost/backend/logout.php", {credentials: "include"});
        await response.json();
        props.setLoggedIn(false);
        props.setUserName("");
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
                    {props.loggedIn ? null : <Link className="btn btn-secondary ms-2" to="/newaccount">Crear cuenta</Link>}
                    {props.loggedIn ? <button type="button" className="btn btn-secondary ms-2" onClick={logoutUser}>Cerrar sesión</button> : <button type="button" className="btn btn-secondary ms-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Inicia sesión
                    </button>}
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content bg-dark">
                                <div className="modal-header">
                                    <h5 className="modal-title text-light" id="exampleModalLabel">Inicia sesión</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group text-center mx-4">
                                            <label htmlFor="user" className="text-light">Nombre de usuario:</label><br />
                                            <input type="text" name="loginusername" className="form-control"></input>
                                        </div>
                                        <div className="form-group text-center mt-4 mx-4">
                                            <label htmlFor="password" className="text-light">Contraseña</label><br />
                                            <input type="password" name="loginpassword" className="form-control"></input>
                                        </div>
                                        <div className="form-group text-center mt-4">
                                            <button type="submit" className="btn btn-secondary">Iniciar sesion</button>
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
