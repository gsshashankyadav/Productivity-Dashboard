🌸 Productivity Dashboard
A clean and minimal productivity dashboard built with Next.js and Tailwind CSS. This app helps you manage your daily tasks, set up your daily planner, and customize default task templates — all stored locally in your browser.

✨ Features
📅 Daily Planner – Create, edit, and organize tasks for any selected date.

🕘 Real-Time Clock – Displays the current date and time.

📋 Default Tasks – Set default task templates for easy copying into your planner.

📊 Task Completion Chart – Visualize your weekly productivity using Chart.js.

🧠 LocalStorage Powered – Your tasks stay saved without any backend.

🌙 Responsive Design – Mobile-friendly layout using Tailwind CSS.

🛠 Tech Stack
Next.js (React framework)

Tailwind CSS (Utility-first CSS)

Chart.js (For charts and visualizations)

LocalStorage (Persistent browser storage)

HTML5 / CSS3 / JavaScript (ES6+)

📂 Project Structure
pgsql
Copy
Edit
productivity-dashboard/
├── public/
│   └── assets/            # images, icons (if any)
├── src/
│   ├── components/        # React components (Header, Planner, TaskList, Chart, etc.)
│   ├── pages/
│   │   ├── _app.js        # App wrapper
│   │   └── index.js       # Main dashboard page
│   └── styles/
│       └── globals.css    # Tailwind and custom CSS
├── .gitignore
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── README.md
🚀 Getting Started
1️⃣ Clone the repository:
bash
Copy
Edit
git clone https://github.com/yourusername/productivity-dashboard.git
cd productivity-dashboard
2️⃣ Install dependencies:
bash
Copy
Edit
npm install
3️⃣ Run the development server:
bash
Copy
Edit
npm run dev
Visit http://localhost:3000 to view your dashboard.

📖 How It Works
📋 Tasks & Default Templates: Stored in localStorage by date (e.g., planner_2025-05-25).

📝 Add, Edit, and Delete Tasks: Directly from your daily planner interface.

📊 Task Completion Chart: Uses Chart.js to display demo data (can be extended for actual stats).

⚙️ Default Tasks Modal: Lets you set template tasks to quickly insert into your planner.

📅 Real-Time Clock: Auto-updating time and date at the top of the dashboard.

📌 Possible Improvements
🌘 Add a dark mode toggle

📈 Replace random chart data with real task completion stats

🔄 Sync with external services (Google Calendar, Notion API, etc.)

📱 Build a PWA (Progressive Web App) version

☁️ Connect a lightweight backend (Supabase, Firebase, or MongoDB)

📸 Preview

📄 License
This project is open source under the MIT License.

👩‍💻 Author
Your Name
Portfolio ・ GitHub ・ LinkedIn
