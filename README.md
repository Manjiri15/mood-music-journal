# Mood-to-Music Journal

A full-stack mood journaling application that pairs emotional check-ins with contextually matched music recommendations. Users authenticate, log daily mood entries, and receive real-time curated YouTube and Spotify suggestions tailored to their emotional state — all backed by a serverless, real-time architecture.

**Live application:** [mood-music-journal-15.web.app](https://mood-music-journal-15.web.app)

---

## Overview

Mood-to-Music Journal demonstrates a complete authentication-to-database-to-UI pipeline built on a modern JAMstack architecture. The application leverages Firebase's real-time infrastructure to deliver instant data synchronization without a custom backend, while React's component architecture and Context API handle client-side state management and route protection.

---

## Key Features

- **Secure authentication** — email/password sign-up and login via Firebase Authentication, with protected routes and persistent session handling
- **Real-time data synchronization** — Firestore's `onSnapshot` listeners deliver live updates across the UI with zero manual refresh logic
- **Mood-to-music recommendation engine** — a lightweight rules-based mapping layer that translates user-selected moods into genre classifications, embedded YouTube tracks, and curated Spotify playlists
- **Row-level data security** — Firestore security rules enforce strict per-user data isolation at the database layer, independent of client-side logic
- **Responsive, design-system-driven UI** — a custom pink-and-orange visual identity built on CSS custom properties, editorial typography pairing (Fraunces + Plus Jakarta Sans), and a signature gradient "mood orb" component
- **Production deployment pipeline** — continuous build-and-deploy workflow via Firebase Hosting, with environment-based configuration management

---

## Tech Stack

| Layer                  | Technology                                      |
|-------------------------|--------------------------------------------------|
| Frontend Framework      | React 19 (Vite)                                  |
| Client-Side Routing     | React Router v7                                  |
| Authentication          | Firebase Authentication                          |
| Database                | Cloud Firestore (NoSQL, real-time)               |
| Hosting / Deployment    | Firebase Hosting                                 |
| Icon System             | react-icons                                      |
| Version Control         | Git / GitHub                                     |

---

## Architecture

The application follows a client-heavy, serverless architecture pattern:

- **State management:** React Context API (`AuthContext`) provides global authentication state without prop drilling or external state libraries
- **Data layer:** Firestore acts as both the database and real-time event source, eliminating the need for polling or custom WebSocket infrastructure
- **Authorization model:** Access control is enforced at two layers — client-side route guards for UX, and Firestore security rules for actual data protection, ensuring the security boundary cannot be bypassed by manipulating client code
- **Recommendation logic:** A deterministic mood-to-genre mapping module decouples the recommendation logic from UI components, making it straightforward to later swap in a dynamic API-driven approach (e.g., the Spotify Web API) without touching presentation code

---

## How It Works

1. User authenticates via email/password (Firebase Authentication)
2. User submits a journal entry with free-text content and a selected mood tag
3. The entry, along with a derived genre and timestamp, is written to an `entries` collection in Firestore, scoped to the authenticated user's UID
4. A live Firestore query filters and orders entries by the current user's UID, streaming updates to the UI in real time
5. Each entry renders with an embedded YouTube track and a direct link to a curated Spotify playlist, both resolved via the mood-mapping utility layer

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS)
- A [Firebase project](https://console.firebase.google.com/) with Authentication (Email/Password) and Firestore enabled

### Installation

```bash
git clone https://github.com/Manjiri15/mood-music-journal.git
cd mood-music-journal
npm install
```

### Environment Configuration

Create a `.env` file at the project root with your Firebase project credentials:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

`.env` is excluded via `.gitignore` and should never be committed to version control.

### Local Development

```bash
npm run dev
```

Application runs at `http://localhost:5173`.

### Production Build & Deployment

```bash
npm run build
firebase deploy
```

---

## Data Security

Firestore security rules enforce strict per-user data ownership at the database layer, independent of any client-side validation:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /entries/{entryId} {
      allow read, delete: if request.auth != null && request.auth.uid == resource.data.uid;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.uid;
    }
  }
}
```

This guarantees data isolation even in the event of client-side compromise, since Firebase evaluates these rules server-side on every request.

---

## Project Structure

```
mood-music-journal/
├── src/
│   ├── firebase.js              # Firebase SDK configuration and initialization
│   ├── App.jsx                  # Route definitions and authentication guards
│   ├── index.css                # Design tokens and global styling
│   ├── context/
│   │   └── AuthContext.jsx      # Global authentication state provider
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── Journal.jsx
│   ├── components/
│   │   ├── EntryForm.jsx
│   │   └── EntryCard.jsx        # Mood visualization, YouTube embed, Spotify integration
│   └── utils/
│       ├── moodToGenre.js       # Mood-to-genre classification logic
│       ├── moodToPlaylist.js    # Mood-to-YouTube embed resolution
│       └── musicLinks.js        # Mood-to-Spotify playlist resolution
├── index.html
└── package.json
```

---

## Roadmap

- Historical mood trend visualization (data aggregation and charting)
- OAuth-based authentication (Google Sign-In)
- Dynamic Spotify Web API integration for personalized, non-static track recommendations
- Automated weekly mood summary notifications

---

## License

This project is available for personal and educational use.
