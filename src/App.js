import React, { useEffect } from "react";
import './App.css';
import Login from "./Login"
import { getTokenFromURL } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player";
import { useStateValue } from "./StateProvider";

const spotify = new SpotifyWebApi();

function App() {
	const [token, dispatch] = useStateValue();

	// Run code based on condition in second parameter 
	useEffect(() => {
		const hash = getTokenFromURL(); // Grab token from URL
		window.location.hash = ""; // Clear access hash from window
		const accessToken = hash.access_token;

		if (accessToken) {
			
			spotify.setAccessToken(accessToken); // Give access token to Spotify API

			// Set access token
			dispatch({
				type: "SET_TOKEN",
				token: accessToken
			});

			// Set spotify
			dispatch({
				type: "SET_SPOTIFY",
				spotify: spotify,
			})

			// Set the user
			spotify.getMe().then((user) => {
				dispatch({
					type: "SET_USER",
					user: user,
				});
			});

			// Set playlists & discover weekly
			spotify.getUserPlaylists().then((playlists) => {
				dispatch({
					type: "SET_PLAYLISTS",
					playlists: playlists,
				});
			});

			// Set top artists
			spotify.getMyTopArtists().then((top_artists) => {
				dispatch({
					type: "SET_TOP_ARTISTS",
					top_artists: top_artists,
				});
			});

			// Set discover weekly
			spotify.getPlaylist("6R7pGuYieN8q4OnGc7iLhp").then((playlist) => {
				dispatch({
					type: "SET_DISCOVER_WEEKLY",
					discover_weekly: playlist,
				});
			})
		}

		
	}, [token, dispatch]);

	return (
    	<div className="app">
			{token ? <Player spotify={spotify} /> : <Login />}
		</div>
  	);
}

export default App;
