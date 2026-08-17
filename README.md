<img width="1920" height="842" alt="Screenshot (342)" src="https://github.com/user-attachments/assets/39ff8909-9341-46d5-86ab-cdefc48dfb00" />
<img width="1920" height="820" alt="Screenshot (341)" src="https://github.com/user-attachments/assets/cbd0bbad-711d-437d-abd7-b39f215b2876" />


# Ajo Savings Tracker

A digital tracker for Ajo (also known as Esusu or Adashi) — the community-based contributory savings system widely practiced across Nigeria. Built as a capstone project for the **3MTT Program** (Project Code: SD-04).

**Live App:** https://ajo-savings-tracker.vercel.app
**Backend API:** https://ajo-savings-tracker-backend.onrender.com

---

## The Problem

Ajo groups traditionally track contributions manually — in notebooks, WhatsApp messages, or scattered spreadsheets. This makes it easy to lose track of who has paid, how much has been saved, and creates room for disputes and misunderstandings between members.

## What This App Does

Ajo Savings Tracker gives every group a single, shared, transparent record of contributions. Group organizers can create a group, members can request to join, and once approved, their contributions are logged and automatically totaled — no manual addition, no lost records.

### A Note on the Variant

Ajo exists in two common forms:
- **Rotating pot (ROSCA-style):** the pooled contributions rotate to one member per cycle, until everyone has received a payout.
- **Individual accumulation (this project):** each member has their own running balance that accumulates over time, with no rotation.

This project implements the **individual-accumulation variant**. As a result, "payout order" — relevant only to the rotating model — is not applicable here by design.

Payment processing is intentionally out of scope. This app is a **record-keeping tool**, not a payment gateway — contributions still happen outside the app (cash, bank transfer, mobile money), and are logged here for transparency and accountability.

---

## Key Features

- **Group creation** — set a name, contribution amount, frequency, and an admin PIN
- **Join requests** — new members request to join a group; they don't appear as members until approved
- **PIN-protected admin actions** — approving members and recording contributions both require the group's admin PIN, entered once per session and never stored
- **Automatic running totals** — each member's savings balance is calculated live from their contribution history
- **Responsive design** — usable on both desktop and mobile screens

---

## Tech Stack

**Frontend:** React (Vite), React Router
**Backend:** Node.js, Express
**Database & Auth:** Supabase (PostgreSQL)
**Security:** bcryptjs (PIN hashing)
**Deployment:** Vercel (frontend), Render (backend)

---

## Project Structure
ajo-savings-tracker/
├── frontend/ # React (Vite) app
│ ├── src/
│ │ ├── components/ # Reusable UI pieces (Navbar, forms, cards)
│ │ ├── pages/ # Route-level pages (Home, Dashboard, GroupDetail, etc.)
│ │ └── api.js # Centralized backend API calls
├── backend/ # Express API
│ ├── routes/ # groups, members, contributions
│ ├── config/ # Supabase client setup
│ └── utils/ # PIN verification helper
---

## Running Locally

### Prerequisites
- Node.js installed
- A Supabase project with `groups`, `members`, and `contributions` tables set up

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:
```bash
npm run dev
```

Visit `http://localhost:5173`.

---

## A Note on Free-Tier Hosting

The backend is hosted on Render's free tier, which spins down after periods of inactivity. The **first** request after idle time may take 20-50 seconds to respond while the server wakes up — subsequent requests are fast. This is expected behavior, not a bug.

---

## Author

**Victor Ahmedu**
GitHub: [@Victor-Ahmedu](https://github.com/Victor-Ahmedu)

Built for the 3MTT Program — Individual Capstone Project (SD-04).
