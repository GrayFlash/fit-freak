import React from "react";
import { v1 as uuid } from "uuid";
import 'react-toggle/style.css';
import { useNavigate } from "react-router-dom";
import './../../assets/css/App.css'

const HomePage = (props) => {
    let navigate = useNavigate();

    function createRoom() {
        const id = uuid();
        console.log("room id created",id)
        console.log(props, " props.history: ", props.history)
        navigate(`/room/${id}`);
    }
    return (
        <div className="background">
            <div className="text-box">
                <h1>Fit-o-rama</h1>
                <br/><br/>
                <h3>How do you want us to help you today??</h3>
                <br/>
                <div className="button-group">
                    <button onClick={createRoom}>Join a Video Call</button>
                    <button>Go for pose accuracy</button>
                </div>
            </div>

            <div className="bottom">
                Made with ❤️ by GrayFlash
            </div>
        </div>
    );
};

export default HomePage;