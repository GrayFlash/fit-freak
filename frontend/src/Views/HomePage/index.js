import { Button } from "bootstrap";
import React from "react";
import 'react-toggle/style.css';
import './../../assets/css/App.css'

const HomePage = () => {
    return (
        <div className="background">
            <div className="text-box">
                <h1>Fit-o-rama</h1>
                <br/><br/>
                <h3>How do you want us to help you today??</h3>
                <br/>
                <div className="button-group">
                    <button>Join a Video Call</button>
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