export const moodToGenre = {
  happy: "Pop / Feel-good",
  sad: "Acoustic / Soft indie",
  anxious: "Lo-fi / Ambient",
  angry: "Rock / Punk",
  calm: "Jazz / Chillhop",
  excited: "Dance / Electropop",
};

export function getGenreForMood(mood) {
  return moodToGenre[mood] || "Chill / Mixed";
}