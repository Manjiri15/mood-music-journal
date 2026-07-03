import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { moodToGenre, getGenreForMood } from "../utils/moodToGenre";

export default function EntryForm() {
  const [text, setText] = useState("");
  const [mood, setMood] = useState("happy");
  const { currentUser } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;

    await addDoc(collection(db, "entries"), {
      uid: currentUser.uid,
      text,
      mood,
      genre: getGenreForMood(mood),
      createdAt: serverTimestamp(),
    });

    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="entry-form">
      <textarea
        placeholder="How are you feeling today?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        required
      />
      <div className="entry-form-row">
        <select value={mood} onChange={(e) => setMood(e.target.value)}>
          {Object.keys(moodToGenre).map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <button type="submit" className="btn-primary">Save Entry</button>
      </div>
    </form>
  );
}