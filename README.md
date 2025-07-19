# AI Expense Manager

A fun and smart expense-tracking web app built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **OpenAI**. Enter expenses naturally and get AI-powered insights!

---

## ⌚ Current Status
**Work In Progress 🏗️**

---

## 🚀 Live Demo

[▶ See it live](https://ai-expense-manager-five.vercel.app/)

---

## Features

- **Natural language input** — log expenses like “Coffee ₹150 yesterday”  
- **AI-powered parsing** — extracts date, amount, category, description  
- **Smart categorization** — automated grouping by tags like Food, Travel, Bills  
- **Overview dashboard** — shows recent expenses & category breakdown  
- **Monthly summary** — quick glance at spending trends  
- **Responsive design** — works across mobile and desktop

---

## 🛠️ Tech Stack

- **Next.js** (App Router + Server Actions)  
- **TypeScript** for type safety  
- **Tailwind CSS** for UI styling  
- **OpenAI API** for natural language processing  
- **Prisma + SQLite** for lightweight local DB  
- **Custom React hooks** and GraphQL (if applicable)

---

## 🧑‍💻 Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/abhay-pansuriya-7/ai-expense-manager.git
   cd ai-expense-manager
Install dependencies

bash
Copy
Edit
npm install
# or yarn / pnpm install
Set environment variables (.env.local):

env
Copy
Edit
OPENAI_API_KEY=your_openai_key
DATABASE_URL=file:./dev.db
Run the development server

bash
Copy
Edit
npm run dev
Visit http://localhost:3000 and start tracking expenses!

🔧 Usage
Enter expenses in plain language into the input box.

Hit Submit, and AI will parse and categorize the transaction.

View your dashboard for recent entries and spending summary.

Navigate monthly spending via summary charts (if implemented).

📦 Project Structure
bash
Copy
Edit
/app              # Next.js pages & server components
/components       # Reusable UI components
/graphql          # GraphQL types & resolvers (if used)
/hooks            # Custom React hooks
/lib              # Utility functions (e.g. AI parser)
/prisma           # Prisma schema & migration files
/public           # Static assets
🧪 Testing & Formatting
Linting: npm run lint

Formatting: npm run format (if Prettier is set up)

Type checks: npm run type-check

Add tests with Jest or React Testing Library in future updates!

⚙️ Production & Deployment
Deploy on Vercel, Netlify, Heroku, etc.

Setup environment variables in your deployment platform.

For production DB, consider switching to PostgreSQL or MySQL.

🤝 Contributing
Contributions are welcome! To get started:

Fork this repo

Create a new branch: git checkout -b feature/awesome-stuff

Commit your changes

Push your branch and open a pull request

📝 License & Contact
MIT License © 2025 Abhay Pansuriya
For questions or feedback, feel free to contact me via GitHub issues or email.

🔮 What’s Next?
Feature	Status
Recurring expenses	☐ Planned
Charts & visualizations	☐ Planned
Export to CSV/Excel	☐ Planned
OAuth login	☐ Planned

Thanks for checking out AI Expense Manager! Let me know if you’d like help adding production features like auth, deployment scripts, additional insights, or advanced charts 😊

yaml
Copy
Edit

---

### ✅ Usage Tips

- You can copy-paste this into your repo’s `README.md`.
- Adjust feature list or roadmap as needed.
- Add badges (e.g., Vercel deploy, license, version) to the top for polish.

Let me know if you want help crafting code comments, CI/CD setup, or polishing it further!
::contentReference[oaicite:0]{index=0}
