import React, { useEffect, useState } from 'react'

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [boardIsLoaded, setBoardIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost/backend/leaderboard.php");
      const data = await response.json();
      setLeaderboardData(data);
      setBoardIsLoaded(true);
    }
    fetchData();
  }, []);

  function renderLeaderBoard() {
    let tableArray = [];
    for (let index = 0; index < leaderboardData.length; index++) {
      tableArray.push(
        <tr key={index}><td>{index + 1}</td><td>{leaderboardData[index].username}</td><td>{leaderboardData[index].score}</td></tr>
      )
    }
    return <div className='col-8 mt-2'>
      <table className='table table-dark table-striped text-center leaderboard'>
        <tbody>
          <tr>
            <th>Posición</th>
            <th>Nombre de usuario</th>
            <th>Puntuación</th>
          </tr>
          {tableArray}
        </tbody>
      </table>
    </div>;
  };

  if (boardIsLoaded) {
    return (
      <div className="container main">
        <h1 className="text-center pt-2"> Tabla de puntuaciones</h1>
        <div className="row justify-content-center mt-3">
          {renderLeaderBoard()}
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="loader"></div>
    )
  }
}

