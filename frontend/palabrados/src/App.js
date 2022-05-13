import React, { useEffect, useState } from 'react'
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './components/Index/Index';
import Leaderboard from './components/Leaderboard/Leaderboard';
import NewAccount from './components/NewAccount/NewAccount'
import Profile from './components/Profile/Profile';
import Rules from './components/Rules/Rules';

/**
 * Componente App. Componente principal de la app, contiene la lista de rutas a todos los otros componentes y los incluye dependiendo de la url. 
 * Además posee la mayor parte de las variables importantes necesarias para el funcionamiento y las distribuye a sus hijos. 
 * @returns 
 */
function App() {
  const [wordList, setWordList] = useState([]);//Lista de palabras
  const [dataIsLoaded, setDataIsLoaded] = useState(false);//Variable de carga
  const [url, setUrl] = useState("http://localhost/backend/dictionary.php?length=5");//Url de la que recogemos las palabras
  const [length, setLength] = useState(5); //Tamaño de palabra, por defecto 5
  const [loggedIn, setLoggedIn] = useState(false); //Variable de sesión iniciada
  const [username, setUsername] = useState(""); //Nombre de usuario en caso de sesión iniciada
  /**
   * Función que se comunica con el backend y comprueba si existe una sesión iniciada. En caso de existir cambia las variables 
   * de inicio de sesión y nombre de usuario a las recibidas del backend
   */
  async function checkSession() {
    const response = await fetch("http://localhost/backend/checksession.php", {credentials: "include"});
    const data = await response.json();
    if (data.isLoggedIn){
      setLoggedIn(true);
      setUsername(data.username);
    }
  }
  
  useEffect(() => {//Recibimos los datos de las palabras del backend
    async function fetchData() {
      const response = await fetch(url);
      const data = await response.json();
      setWordList(data);
      setDataIsLoaded(true);
    }
    fetchData();
  }, [url]);
  
  if (dataIsLoaded) {
    checkSession();
    return (
      <div className = "main">
        <Router>
          <Navbar loggedIn = {loggedIn} setLoggedIn = {setLoggedIn} username={username} setUsername={setUsername}></Navbar>
          <div className="container-fluid bg-secondary text-light">
            <Routes>
              <Route exact path='/' element={
                <Index length={length} wordList={wordList} setUrl={setUrl} setLength={setLength} loggedIn = {loggedIn} username={username}></Index>}>
              </Route>
              <Route exact path='/leaderboard' element={
                <Leaderboard></Leaderboard>}>
              </Route>
              <Route exact path='/newaccount' element={
                <NewAccount loggedIn = {loggedIn}></NewAccount>}>
              </Route>
              <Route exact path='/profile' element={
                <Profile loggedIn = {loggedIn} setLoggedIn = {setLoggedIn} username={username} setUsername={setUsername}></Profile>}>
              </Route>
              <Route exact path='/rules' element={
                <Rules></Rules>}>
              </Route>
            </Routes>
          </div>
        </Router>
      </div>
    );
  } else {
    return (
      <div className="loader"></div>
    );
  }

}

export default App;
