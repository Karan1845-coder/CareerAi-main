CareerAI — AI-Powered Career Development Platform
CareerAI is a full-stack career assistance platform that helps users prepare for job applications with AI-assisted resume creation, tailored cover letters, interview practice, and industry insights.
Features
- AI Resume Builder — Create and edit a resume, save its content, and export it as a PDF.
- AI Cover Letter Generator — Generate a role- and company-focused cover letter using job details and profile context.
- Industry Insights Dashboard — View industry growth estimates, demand level, market outlook, salary ranges, key trends, and recommended skills.
- Interview Preparation — Generate multiple-choice practice questions, review results, and save assessment history.
- Authentication and onboarding — Sign in with Clerk and complete a career profile before using personalized features.
- Persistent storage — Store profile information, resumes, cover letters, industry insights, and assessment results in PostgreSQL.
- Scheduled insight updates — An Inngest function is configured to refresh industry insights on a weekly schedule.
- Responsive interface — Built with reusable React components, Tailwind CSS, and Radix/shadcn-style UI components.
AI-generated salary and industry insights are estimates and should not be treated as verified live market data unless independently checked against reliable sources.

Tech Stack
Area	Technology
Framework and routing	Next.js App Router and Server Actions
UI	React, Tailwind CSS, Radix UI components, Lucide icons
Authentication	Clerk
Database	PostgreSQL (for example, Neon)
ORM	Prisma
Generative AI	Google Gemini API (@google/generative-ai)
Background jobs	Inngest
Forms and validation	React Hook Form, Zod, @hookform/resolvers
Charts	Recharts
Resume export	html2pdf.js
Hosting	Vercel-compatible Next.js deployment


Project Structure
Career-Ai-main/
├── app/
│   ├── (main)/                 # Main application routes
│   │   ├── dashboard/          # Industry insights dashboard
│   │   ├── resume/              # Resume builder
│   │   ├── ai-cover-letter/     # Cover letter pages
│   │   ├── interview/           # Interview preparation
│   │   └── onboarding/          # Profile onboarding
│   ├── api/inngest/             # Inngest HTTP integration route
│   ├── layout.js                # Root layout
│   └── page.js                  # Home page
├── actions/                     # Server-side application logic
│   ├── dashboard.js             # Industry insights
│   ├── user.js                  # User/profile operations
│   ├── resume.js                # Resume operations
│   ├── cover-letter.js          # Cover letter operations
│   └── interview.js              # Quiz and assessment operations
├── components/                  # Shared UI components
├── hooks/                       # Reusable React hooks
├── lib/                          # Prisma, Clerk/user helpers, Inngest setup
│   └── inngest/
├── prisma/
│   └── schema.prisma             # PostgreSQL models and relationships
├── public/                       # Static assets
├── .env                          # Local secrets (do not commit)
└── package.json
Folder names may differ slightly depending on the current working copy. The installed project version reported during development is Next.js 16.2.3.
Prerequisites
- Node.js compatible with the installed Next.js version
- npm
- A PostgreSQL database (Neon or another PostgreSQL provider)
- A Clerk application
- A Google Gemini API key
- An Inngest account if you want to run the scheduled/background functions
Getting Started
1. Clone the repository
git clone <YOUR_REPOSITORY_URL>
cd Career-Ai-main
Replace <YOUR_REPOSITORY_URL> with the URL of your Git repository.
2. Install dependencies
npm install
The project runs prisma generate in its postinstall script. If needed, you can run it manually as well.
3. Configure environment variables
Create a .env file in the project root. Add the variables required by the services you have configured:
DATABASE_URL="your_postgresql_connection_string"
GEMINI_API_KEY="your_gemini_api_key"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
INNGEST_EVENT_KEY="your_inngest_event_key"
Depending on your Inngest setup, you may also need its signing key or other environment variables. Check the current Inngest configuration and deployment instructions for the exact names required by your environment.
Security: Never commit .env or expose secret keys in client-side code. Add .env to .gitignore, and configure production variables in your hosting provider's environment settings. Only variables intentionally prefixed with NEXT_PUBLIC_ should be exposed to the browser.
4. Generate Prisma Client and prepare the database
npx prisma generate
npx prisma db push
db push synchronizes the Prisma schema with the database. For production or team workflows, prefer reviewed Prisma migrations where appropriate. Make sure DATABASE_URL points to the intended database before running either command.
5. Run the development server
npm run dev
Open http://localhost:3000.
6. Verify a production build
npm run build
npm run start
The build command creates an optimized Next.js build. The start command serves that build locally.
Available Scripts
Command	Purpose
npm run dev	Start the Next.js development server with Turbopack
npm run build	Create an optimized production build
npm run start	Run the production build locally
npm run lint	Run the configured lint script; check compatibility with the installed Next.js version if it fails
npx prisma generate	Generate Prisma Client
npx prisma db push	Synchronize the Prisma schema with the configured database
npx inngest-cli@latest dev	Run the local Inngest development server, if the CLI is available and configured


