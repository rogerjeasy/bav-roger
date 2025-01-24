# Portfolio Website - Roger Bavibidila 🚀

## Overview 📋
A portfolio website showcasing my education, experience, projects, and skills in full-stack development, machine learning, and data science.

## Key Features 💡
- 📑 Interactive resume sections (Education, Experience, Projects, Skills)
- 🤖 AI chat integration for visitor interaction
- 🎯 Project showcase with live demos (Let Us Connect, EasyLife, GPTuessr)
- 🌓 Responsive design with dark/light mode
- 📬 Contact form with professional references integration

## Tech Stack ⚡
```
Frontend:
🎨 Next.js, TypeScript, Tailwind CSS
🛠️ shadcn/ui components
🎯 ShadCN UI, NextUI for modern UI components

Backend:
🗄️ PostgreSQL with Prisma
☁️ Neon Database for data storage
🔐 NextAuth.js for authentication

Deployment:
🚀 Vercel
```

## Project Structure 📁
```
src/
├── app/
│   ├── sections/           # Resume sections
│   └── api/               # AI chat, contact endpoints
├── components/
│   ├── ui/               # shadcn components
│   └── sections/         # Resume section components
└── lib/                  # Database, validation, utilities
```

## Setup 🛠️
```bash
npm install
cp .env.example .env
npx prisma db push
npm run dev
```

## Environment Variables 🔒
```
DATABASE_URL=
NEXTAUTH_SECRET=
OPENAI_API_KEY=
NEXTAUTH_URL=
FIREBASE_CONFIG=
```

## Contact 📧
- ✉️ Email: rogerjeasy@gmail.com
- 📍 Location: Zurich, Switzerland
