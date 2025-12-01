const express = require("express");
const path = require("path");
const conf = require("./config")
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
const port = 3000

app.set("views", "src")
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "src")))

const spotifyApi = new SpotifyWebApi({
    clientId: conf.music.spotify.clientId,
    clientSecret: conf.music.spotify.clientSecret,
    redirectUri: 'http://localhost:3000/callback'
});

if (conf.music.spotify.refreshToken) {
    spotifyApi.setRefreshToken(conf.music.spotify.refreshToken);
}

app.get("/", (req, res) => {
    res.render("index", {conf: conf})
})

app.get("/api/music", async (req, res) => {
    try {
        console.log('[Music API] Request received');
        
        if (!conf.music || !conf.music.enabled) {
            console.log('[Music API] Music disabled in config');
            return res.json({ tracks: [] });
        }

        console.log('[Music API] Fetching Spotify tracks');
        let tracks = await getSpotifyTracks();

        const nowPlaying = tracks.filter(t => t.isNowPlaying);
        const recentlyPlayed = tracks.filter(t => !t.isNowPlaying).sort((a, b) => new Date(b.playedAt) - new Date(a.playedAt));
        
        let result = [];
        if (nowPlaying.length > 0) {
            result = [...nowPlaying, ...recentlyPlayed.slice(0, Math.max(0, (conf.music.showCount || 6) - nowPlaying.length))];
        } else {
            result = recentlyPlayed.slice(0, conf.music.showCount || 6);
        }
        
        console.log('[Music API] Returning', result.length, 'tracks (', nowPlaying.length, 'now playing,', result.length - nowPlaying.length, 'recently played)');
        res.json({ tracks: result });
    } catch (error) {
        console.error('[Music API] Error:', error.message);
        res.json({ tracks: getMockTracks().slice(0, conf.music.showCount || 5) });
    }
});

async function getSpotifyTracks() {
    try {
        console.log('[Spotify API] Fetching tracks');
        
        if (!conf.music.spotify.refreshToken) {
            console.warn('[Spotify API] No refresh token configured - using mock tracks');
            return getMockTracks();
        }

        let accessToken;
        try {
            const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + Buffer.from(conf.music.spotify.clientId + ':' + conf.music.spotify.clientSecret).toString('base64')
                },
                body: 'grant_type=refresh_token&refresh_token=' + conf.music.spotify.refreshToken
            });

            if (!tokenResponse.ok) {
                console.error('[Spotify API] Token refresh failed:', tokenResponse.status);
                return getMockTracks();
            }

            let tokenData;
            try {
                const tokenText = await tokenResponse.text();
                if (!tokenText || tokenText.trim() === '') {
                    console.error('[Spotify API] Empty token response');
                    return getMockTracks();
                }
                tokenData = JSON.parse(tokenText);
            } catch (parseError) {
                console.error('[Spotify API] Token parse error:', parseError.message);
                return getMockTracks();
            }
            accessToken = tokenData.access_token;
            console.log('[Spotify API] Access token refreshed');
        } catch (refreshError) {
            console.error('[Spotify API] Token refresh error:', refreshError.message);
            return getMockTracks();
        }

        let allTracks = [];

        const currentlyPlayingResponse = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });

        if (currentlyPlayingResponse.ok) {
            try {
                const currentData = await currentlyPlayingResponse.json();
                if (currentData && currentData.item && currentData.is_playing) {
                    allTracks.push({
                        name: currentData.item.name,
                        artist: currentData.item.artists?.[0]?.name || 'Unknown',
                        artwork: currentData.item.album?.images?.[0]?.url,
                        url: currentData.item.external_urls?.spotify,
                        playedAt: new Date().toISOString(),
                        isNowPlaying: true
                    });
                    console.log('[Spotify API] Now playing:', allTracks[0]?.name);
                }
            } catch (e) {
                console.warn('[Spotify API] Currently playing parse error:', e.message);
            }
        }

        const tracksResponse = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=10', {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });

        if (!tracksResponse.ok) {
            const errorText = await tracksResponse.text();
            console.warn('[Spotify API] Recently played API failed:', tracksResponse.status, errorText);
            return allTracks.length > 0 ? allTracks : getMockTracks();
        }

        let recentlyPlayedData;
        try {
            recentlyPlayedData = await tracksResponse.json();
        } catch (parseError) {
            console.error('[Spotify API] JSON parse error:', parseError.message);
            return allTracks.length > 0 ? allTracks : getMockTracks();
        }

        if (recentlyPlayedData.items && recentlyPlayedData.items.length > 0) {
            const recentTracks = recentlyPlayedData.items.map(item => ({
                name: item.track.name,
                artist: item.track.artists?.[0]?.name || 'Unknown',
                artwork: item.track.album?.images?.[0]?.url,
                url: item.track.external_urls?.spotify,
                playedAt: item.played_at,
                isNowPlaying: false
            }));
            allTracks = allTracks.concat(recentTracks);
        }

        if (allTracks.length === 0) {
            console.warn('[Spotify API] No tracks found');
            return getMockTracks();
        }

        console.log('[Spotify API] Successfully fetched', allTracks.length, 'tracks (including now playing)');
        return allTracks;
    } catch (e) {
        console.error('[Spotify API] Error:', e.message);
        console.log('[Spotify API] Falling back to mock tracks');
        return getMockTracks();
    }
}

function getMockTracks() {
    return [
        { name: "Blinding Lights", artist: "The Weeknd", artwork: "https://via.placeholder.com/80?text=BL", url: "https://open.spotify.com" },
        { name: "Shape of You", artist: "Ed Sheeran", artwork: "https://via.placeholder.com/80?text=SY", url: "https://open.spotify.com" },
        { name: "One Kiss", artist: "Calvin Harris & Dua Lipa", artwork: "https://via.placeholder.com/80?text=OK", url: "https://open.spotify.com" },
        { name: "Levitating", artist: "Dua Lipa", artwork: "https://via.placeholder.com/80?text=LV", url: "https://open.spotify.com" },
        { name: "Anti-Hero", artist: "Taylor Swift", artwork: "https://via.placeholder.com/80?text=AH", url: "https://open.spotify.com" }
    ];
}

app.listen(port, () => {
    console.log('The Server is online. Port:' + port)
    console.log('Everything is running smoothly!')
})