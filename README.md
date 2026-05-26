# MediQueue LK

MediQueue LK is a MERN stack clinic practice management system for a Sri Lankan private doctor practice. It includes public clinic pages, role-based dashboards, appointment booking, queue/token management, consultations, prescriptions, medical certificates, payment controls, stock tracking, alerts, finance checks, WhatsApp link generation, and reporting.

## Tech Stack

- Frontend: React.js + Vite
- Styling: Tailwind CSS
- Backend: Node.js + Express.js
- Database: MongoDB + Mongoose
- Auth: JWT + bcryptjs
- API: Axios
- Charts: Recharts
- PDF: PDFKit

## Project Structure

- `client/` React frontend
- `server/` Express API

## Setup

Install dependencies from the repository root:

```bash
npm install
```

Configure environment variables:

- Copy `server/.env.example` to `server/.env`
- Copy `client/.env.example` to `client/.env`

Start MongoDB locally and set `MONGODB_URI` in `server/.env`.

Seed sample data:

```bash
npm run seed --workspace server
```

Run the apps:

```bash
npm run dev --workspace server
npm run dev --workspace client
```

You can also start both together from the root:

```bash
npm run dev
```

## Seeded Login Accounts

Use these seeded users after running the seed script:

- Admin: `admin@mediqueuelk.com` / `Password@123`
- Doctor: `doctor@mediqueuelk.com` / `Password@123`
- Receptionist: `reception@mediqueuelk.com` / `Password@123`
- Patient: `patient@mediqueuelk.com` / `Password@123`

## API Notes

- Public endpoints are under `/api/public`
- Auth endpoints are under `/api/auth`
- Private endpoints require a Bearer JWT token
- WhatsApp communication uses generated `wa.me` links only
- Payment records are soft-controlled through audit logs and approval flows

## MVP Coverage

The current build includes:

- Public clinic website pages
- JWT login flow
- Role-based layouts and route guards
- Patient registration and search
- Appointment creation and queue/token management
- Consultation, prescription, and medical certificate flows
- Payment records, audit logs, and receipt PDF endpoint
- Finance summaries and cash closing model support
- Medicine stock, stock adjustments, and alert generation
- WhatsApp link generation
- Reports and analytics routes

## Notes

This project is scaffolded for local development and internship-grade demonstration. Some screens use functional placeholders with the backend API already in place so the system can be expanded incrementally without reworking the architecture.
