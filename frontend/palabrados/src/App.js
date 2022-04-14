import React, { useEffect, useState } from 'react'
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './components/Index/Index';
import Leaderboard from './components/Leaderboard/Leaderboard';
import NewAccount from './components/NewAccount/NewAccount'

function App() {
  const [wordList, setWordList] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [url, setUrl] = useState("http://localhost/backend/dictionary.php?length=5");
  const [length, setLength] = useState(5);

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
    return (
      <>
        <Router>
          <Navbar></Navbar>
          <div className="container-fluid bg-secondary text-light">
            <Routes>
              <Route exact path='/' element={
                <Index length={length} wordList={wordList} setUrl={setUrl} setLength={setLength}></Index>}>
              </Route>
              <Route exact path='/leaderboard' element={
                <Leaderboard></Leaderboard>}>
              </Route>
              <Route exact path='/newaccount' element={
                <NewAccount></NewAccount>}>
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
