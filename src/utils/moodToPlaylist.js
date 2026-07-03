// For each mood, paste a YouTube VIDEO ID or PLAYLIST ID.
// How to get one:
//  - Video: open any YouTube video, e.g. https://www.youtube.com/watch?v=XXXXXXXXXXX
//           → the part after "v=" is the video ID.
//  - Playlist: open a playlist, e.g. https://www.youtube.com/playlist?list=YYYYYYYYYY
//           → the part after "list=" is the playlist ID.
// Search YouTube for terms like "pop feel good playlist", "lofi ambient radio", etc.,
// pick one you like, and paste its ID below.

export const moodToPlaylist = {
  happy:    { type: "video", id: "pIvf9bOPXIw" },  // Pop / Feel-good
  sad:      { type: "video", id: "ljnGl5nvUJY" },  // Acoustic / Soft indie
  anxious:  { type: "video", id: "iGvcyYwNV7E" },  // Lo-fi / Ambient
  angry:    { type: "video", id: "De9VIp37CjY" },  // Rock / Punk
  calm:     { type: "video", id: "2Vv-BfVoq4g" },  // Jazz / Chillhop
  excited:  { type: "video", id: "fcnDmrtj6Sk" },  // Dance / Electropop
};

export function getEmbedUrlForMood(mood) {
  const entry = moodToPlaylist[mood];
  if (!entry || entry.id === "PASTE_VIDEO_ID_HERE") return null;

  if (entry.type === "playlist") {
    return `https://www.youtube.com/embed/videoseries?list=${entry.id}`;
  }
  return `https://www.youtube.com/embed/${entry.id}`;
}