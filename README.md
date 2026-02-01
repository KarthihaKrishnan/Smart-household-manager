# 🏠 Smart Household Manager
A modular full-stack web application evolving from a grocery tracker into a smart household manager.

**Author:** Karthiha Krishnan  
**Role:** Aspiring Full-Stack Developer  
📍 Queensland, Australia  

![Smart Grocery Tracker UI](docs/ui-v1.4.png)

---

## 🚀 Live Demo
🔗 (https://karthihakrishnan.github.io/Smart-household-manager/) (In Progress)

---

## 📌 Project Overview
Smart Household Manager is a real-world, learning-driven full-stack web application.

It began as a **Smart Grocery Tracker** and is currently evolving into a React-based household dashboard that brings multiple daily-life features into a single Home view.

Planned expansions include household tasks, bills, maintenance reminders, and inventory tracking.

---

## 💡 Why I Built This Project
I started this project to strengthen my frontend fundamentals using **HTML, CSS, and JavaScript**.

As the project grew, I realised that real-world applications require:
- Persistent data across devices
- Clear separation of item states
- A reliable backend source of truth
- Support for real-world workflows (e.g., barcode scanning)

Instead of stopping at a simple demo, I chose to evolve this into a long-term full-stack learning project that mirrors how real products grow over time.

---

## 🏡 Home Dashboard (React)
- React + Vite frontend
- Component-based Home layout
- Top navigation tabs (Home, Calendar, Tasks, Recipes, Meal Plan, Shopping List)
- Family Header section (UI-focused)
- **Tasks card fully connected to backend**
- Clean separation between UI components and API logic.
---

## 🛒 Grocery Tracker – Current Capabilities
- Add grocery items
- Fetch grocery items via backend REST API
- Separate **pending** and **purchased** items
- Mark items as purchased
- Clean, minimal UI
- Full CRUD operations backed by PostgreSQL
- Data persists across refreshes and server restarts
- Frontend communicates exclusively via REST APIs
Earlier versions used **LocalStorage** for persistence.
Current development focuses on an API-driven architecture backed by **PostgreSQL**.

### Backend Implementation (Grocery)
- Node.js + Express REST API
- PostgreSQL integration
- Full CRUD operations:
  - Create grocery items
  - Fetch all items
  - Update item status (pending / purchased)
  - Delete items
- API-driven frontend (no LocalStorage dependency)
This milestone completed the transition from a frontend-only prototype to a true full-stack application.

---

## 🧠 Backend Status 

The Smart Grocery Tracker is now fully backed by a PostgreSQL database.

## ✅ Tasks Module – Full-Stack (Completed)

The **Tasks** feature is now fully implemented using a backend-driven architecture.

### Capabilities
- Fetch tasks from PostgreSQL database
- Add new tasks via REST API
- Toggle task completion status (completed / pending)
- Delete tasks
- UI updates instantly with backend as source of truth
- Data persists across refreshes and server restarts

### Technical Highlights
- React state managed using `useState` and `useEffect`
- Backend implemented with Express controllers and routes
- PostgreSQL used for persistent storage
- RESTful API communication (GET, POST, PATCH, DELETE)
- No LocalStorage dependency

This module represents my **first end-to-end full-stack feature built entirely without tutorials.**

## 🧭 How This Project Evolved
**Phase 1 — Frontend Foundation**
- HTML & CSS layout
- JavaScript DOM manipulation and event handling
- UI state changes (pending vs purchased)

**Phase 2 — Data Persistence**
- Data-driven rendering
- Initial LocalStorage persistence
- Preparation for backend migration

**Phase 3 — Full-Stack Transition**
- Express API introduction
- PostgreSQL database integration
- API-only frontend communication

**Phase 4 — React Migration (Current)**
- Rebuilding frontend using React
- Component-based architecture
- Incremental migration of features

---

## 🎨 User Interface 
The UI is intentionally clean and distraction-free, focusing on readability, spacing, and usability rather than decoration.

---

## ⚠️ Current Limitations
- Authentication is not yet implemented.
- Data is not user-specific.
- No multi-device sync (planned with auth)
- Some modules are still UI-only (Events, Meal Plan)

These limitations are intentional and help demonstrate why backend systems are required in real applications.

---

## 🛠️ Roadmap
- ✅ Express backend setup
- ✅ Grocery APIs (GET, POST, PATCH, DELETE)
- ✅ PostgreSQL persistence
- ✅ Tasks module (Full CRUD with PostgreSQL)
- ⏳ Barcode scanning support
- ⏳ Shopping List CRUD (React + PostgreSQL)
- ⏳ Mobile & accessibility improvements
- ⏳ React Home dashboard completion
- ⏳ Upcoming Events card UI
- ⏳ Backend-connected Home dashboard (remaining modules)

---

## 📚 What I’m Learning From This Project
- Frontend fundamentals & component design
- UI state management and rendering logic
- Backend API design
- Database-driven persistence
- Product-oriented development
- Incremental system evolution

---

## 🎯 Why I Chose This Approach
Instead of building many small demo projects, I chose to:
- Build one meaningful application
- Improve it step by step
- Learn each layer only when it becomes necessary

This mirrors how real software products evolve in professional environments.

---

## 🧑‍💻 Technologies Used

**Frontend**
- React (Vite)
- HTML, CSS, JavaScript
**Backend**
- Node.js + Express 
- PostgreSQL 
- REST APIs

## 🧩 Planned & Evolving Backend Design 
To support data persistence, multi-device access, and future scalability, this project is designed with a backend-first data model.

### Database Schema (Planned – PostgreSQL)
**users**
- id (UUID, primary key)
- name
- email (unique)
- created_at
- updated_at

**grocery_items**
- id (UUID, primary key)
- user_id (foreign key -> users.id)
- item_name
- status (pending/purchased)
- created_at
- updated_at

### Design considerations
- Each grocery item belongs to a specific user
- Item state is explicitly stored using a status field
- UUIDs are used for safer frontend-backend communication
- Timestamps support auditing, sorting, and sync logic
- Schema is designed to support future features such as authentication, multi-device sync, and shared lists.

---

## 🔌REST API Endpoints

### Grocery Items
- GET /api/grocery_items
Fetch all grocery items 

- POST /api/grocery_items
Add a new grocery item

- PATCH /api/grocery_items/:id
Update grocery item status (pending / purchased)

- DELETE /api/grocery_items/:id
Remove a grocery item

### Tasks
- GET /api/tasks  
  Fetch all tasks

- POST /api/tasks  
  Create a new task

- PATCH /api/tasks/:id  
  Toggle task completion

- DELETE /api/tasks/:id  
  Delete a task

---

## 🚧 Project Status
🟡 Actively In Progress
Tasks module completed; remaining modules under development.

---

## 🧭 Project Structure
```txt
smart-household-manager/
├── client/    # Legacy Frontend
├── server/    # Backend (Express API in progress)
├── docs/      # Screenshots & diagrams
├── web/       # React Frontend
└── README.md

 

