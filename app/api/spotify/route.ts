/* eslint-disable import/no-anonymous-default-export */
import { NextRequest } from "next/server";
import querystring from "querystring";

const {
	SPOTIFY_CLIENT_ID: client_id,
	SPOTIFY_CLIENT_SECRET: client_secret,
	SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

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
	});
	return response.json();
};

export const getNowPlaying = async () => {
	const { access_token } = await getAccessToken();
	return fetch(NOW_PLAYING_ENDPOINT, {
		headers: { Authorization: `Bearer ${access_token}` },
	});
};

export async function GET(req: NextRequest) {
	const response = await getNowPlaying();
	if (response.status === 204 || response.status > 400) {
		return new Response(JSON.stringify({ isPlaying: false }), { status: 200 });
	}
	const data = await response.json();
	if (data.currently_playing_type !== "track") {
		return new Response(JSON.stringify({ isPlaying: false }), { status: 200 });
	}
	const responseData = {
		isPlaying: data.is_playing,
		title: data.item.name,
		album: data.item.album.name,
		artist: data.item.album.artists.map((artist: { name: any }) => artist.name).join(", "),
		albumImageUrl: data.item.album.images[0].url,
		songUrl: data.item.external_urls.spotify,
	};
	return new Response(JSON.stringify(responseData), { status: 200 });
}