import React, { useEffect, useState } from 'react'
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './components/Index/Index';
import Leaderboard from './components/Leaderboard/Leaderboard';
import NewAccount from './components/NewAccount/NewAccount'
import Profile from './components/Profile/Profile';

function App() {
  const [wordList, setWordList] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [url, setUrl] = useState("http://localhost/backend/dictionary.php?length=5");
  const [length, setLength] = useState(5);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  async function checkSession() {
    const response = await fetch("http://localhost/backend/checksession.php", {credentials: "include"});
    const data = await response.json();
    if (data.isLoggedIn){
      setLoggedIn(true);
      setUsername(data.username);
    }
  }
  
  useEffect(() => {
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
      <>
        <Router>
          <Navbar loggedIn = {loggedIn} setLoggedIn = {setLoggedIn} setUserName={setUsername}></Navbar>
          <div className="container-fluid bg-secondary text-light">
            <Routes>
              <Route exact path='/' element={
                <Index length={length} wordList={wordList} setUrl={setUrl} setLength={setLength} loggedIn = {loggedIn}></Index>}>
              </Route>
              <Route exact path='/leaderboard' element={
                <Leaderboard></Leaderboard>}>
              </Route>
              <Route exact path='/newaccount' element={
                <NewAccount loggedIn = {loggedIn}></NewAccount>}>
              </Route>
              <Route exact path='/profile' element={
                <Profile loggedIn = {loggedIn} username={username}></Profile>}>
              </Route>
            </Routes>
          </div>
        </Router>
      </>
    );
  } else {
    return (
      <div className="loader"></div>
    );
  }

}

export default App;
