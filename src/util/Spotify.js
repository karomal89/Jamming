const clientId = 'ce8032b2827f44f7adaa4204c1c28a6d';
const redirectUri = 'http://localhost:3000';
let accessToken;

const Spotify = {
    getAccessToken(){
        if (accessToken) {
            return accessToken;
        } 


        // chech for access token match 
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            // clear parameters and allows us to grab new access token
            window.setTimeout(() => accessToken= '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;    
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    }
}

export default Spotify;