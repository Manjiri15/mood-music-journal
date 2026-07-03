export function getYoutubeSearchUrl(query) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

// Real, official Spotify playlists — one direct link per mood, no search needed
const moodToSpotifyPlaylist = {
  happy: "https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC",   // Happy Hits!
  sad: "https://open.spotify.com/playlist/37i9dQZF1DX7qK8ma5wgG1",     // Sad Songs
  anxious: "https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn", // lofi beats
  angry: "https://open.spotify.com/playlist/37i9dQZF1DWXRqgorJj26U",   // Rock Classics
  calm: "https://open.spotify.com/playlist/37i9dQZF1DX1s9knjP51Oa",    // calm vibes
  excited: "https://open.spotify.com/playlist/37i9dQZF1DXaXB8fQg7xif", // Dance Party
};

export function getSpotifyPlaylistUrl(mood) {
  return moodToSpotifyPlaylist[mood] || moodToSpotifyPlaylist.happy;
}