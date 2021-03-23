import React from 'react';
import "./Login.css";
import { accessURL } from "./spotify";

function Login() {
    return (
        <div className="login">
            <div className="login-header">
                {/* Spotify Logo */}
                <img 
                    id="spotify-logo"
                    src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Black.png"
                    alt=""
                />
            </div>

			{/* Login with spotify buttons */}
            <div className="login-container">
                <a href={accessURL}>
                    Login with Spotify
                </a>
            </div>
        </div>
    );
}

export default Login;
