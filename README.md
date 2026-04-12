# ⚔️ WorkTracker — Setup Guide

A corporate RPG-themed office work tracker for small teams (2–5 people).

---

## 📦 File Structure

```
work-tracker/
├── index.html          ← Login page
├── dashboard.html      ← All team logs (view/edit)
├── log.html            ← Add a task entry
├── performance.html    ← Your personal KPI dashboard
├── admin.html          ← Admin panel (admin only)
├── css/style.css       ← Styles
├── js/
│   ├── config.js       ← ⚠️ Supabase credentials go here
│   ├── auth.js         ← Login / session logic
│   └── utils.js        ← Shared utilities
└── setup.sql           ← Run this in Supabase SQL Editor
```

---

## 🚀 Setup in 4 Steps

### Step 1 — Create a Supabase Project
1. Go to [https://supabase.com](https://supabase.com) and sign up (free)
2. Click **New Project**, give it a name (e.g. "WorkTracker"), set a DB password
3. Wait ~1 minute for the project to be ready

### Step 2 — Run the Database SQL
1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **New Query**
3. Paste the entire contents of `setup.sql`
4. Click **Run**
5. You should see: "Success. No rows returned"

### Step 3 — Add Your Supabase Credentials
1. In Supabase dashboard, go to **Project Settings → API**
2. Copy your **Project URL** and **anon public** key
3. Open `js/config.js` and replace:
   ```js
   const SUPABASE_URL      = 'YOUR_SUPABASE_URL';    // ← paste here
   const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // ← paste here
   ```

### Step 4 — Open and Log In
1. Open `index.html` in your browser (double-click, or use a local server)
2. Log in with the default admin credentials:
   - **Username:** `admin`
   - **Password:** `Admin@123`
3. Go to **Admin Panel → Users** to create accounts for your team members

> ⚠️ **Change the admin password**: After first login, create a new admin user with a secure password, then you can delete or reset the default one.

---

## 👥 Creating Team Members

1. Log in as admin
2. Go to **Admin Panel** (👑 in sidebar)
3. Under **Users** tab → fill in the **Create New User** form
4. Share the username + password with your team member
5. They log in and start tracking!

---

## 📱 Pages & Features

| Page | Who Can Access | What It Does |
|------|----------------|--------------|
| **Dashboard** | Everyone | View all task logs (own: edit/delete · others: view only) |
| **Log Task** | Everyone | Add a new task entry with auto-filled date/week/month |
| **My Performance** | Everyone (own only) | KPIs, charts, RPG level, badges |
| **Admin Panel** | Admin only | Create users, edit any record, compare team, export CSV |

---

## ⚔️ RPG Gamification

### Levels (based on total hours logged)
| Level | Name | Hours | Icon |
|-------|------|-------|------|
| 1 | Novice | 0–25h | ⚔️ |
| 2 | Apprentice | 26–75h | 🛡️ |
| 3 | Journeyman | 76–150h | ⚡ |
| 4 | Expert | 151–300h | 🔮 |
| 5 | Master | 301–500h | 🌟 |
| 6 | Legend | 501h+ | 👑 |

### Badges (10 total)
| Badge | Requirement |
|-------|-------------|
| 💯 Century Knight | Log 100+ hours |
| 🔥 Streak Warrior | 7 consecutive days |
| 🛡️ Support Guardian | 20+ Support tasks |
| 🧪 Test Mage | 20+ Testing tasks |
| 🚀 Project Champion | 20+ Project tasks |
| ⚡ Powerhouse | 8+ hours in one day |
| 🌟 All-Rounder | All 3 categories in one week |
| 📅 Veteran | 30+ unique active days |
| 🐦 Prolific | 50+ total tasks |
| 🏇 Workhorse | 250+ total hours |

---

## 📊 Performance Dashboard KPIs

- **Total Hours Logged** — cumulative hours
- **Tasks This Month** — count for current month
- **Current Streak** 🔥 — consecutive days with at least one log
- **Accomplishment Rate** — % of tasks with a key accomplishment noted
- **Days Active** — unique days with at least one task
- **Peak Day** — highest hours logged in a single day
- **Hours Per Category** — support / testing / project breakdown
- **Weekly Hours Chart** — last 10 weeks trend
- **Category Breakdown** — doughnut chart
- **Tasks Per Week** — bar chart

---

## 💾 Exporting Data (Admin)

Go to **Admin Panel → Export** tab:
- **All Records CSV** — every log from every user
- **By User CSV** — select a specific team member
- **By Month CSV** — select a specific month

---

## 🔒 Security Notes

This app uses **application-level authentication** (SHA-256 hashed passwords stored in Supabase). Row Level Security (RLS) is disabled for simplicity.

**For a production/sensitive environment**, consider:
- Enabling Supabase RLS with proper policies
- Hosting the files on a private server (not a public URL)
- Using HTTPS

---

## 🛠️ Local Development Tip

For best results, serve the files with a local server instead of opening directly:

```bash
# Python 3
python -m http.server 3000

# Node.js (npx)
npx serve .
```

Then open `http://localhost:3000` in your browser.

---

*WorkTracker v1.0 — Built with Supabase + Vanilla JS*
