import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getEmbedUrlForMood } from "../utils/moodToPlaylist";
import { FaSpotify } from "react-icons/fa";
import { getSpotifyPlaylistUrl } from "../utils/musicLinks";

const moodGradients = {
  happy: "linear-gradient(135deg, #FFD166, #FF8C42)",
  sad: "linear-gradient(135deg, #A78BFA, #FF5C8A)",
  anxious: "linear-gradient(135deg, #FF8C42, #FF5C8A)",
  angry: "linear-gradient(135deg, #FF5C8A, #C81E5C)",
  calm: "linear-gradient(135deg, #6EE7B7, #FF8C42)",
  excited: "linear-gradient(135deg, #FF5C8A, #FFD166)",
};

export default function EntryCard({ entry }) {
  async function handleDelete() {
    await deleteDoc(doc(db, "entries", entry.id));
  }

  const embedUrl = getEmbedUrlForMood(entry.mood);
  const orbGradient = moodGradients[entry.mood] || "linear-gradient(135deg, var(--pink), var(--orange))";

  return (
    <div className="entry-card">
      <div className="entry-orb" style={{ background: orbGradient }} />
      <div className="entry-body">
        <p className="entry-text">{entry.text}</p>
        <div className="entry-meta">
          <span className="entry-mood">{entry.mood}</span>
          <span className="entry-genre">{entry.genre}</span>
        </div>

        {embedUrl && (
          <iframe
            width="100%"
            height="80"
            src={embedUrl}
            title={`${entry.mood} music`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="entry-embed"
          />
        )}

        <div className="entry-actions">
          <a href={getSpotifyPlaylistUrl(entry.mood)} target="_blank" rel="noopener noreferrer" className="btn-listen btn-spotify">
            <FaSpotify size={16} /> Spotify
          </a>
          <button onClick={handleDelete} className="btn-delete">Delete</button>
        </div>
      </div>
    </div>
  );
}