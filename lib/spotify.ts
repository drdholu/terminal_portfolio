import querystring from "querystring";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

const ENDPOINTS = {
  nowPlaying: "https://api.spotify.com/v1/me/player/currently-playing",
  topTracks: "https://api.spotify.com/v1/me/top/tracks",
  topArtists: "https://api.spotify.com/v1/me/top/artists",
} as const;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token,
    }),
    cache: "no-store",
  });

  const data = await response.json();
  return data.access_token as string | undefined;
};

const fetchFromSpotify = async (endpoint: string) => {
  const access_token = await getAccessToken();
  return fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-store",
  });
};

export const getNowPlaying = async () => fetchFromSpotify(ENDPOINTS.nowPlaying);
export const getTopTracks = async () => fetchFromSpotify(ENDPOINTS.topTracks);
export const getTopArtists = async () => fetchFromSpotify(ENDPOINTS.topArtists);


