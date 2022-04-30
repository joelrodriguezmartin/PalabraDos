import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function NewAccount() {
  const navigate = useNavigate();
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
        let url = "http://localhost/backend/register.php?username=" + elements["registerusername"].value + "&password=" + elements["registerpassword1"].value;
        console.log(url);
        registerUser(url);
      } else {
        alert("La contraseña y el usuario deben tener al menos 5 caracteres")
      }
    }
    else {
      alert("Las contraseñas no coinciden");
    }
  };
  async function registerUser(url) {
    const response = await fetch(url/*, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: user, password: pass})
    }*/);
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
          <input type="text" className="form-control registerinput mx-auto" id="registerusername" pattern='[\S\s]{5,}' />
          <p className="validity">El nombre de usuario requiere 5 caracteres sin espacios</p>
        </div>
        <div className="mb-4">
          <label htmlFor="registerpassword1" className="form-label">Contraseña</label>
          <input type="password" className="form-control registerinput mx-auto" id="registerpassword1" pattern='[\S\s]{5,}' />
          <p className="validity">La contraseña requiere 5 caracteres sin espacios</p>
        </div>
        <div className="mb-4">
          <label htmlFor="registerpassword2" className="form-label">Confirma contraseña</label>
          <input type="password" className="form-control registerinput mx-auto" id="registerpassword2" pattern='[\S\s]{5,}' />
          <p className="validity">Las contraseñas deben coincidir</p>
        </div>
        <button type="submit" className="btn btn-dark">Registrar</button>
      </form>
    </div>
  )
}
