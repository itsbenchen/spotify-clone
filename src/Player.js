import React from 'react';
import "./Player.css";
import Sidebar from "./Sidebar";
import Main from "./Main";
import Footer from "./Footer";

function Player({ spotify }) {
    return (
        <div className="player">
            <div className="player-body">
                {/* Sidebar */}
                <Sidebar />
                {/* Main Feed */}
                <Main spotify={spotify} />
            </div>
            {/* Footer */}
            <Footer spotify={spotify} />
        </div>
    );
}

export default Player;
