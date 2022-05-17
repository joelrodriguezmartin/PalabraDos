import React from 'react'
import { Link, useNavigate } from 'react-router-dom';


/**
 * Componente Navbar. Siempre será visible y permite la navegación e inicio de sesión del usuario.
 * @param {*} props 
 * @returns 
 */
export default function Navbar(props) {
    const navigate = useNavigate();//Navegador react
    /**
     * Función de desarrollo, hace lo necesario en cada momento
     */
    function test() {

    }
    /**
     * Funcion que cierra el modal y navega a otra página
     */
    function closeModal() {
        document.getElementById("closeButton").click();
        navigate('/newaccount');
    }
    /**
     * Función que se encarga de recoger los datos del formulario de inicio de sesión 
     * @param {*} event 
     */
    function handleSubmit(event) {
        event.preventDefault(); //Evita el comportamiento normal de submit (recargar página y enviar en post/get)
        //Validacion
        const elements = event.target.elements;

        if (elements["loginpassword"].value.length >= 5 || elements["loginusername"] >= 5) {
            loginUser(elements["loginusername"].value, elements["loginpassword"].value);
        } else {
            alert("La contraseña y el usuario deben tener al menos 5 caracteres")
        }


    };
    /**
     * Función que recibe los datos del usuario y llama al backend para realizar un inicio de sesión
     * @param {*} user 
     * @param {*} pass 
     */
    async function loginUser(user, pass) {
        const url = "http://localhost/backend/login.php"
        let formdata = new FormData();
        formdata.append("username", user);
        formdata.append("password", pass);
        const response = await fetch(url, { 
            method: 'post',
            credentials: "include", 
            body: formdata
        });
        const data = await response.json();
        if (data.isLoggedIn) {
            props.setLoggedIn(true);
            alert("Sesión iniciada correctamente")
            closeModal();
            navigate("/");
        } else if (!data.isLoggedIn) {
            alert("Fallo en usuario o contraseña");
        }
    }
    async function logoutUser() {
        const response = await fetch("http://localhost/backend/logout.php", { credentials: "include" });
        await response.json();
        props.setLoggedIn(false);
        props.setUsername("");
        document.getElementById("loginusername").value = "";
        document.getElementById("loginpassword").value= "";
    }
    test();
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="navbar-brand rounded-3 p-2">
                    <img src="logo.png" alt="" width="240" height="40" className="align-text-center logo" />
                    <Link className="btn btn-secondary ms-2" to="/">Jugar</Link>
                    <Link className="btn btn-secondary ms-2" to="/leaderboard">Leaderboard</Link>
                </div>
                <div>
                    {props.username !== "" ? <span className="username">{props.username}</span> : null}
                    {props.loggedIn ? <Link className="btn btn-secondary ms-2" to="/profile">Perfil</Link> : null}
                    {props.loggedIn ? null : <Link className="btn btn-secondary ms-2" to="/newaccount">Crear cuenta</Link>}
                    {props.loggedIn ? <button type="button" className="btn btn-secondary ms-2" onClick={logoutUser}>Cerrar sesión</button> : <button type="button" className="btn btn-secondary ms-2" data-bs-toggle="modal" data-bs-target="#modal">
                        Inicia sesión
                    </button>}
                    <div className="modal fade" id="modal" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content bg-dark">
                                <div className="modal-header">
                                    <h5 className="modal-title text-light" id="modalLabel">Inicia sesión</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group text-center mx-4">
                                            <label htmlFor="user" className="text-light">Nombre de usuario:</label><br />
                                            <input type="text" name="loginusername" className="form-control" id="loginusername"></input>
                                        </div>
                                        <div className="form-group text-center mt-4 mx-4">
                                            <label htmlFor="password" className="text-light">Contraseña</label><br />
                                            <input type="password" name="loginpassword" className="form-control" id="loginpassword"></input>
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
