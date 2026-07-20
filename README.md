# CodeSnip 🚀

A full-stack **Developer Snippet Manager** where developers can save, organize, search, and share reusable code snippets.

🌐 **Live Demo:** [https://code-snip-dun.vercel.app](https://code-snip-dun.vercel.app)

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure signup and login with bcrypt password hashing
- 📝 **Snippet Management** — Create, edit, delete and search code snippets
- 🎨 **Syntax Highlighting** — CodeMirror editor with support for JavaScript, Python, Java, HTML, CSS, C++
- 🌍 **Public/Private Snippets** — Share public snippets via unique shareable URLs
- 🤖 **AI Code Explanation** — Google Gemini AI explains your code in simple words
- 👤 **Profile Avatar** — Shows user info and saved snippet count
- 🔍 **Real-time Search** — Filter snippets by title or language instantly
- 📱 **Responsive UI** — Works on all screen sizes

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Authentication | JWT, bcrypt |
| Code Editor | CodeMirror |
| AI | Google Gemini API |
| Deployment | Vercel (frontend), Render (backend) |

---

## 📁 Project Structure

```
codesnip/
├── client/                  ← React Frontend
│   └── src/
│       ├── components/
│       │   ├── Navbar.js
│       │   ├── Card.js
│       │   ├── Login.js
│       │   ├── Signup.js
│       │   ├── AddSnippet.js
│       │   ├── EditSnippet.js
│       │   ├── LandingPage.js
│       │   └── PublicSnippet.js
│       ├── App.js
│       └── App.css
└── server/                  ← Node.js Backend
    ├── index.js
    ├── User.js
    └── .env
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Google Gemini API key

### Installation

**1. Clone the repository:**
```bash
git clone https://github.com/Ishra01/CodeSnip.git
cd CodeSnip
```

**2. Setup Backend:**
```bash
cd server
npm install
```

Create `.env` file in server folder:
```
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

Start the server:
```bash
node index.js
```

**3. Setup Frontend:**
```bash
cd client
npm install
npm start
```

App runs at `http://localhost:3000` 🎉

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | Login user | No |
| GET | `/snippets` | Get user's snippets | Yes |
| POST | `/snippets` | Create new snippet | Yes |
| PUT | `/snippets/:id` | Update snippet | Yes |
| DELETE | `/snippets/:id` | Delete snippet | Yes |
| PATCH | `/snippets/:id/visibility` | Toggle public/private | Yes |
| GET | `/snippets/public/:id` | View public snippet | No |
| POST | `/explain` | AI code explanation | No |

---

## 🌐 Deployment

| Service | Platform | URL |
|---------|----------|-----|
| Frontend | Vercel | https://code-snip-dun.vercel.app |
| Backend | Render | https://codesnip-2dmh.onrender.com |
| Database | MongoDB Atlas | Cloud hosted |

---

## 📸 Screenshots

### Landing Page
Beautiful landing page for new visitors with features overview.

### Dashboard
Personal snippet dashboard with syntax-highlighted code cards.

### Add Snippet
CodeMirror-powered editor with real-time syntax highlighting.

### Public Snippet
Shareable public snippet viewer — no login required.

---

## 👩‍💻 Author

**Ishra Khan**
- GitHub: [@Ishra01](https://github.com/Ishra01)
- Email: khanishra406@gmail.com
- B.Tech CSE (Cybersecurity) — LNCT Bhopal

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

⭐ If you found this project helpful, please give it a star!
