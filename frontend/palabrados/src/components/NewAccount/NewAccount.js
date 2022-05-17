import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

/**
 * Componente NewAccount. Permite el registro de usuarios verificando que se cumplan las condiciones de tamaño de nombre de usuario y contraseña
 * @param {*} props 
 * @returns 
 */
export default function NewAccount(props) {
  const navigate = useNavigate();//Navegador react

  useEffect(() => {//En el caso de que el usuario tenga la sesión iniciada lo devolvemos a la raíz
    if (props.loggedIn) {
      navigate("/");
    }
  }, [props.loggedIn, navigate]);
  /**
   * Functión ejecutada en el submit, evita la recarga de la página y recoge los datos de los
   * input de tipo texto y los introduce en un array.
   * @param {*} event 
   */
  function handleSubmit(event) {
    event.preventDefault(); //Evita el comportamiento normal de submit (recargar página y enviar en post/get)
    //Validacion
    const elements = event.target.elements;
    if (elements["registerpassword1"].value === elements["registerpassword2"].value) {
      if (elements["registerpassword1"].value.length >= 5 || elements["registerusername"] >= 5) {
        registerUser(elements["registerusername"].value, elements["registerpassword1"].value);
      } else {
        alert("La contraseña y el usuario deben tener al menos 5 caracteres")
      }
    }
    else {
      alert("Las contraseñas no coinciden");
    }
  };
  /**
   * Función que recibe los datos de usuario y se comunica con el backend para realizar un registro.
   * @param {*} user 
   * @param {*} pass 
   */
  async function registerUser(user, pass) {
    const url = "http://localhost/backend/register.php";
    let formdata = new FormData();
    formdata.append("username", user);
    formdata.append("password", pass);
    const response = await fetch(url, {
      method: 'post',
      body: formdata
    });
    const data = await response.json();
    if (data.created && data.exists) {
      alert("Tu cuenta se ha creado satisfactoriamente, inicia sesión")
      navigate("/");
    } else if (!data.created && data.exists) {
      alert("Ese usuario ya existe");
    } else if (!data.created && !data.exists) {
      alert("Fallo en creación, intentalo de nuevo más tarde");
    }
  }

  return (
    <div className="container main">
      <form className="text-center pt-3" name="formName" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="registerusername" className="form-label">Nombre de usuario</label>
          <input type="text" className="form-control registerinput mx-auto" id="registerusername" required pattern="[a-zA-Z0-9\u00f1\u00d1]{5,15}" />
          <p className="validity">El nombre de usuario requiere entre 5 y 15 caracteres alfanuméricos sin espacios (a-z 0-9)</p>
        </div>
        <div className="mb-4">
          <label htmlFor="registerpassword1" className="form-label">Contraseña</label>
          <input type="password" className="form-control registerinput mx-auto" id="registerpassword1" required pattern="[a-zA-Z0-9\u00f1\u00d1]{5,15}" />
          <p className="validity">La contraseña requiere entre 5 y 15 caracteres alfanuméricos sin espacios (a-z 0-9)</p>
        </div>
        <div className="mb-4">
          <label htmlFor="registerpassword2" className="form-label">Confirma contraseña</label>
          <input type="password" className="form-control registerinput mx-auto" id="registerpassword2" required pattern="[a-zA-Z0-9\u00f1\u00d1]{5,15}" />
          <p className="validity">Las contraseñas deben coincidir</p>
        </div>
        <button type="submit" className="btn btn-dark">Registrar</button>
      </form>
    </div>
  )


}
