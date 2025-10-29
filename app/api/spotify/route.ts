import { NextResponse } from "next/server";
import { getNowPlaying } from "@/lib/spotify";

export const revalidate = 120;

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
    const nowRes = await getNowPlaying();

    // 204 means nothing is playing
    if (nowRes.status === 204) {
      return NextResponse.json({ isPlaying: false });
    }

    if (!nowRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch currently playing track." },
        { status: nowRes.status }
      );
    }

    const song = await nowRes.json();
    const item = song?.item;
    const isPlaying = Boolean(song?.is_playing);

    if (!isPlaying || !item) {
      return NextResponse.json({ isPlaying: false });
    }

    // Shape the data we expose to the client when playing (matching current UI)
    return NextResponse.json({
      isPlaying: true,
      name: item.name,
      artist: item.artists?.map((a: { name: string }) => a.name).join(", "),
      album: item.album?.name,
      url: item.external_urls?.spotify,
      image: item.album?.images?.[0]?.url,
    });
  } catch {
    return NextResponse.json(
      { error: "Unexpected error while contacting Spotify." },
      { status: 500 }
    );
  }
}