How the Application Works
1. A user signs in through Clerk and completes onboarding.
2. The application associates the Clerk identity with a user record in PostgreSQL.
3. Next.js pages and Server Actions perform server-side checks and call application logic.
4. Prisma reads and writes the relevant PostgreSQL records.
5. For AI features, server-side code sends a prompt to Gemini and processes its response.
6. Generated content is validated where implemented, then saved or returned to the UI.
7. React components display the results; the resume builder can export its content as a PDF.
8. Inngest provides a scheduled function intended to refresh stored industry insights weekly. This requires the Inngest endpoint and environment to be configured and tested.
Database Models
The Prisma schema defines these primary models:
- User — Clerk user ID, email, profile, industry, and relationships to feature data.
- IndustryInsight — Industry-level salary ranges, growth estimate, demand level, skills, trends, and update timestamps.
- Resume — Resume content, source form data, and optional ATS-related fields.
- CoverLetter — Generated letter, company, job title, job description, and status.
- Assessment — Interview quiz score, questions/answers, category, and improvement tip.
Industry insights are associated with the industry, so users in the same industry can share the same stored insight record. A user's resume is modeled as one record per user, while cover letters and assessments can have multiple records.
Deployment on Vercel
1. Push the project to a Git provider supported by Vercel.
2. Import the repository into Vercel and select the detected Next.js framework.
3. Add the production environment variables in Project Settings → Environment Variables.
4. Ensure the production PostgreSQL database is reachable and the Prisma schema is applied.
5. Deploy and test authentication, onboarding, AI generation, database persistence, PDF export, and interview assessments.
6. Configure and verify Inngest separately if scheduled insight updates are required.
A successful local build confirms that the application compiles; it does not by itself verify production credentials, database connectivity, AI API access, or scheduled jobs.
Troubleshooting
- Database connection or authentication errors: Check DATABASE_URL, database credentials, network access, and whether the target database is correct.
- Clerk sign-in problems: Confirm the publishable and secret keys belong to the correct Clerk instance and configure production domains/URLs.
- Gemini errors: Verify GEMINI_API_KEY, model availability, API quota, response format, and server logs.
- Empty Industry Insights: Check whether the database already contains an incomplete insight record; record existence does not guarantee complete data.
- Resume export errors such as self is not defined: Ensure browser-only PDF libraries are not evaluated during server rendering.
- Hydration mismatch warnings: Compare server-rendered and client-rendered markup, especially around dropdowns, theme-dependent UI, scripts, and browser extensions.
- Inngest jobs not running: Verify the /api/inngest route, deployed function registration, environment variables, and Inngest configuration.
Testing Checklist
Before release, test at least the following:
- Signed-out access to protected features
- Onboarding validation and persistence
- Successful and failed Gemini requests
- Missing, malformed, or incomplete AI output
- Industry insight creation and retrieval
- Resume save, reload, edit, and PDF export
- Cover letter generation and persistence
- Correct and incorrect interview answers and score calculation
- User ownership checks for resumes, letters, and assessments
- Production environment variables and database connectivity
- Scheduled Inngest function execution
Security Notes
- Keep all server secrets out of source control and browser bundles.
- Authenticate and authorize every sensitive server-side operation.
- Validate user inputs and AI responses before saving or rendering them.
- Apply rate limits and usage controls to expensive AI operations where appropriate.
- Treat AI output as untrusted content and render it safely.
- Avoid logging API keys, access tokens, or private user content.
License
Add the license that applies to your project before distributing it. If this repository is based on another project, preserve and follow the original project's license and attribution requirements.
