# 🃏 Planning Poker

A modern, responsive **Planning Poker** application built with **React, TypeScript, and Vite**.
This tool helps agile development teams estimate story points collaboratively using a beautiful Swiss-themed card design.

![App Screenshot](./assets/planning_poker.png)

---

## ✨ Features

- 🎴 **Beautiful Card Design**: Custom Swiss-themed playing cards with gradient patterns
- 📱 **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- 👥 **Real-time Collaboration**: Track multiple players and their voting status
- 📊 **Average Calculation**: Automatically calculates story point averages (excludes special cards like ☕)
- 🎯 **Interactive Voting**: Click cards to vote, with visual feedback and hover effects
- 🌓 **Dark Mode Ready**: Built with `shadcn/ui` components for consistent theming (In Progress)
- ♿ **Accessible**: Keyboard navigation and screen reader support

---

## 🛠 Tech Stack

- ⚛️ **React 18** – Modern React with hooks
- 🟦 **TypeScript** – Type-safe development
- ⚡ **Vite** – Fast build tool and dev server
- 🎨 **Tailwind CSS** – Utility-first CSS framework
- 🧩 **shadcn/ui** – High-quality component library
- ✨ **Lucide React** – Beautiful icons

---

## 🚀 Getting Started

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) **16+**
- npm / yarn / pnpm

### 📥 Installation

Clone the repository:

```bash
git clone <repository-url>
cd planning-poker
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🎮 How to Use

### Starting a Session

1. Enter your name on the welcome screen
2. Click **"Join Session"** to create/join a planning poker session

### Voting

- Select a card from the bottom row to cast your vote
- Your vote will appear in the center table area
- Other players' votes are hidden until results are revealed

### Managing Players

- **Desktop:** Use the sidebar on the right
- **Mobile:** Tap the **Players** button in the top-right corner
- **Add Players:** Click **Add Random User** to simulate teammates

### Viewing Results

- Click **See Average** once votes are cast
- Averages exclude special cards (`☕`)
- Click center cards to peek at individual votes
- Use **Reset** to start a new estimation

---

## 🃏 Card Values

Standard Planning Poker cards:
`1, 2, 3, 5, 8, 13, 21, 34`

Special Cards:

- ☕ – Coffee break / Need more discussion

---

## 📂 Project Structure

```
src/
├── components/
│   ├── AddUser.tsx         # User registration form
│   ├── Table.tsx           # Central voting table
│   ├── UsersSidebar.tsx    # Player management sidebar
│   ├── PaymeSwissCard.tsx  # Swiss-themed card component
│   └── ui/                 # shadcn/ui components
├── lib/
│   └── utils.ts            # Card values and utility functions
└── pages/
    └── Home.tsx            # Main application logic
```

---

## 🔑 Key Features Explained

### Responsive Design

- **Desktop:** Sidebar layout with full card selection
- **Mobile:** Sheet-based sidebar with scrolling cards
- **Tablet:** Optimized for touch interaction

### Card Interactions

- Hover effects (scale + shadows)
- Selected card highlighting (blue)
- Peek functionality for voted cards

### State Management

- Local React state only (no backend required)
- Automatic vote calculation + status tracking

---

## ⚙️ Development

Available scripts:

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
npm run lint    # Run ESLint
```

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the **`dist/`** directory.
