import { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import EntryForm from "../components/EntryForm";
import EntryCard from "../components/EntryCard";

export default function Journal() {
  const [entries, setEntries] = useState([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(
      collection(db, "entries"),
      where("uid", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setEntries(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return unsubscribe;
  }, [currentUser]);

  async function handleLogout() {
    await signOut(auth);
    navigate("/login");
  }

  return (
    <div className="journal-page">
      <header className="journal-header">
        <div>
          <h2>Your Mood Journal</h2>
          <p className="journal-date">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
        <button onClick={handleLogout} className="btn-logout">Log Out</button>
      </header>
      <EntryForm />
      <div className="entry-list">
        {entries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}