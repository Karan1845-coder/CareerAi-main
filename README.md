# 🚀 Full Stack AI Project (Career AI) 

[![Watch Demo](https://img.youtube.com/vi/DaQuSSmHa9k/maxresdefault.jpg)](https://www.youtube.com/watch?v=DaQuSSmHa9k)

**Demo Video:** https://www.youtube.com/watch?v=DaQuSSmHa9k

An all-in-one, AI-powered career development platform engineered with Next.js 14. This application provides users with an intelligent resume builder, tailored cover letter generation, interview preparation tools, and real-time industry insights. Wrapped in a stunning, highly optimized glassmorphic Dark Mode UI.

---


---

## ✨ Key Features

- **AI-Powered Resume Builder:** Create professional resumes with an intuitive multi-step form. Need help with bullet points? Use the "Auto-Improve" feature powered by Gemini AI to rewrite basic notes into ATS-optimized, metric-driven achievements. Progress is automatically saved!
- **Cover Letter Generator:** Let the AI do the heavy lifting. Paste a job description and company name, and the platform generates a highly targeted cover letter matching the tone of the job.
- **Industry Insights Dashboard:** A beautiful, responsive dashboard highlighting market trends, active job growth charts, and direct links to active opportunities on LinkedIn.
- **Persistent Data:** Never lose your work. Real-time form states are synchronized and safely stored in PostgreSQL.
- **Premium Glassmorphic UI:** Modern web aesthetics featuring vibrant neon glows, frosted glass cards, and highly reactive hover states.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router & Server Actions)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **Authentication:** [Clerk](https://clerk.com/)
- **Database:** PostgreSQL via [Neon](https://neon.tech/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **AI Integration:** [Google Gemini API](https://ai.google.dev/)
- **Background Jobs:** [Inngest](https://www.inngest.com/)
- **Form Management:** React Hook Form + Zod
- **Deployment:** Vercel

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18+) and npm installed on your machine. You will also need API keys for Clerk, Prisma/PostgreSQL, Google Gemini, and Inngest.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ishita2704/Career-Ai.git
   cd Career-Ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add the following keys:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   DATABASE_URL=your_postgresql_database_url
   GEMINI_API_KEY=your_gemini_api_key
   INNGEST_EVENT_KEY=your_inngest_key
   ```

4. **Initialize the Database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the Development Server:**
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---
*Developed with modern web tooling to help you secure your next big job.*
