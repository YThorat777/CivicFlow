# CivicFlow

A simulated enterprise-grade citizen service portal, built with **Next.js (App Router)**, **React**, **TypeScript**, and **Tailwind CSS**.

CivicFlow lets a citizen sign in, browse different government-style services, submit applications, attach supporting documents for their applications, track the status of each request through a review timeline, and stay on top of everything from a dashboard.

All data is simulated. There is no real backend — authentication, applications, documents, and notifications are persisted to the browser's `localStorage` so the app behaves statefully across a session and page reloads, without ever sending data anywhere.

> ## Features

- **Authentication** — a simulated sign-in flow (`context/AuthContext.tsx`) with a seeded demo account and session persistence.
- **Service catalogue** — browse and search civic services by category (Identity, Housing, Business, Health, Transport, Records), each with its own dynamic application form.
- **Applications** — submit an application, attach relevant documents, and track it through a status timeline (Submitted → In Review → Additional Info Requested / Approved / Denied). A reviewer simulator panel lets you advance an application's status to see the tracker update live.
- **Document management** — drag and drop (or click to browse) upload, categorization, and deletion of documents.
- **Dashboard** — view stats, recent applications, and an activity feed.
- **Notifications** — a log of status changes and document activity, with unread indicators and mark as read.

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Demo login

| Field    | Value                      |
| -------- | -------------------------- |
| Email    | `test.user@example.com`  |
| Password | `civic123`                 |

The login screen also has a "Fill in demo credentials" shortcut.
