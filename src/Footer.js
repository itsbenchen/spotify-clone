import React, { useEffect } from 'react';
import "./Footer.css";

import { useStateValue } from "./StateProvider";

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import { Grid, Slider } from "@material-ui/core";


function Footer({ spotify }) {
    const [{ item, playing }, dispatch] = useStateValue();

    useEffect(() => {
        spotify
            .getMyCurrentPlaybackState()
            .then((response) => {
                dispatch({
                    type: "SET_PLAYING",
                    playing: response.is_playing,
                })
                
                dispatch({
                    type: "SET_ITEM",
                    item: response.item,
                });
            });
    }, [spotify, dispatch]);

    const handlePlayAndPause = () => {
        if (playing) {
            spotify.pause();
            dispatch({
                type: "SET_PLAYING",
                playing: false,
            });
        }
        else {
            spotify.play();
            dispatch({
                type: "SET_PLAYING",
                playing: true,
            });
        }
    };

    const skipToNext = () => {
        spotify.skipToNext();
        spotify
            .getMyCurrentPlayingTrack()
            .then((response) => {
                dispatch({
                    type: "SET_ITEM",
                    item: response.item,
                });

                dispatch({
                    type: "SET_PLAYING",
                    playing: true,
                });
            });
    };

    const skipToPrevious = () => {
        spotify.skipToPrevious();
        spotify
            .getMyCurrentPlayingTrack()
            .then((response) => {
                dispatch({
                    type: "SET_ITEM",
                    item: response.item,
                });

                dispatch({
                    type: "SET_PLAYING",
                    playing: true,
                });
            });
    };

    return (
        <div className="footer">

            {/* Album info + Current Song playing */}
            <div className="footer-left">
                {/* Album logo */}
                <img
                    className="footer-albumLogo"
                    src={item?.album.images[0].url}
                    alt={item?.name}
                />

                {/* Song info */}
                {item ? 
                (
                    <div className="footer-songInfo">
                        <h4>{item.name}</h4>
                        <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
                    </div>
                ) : (
                    <div className="footer-songInfo">
                        <h4>No song is currently playing</h4>
                        <p>...</p>
                    </div>
                )}
            </div>
            
            {/* Contains the playback features: play, pause, next, and etc... */}
            <div className="footer-center">
                <ShuffleIcon className="footer-icon" />
                <SkipPreviousIcon onClick={skipToNext} className="footer-icon" />
                {playing ? 
                (
                    <PauseCircleOutlineIcon onClick={handlePlayAndPause} fontSize="large" className="footer-icon" />
                ) : (
                    <PlayCircleOutlineIcon onClick={handlePlayAndPause} fontSize="large" className="footer-icon" />
                )}
                <SkipNextIcon onClick={skipToPrevious} className="footer-icon" />
                <RepeatIcon className="footer-icon" />
            </div>

            <div className="footer-right">
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlayIcon />
                    </Grid>
                    <Grid item>
                        <VolumeDownIcon />
                    </Grid>
                    <Grid item xs>
                        <Slider aria-labelledby="continous-slider" />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Footer;
