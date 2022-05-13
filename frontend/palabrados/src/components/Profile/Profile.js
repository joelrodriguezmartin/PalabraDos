import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

/**
 * Componente Profile. Le muestra al usuario su nombre de usuario y puntuación total.
 * @param {*} props 
 * @returns 
 */
export default function Profile(props) {
    const navigate = useNavigate();//Navegador react
    const [userScore, setUserScore] = useState(0);//Puntuación del usuario actual
    const [scoreIsLoaded, setScoreIsLoaded] = useState(false);//Variable de carga
    useEffect(() => {//En caso de  que el usuario no esté logeado lo devolvemos a la raiz y en caso de que lo esté recogemos sus datos de la base
                    //de datos y los mostramos
        async function fetchData() {
            const response = await fetch("http://localhost/backend/userscore.php", { credentials: "include" });
            const data = await response.json();
            setUserScore(parseInt(data));
            setScoreIsLoaded(true);
        }
        if (!props.loggedIn) {
            navigate("/");
        }
        else {
            fetchData();
        }
    }, [props.loggedIn, navigate]);
    /**
     * Función que elimina el usuario despues de pedirle su contraseña.
     * @param {*} user 
     * @param {*} pass 
     */
     async function deleteUser() {
        const url = "http://localhost/backend/deleteuser.php"
        let pass = prompt("Introduce tu contraseña para confirmar (EL BORRADO ES IRREVERSIBLE)");
        let formdata = new FormData();
        formdata.append("password", pass);
        const response = await fetch(url, { 
            method: 'post',
            credentials: "include", 
            body: formdata
        });
        const data = await response.json();
        if (data.success) {
            props.setLoggedIn(data.isLoggedIn);
            props.setUsername("");
            alert("Su cuenta ha sido eliminada")
            navigate("/");
        } else if (!data.success) {
            console.log(data);
            alert("Error en contraseña, inténtalo de nuevo");
        }
    }
    if (scoreIsLoaded) {
        return (
            <div className="container main">
                <div className="row justify-content-center pt-5">
                    <div className="col-12 text-center">
                        <span className="profile1">Nombre de usuario: </span><span className="profile">{props.username}</span>
                    </div>
                    <div className="col-12 text-center">
                        <span className="profile1">Puntuacion total: </span><span className="profile">{userScore}</span>
                    </div>
                    <div className="col-12 text-center">
                        <button onClick={deleteUser} className="btn btn-dark">Borrar Cuenta</button>
                    </div>
                </div>

            </div>
        )
    } else {
        return (
            <div className="loader"></div>
        )
    }

}
