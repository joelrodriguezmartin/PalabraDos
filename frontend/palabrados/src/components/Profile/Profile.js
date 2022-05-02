import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Profile(props) {
    const navigate = useNavigate();
    const [userScore, setUserScore] = useState(0);
    const [scoreIsLoaded, setScoreIsLoaded] = useState(false);
    useEffect(() => {
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
                </div>

            </div>
        )
    } else {
        return (
            <div className="loader"></div>
        )
    }

}
