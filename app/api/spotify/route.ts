import { NextResponse } from "next/server";

export async function GET() {
  const {
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REFRESH_TOKEN,
  } = process.env;

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    return NextResponse.json(
      { error: "Spotify environment variables are not set." },
      { status: 500 }
    );
  }

  try {
    const basic = Buffer.from(
      `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
    ).toString("base64");

    // Refresh access token using the refresh token
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: SPOTIFY_REFRESH_TOKEN,
      }),
      // Access tokens are short-lived so we never want to cache this request
      cache: "no-store",
    });

    if (!tokenRes.ok) {
      return NextResponse.json(
        { error: "Failed to refresh Spotify token." },
        { status: tokenRes.status }
      );
    }

    const { access_token } = await tokenRes.json();

    // Fetch the most recently played track
    const recentlyRes = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=1",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        cache: "no-store",
      }
    );

    if (!recentlyRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch recently played track." },
        { status: recentlyRes.status }
      );
    }

    const data = await recentlyRes.json();
    const item = data.items?.[0];
    const track = item?.track;

    if (!track) {
      return NextResponse.json({ error: "No track found." }, { status: 404 });
    }

    // Shape the data we expose to the client
    return NextResponse.json({
      name: track.name,
      artist: track.artists?.[0]?.name,
      album: track.album?.name,
      url: track.external_urls?.spotify,
      image: track.album?.images?.[0]?.url,
      played_at: item.played_at,
    });
  } catch {
    return NextResponse.json(
      { error: "Unexpected error while contacting Spotify." },
      { status: 500 }
    );
  }
}