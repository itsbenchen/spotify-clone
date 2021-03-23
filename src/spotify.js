// https://developer.spotify.com/documentation/web-playback-sdk/quick-start#

export const authenticationEndpoint = "https://accounts.spotify.com/authorize";

const redirectURI = "http://localhost:3000/";

// Spotify client ID from app
const clientID = "033d016db3e6478784698aa6d1f4c9ba";

// Scopes on what the user will 
const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
];

// URL for user to access their Spotify playlist and etc...
// What's being accessed is defined in scopes
export const accessURL = `${authenticationEndpoint}?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

// Get access token
export const getTokenFromURL = function () {
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
            // #accessToken=secret_key&name=user-name
            var parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
            return initial;
        }, {});
};