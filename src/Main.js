import React from "react";
import "./Main.css";
import Header from "./Header";

import { useStateValue } from "./StateProvider";

import SongRow from "./SongRow";

import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

function Main({ spotify }) {

    const [{ discover_weekly }, dispatch] = useStateValue();

    const playPlaylist = (id) => {
        spotify
            .play({ context_uri: `spotify:playlist:6R7pGuYieN8q4OnGc7iLhp` })
            .then((response) => {
                spotify.getMyCurrentPlayingTrack().then((reply) => {
                    dispatch({
                        type: "SET_ITEM",
                        item: reply.item,
                    });

                    dispatch({
                        type: "SET_PLAYING",
                        playing: true,
                    });
                });
            });
    };

    const playSong = (id) => {
        spotify
            .play({ uris: [`spotify:track:${id}`] })
            .then((response) => {
                spotify.getMyCurrentPlayingTrack().then((reply) => {
                    dispatch({
                        type: "SET_ITEM",
                        item: reply.item,
                    });

                    dispatch({
                        type: "SET_PLAYING",
                        playing: true,
                    });
                });
            });
    };

    return (
        <div className="main">
            {/* Header with user info and search bar */}
            <Header spotify={spotify} />

            {/* Rest of main's body */}
            <div className="body-info">
                <img src={discover_weekly?.images[0].url} alt="" />
                <div className="body-infoText">
                    <strong>PLAYLIST</strong>
                    <h2>Discover Weekly</h2>
                    <p>{discover_weekly?.description}</p>
                </div>
            </div>
            <hr />
            <div className="body-songs">
                <div className="body-icons">
                    <PlayCircleFilledIcon className="body-shuffle" onClick={playPlaylist} />
                    <FavoriteIcon fontSize="large" />
                    <MoreHorizIcon />
                </div>

                {discover_weekly?.tracks.items.map((item) => (
                    <SongRow playSong={playSong} track={item.track} />
                ))}

            </div>
        </div>
    );
}

export default Main;
