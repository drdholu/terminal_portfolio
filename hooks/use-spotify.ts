import useSWR from "swr";

export interface SpotifySong {
  name: string;
  artist: string;
  album: string;
  url: string;
  image: string;
  played_at: string;
}

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  });

export function useSpotifySong() {
  const { data, error, isLoading } = useSWR<SpotifySong>(
    "/api/spotify",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // avoid refetching within 60 s
    }
  );

  return {
    song: data,
    isLoading,
    isError: error,
  } as const;
}

