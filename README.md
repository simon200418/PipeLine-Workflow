# 🧠 Pipeline Workflow Builder

A full-stack visual pipeline builder built using React Flow (frontend) and FastAPI (backend).

Users can create nodes, connect them into workflows, and validate whether the pipeline forms a Directed Acyclic Graph (DAG).

---

## 🚀 Features

### ✅ Part 1: Node Abstraction
- Created a reusable `BaseNode` abstraction
- All nodes (Input, Text, LLM, Output) extend from BaseNode
- Easy to create new nodes with consistent styling and structure

### ✅ Part 2: Styling
- Modern UI using Tailwind CSS
- Rounded cards with shadow
- Styled handles and buttons
- Clean and minimal design

### ✅ Part 3: Text Node Logic
- Auto-resizing textarea
- Dynamic variable detection using `{{variable}}`
- Automatically creates input handles for detected variables

Example:
Hello {{name}}
Creates a new input handle for `name`.

### ✅ LLM Node
- Mock LLM processing (simulated transformation)
- Demonstrates processing capability in pipeline

### ✅ Part 4: Backend Integration
- Frontend sends `nodes` and `edges` to backend
- Backend calculates:
  - Number of nodes
  - Number of edges
  - Whether the pipeline forms a DAG
- Frontend displays response in a user-friendly alert

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- React Flow
- Tailwind CSS

### Backend
- FastAPI
- Uvicorn
- Python

---

## 📂 Project Structure
Creates a new input handle for `name`.

### ✅ LLM Node
- Mock LLM processing (simulated transformation)
- Demonstrates processing capability in pipeline

### ✅ Part 4: Backend Integration
- Frontend sends `nodes` and `edges` to backend
- Backend calculates:
  - Number of nodes
  - Number of edges
  - Whether the pipeline forms a DAG
- Frontend displays response in a user-friendly alert

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- React Flow
- Tailwind CSS

### Backend
- FastAPI
- Uvicorn
- Python

---

## 📂 Project Structure
Pipeline_Workflow/
│
├── frontend/
│ ├── src/
│ │ ├── nodes/
│ │ ├── components/
│ │ ├── submit.js
│ │ └── ...
│ └── ...
│
└── backend/
├── main.py
├── requirements.txt
└── render.yaml

---

## 🧪 How It Works

1. User creates nodes visually
2. Connects them using edges
3. Clicks **Submit**
4. Frontend sends pipeline to backend
5. Backend:
   - Counts nodes
   - Counts edges
   - Checks DAG using topological sort
6. Result is displayed to the user

---

## 🖥️ Running Locally

### Backend


cd backend
pip install -r requirements.txt
uvicorn main:app --reload

Backend runs on:

http://localhost:8000

Frontend
cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173

🌐 Deployment

Frontend deployed on Vercel
Backend deployed on Render

📌 DAG Validation Logic

The backend uses Kahn’s algorithm (Topological Sort) to determine if the pipeline forms a Directed Acyclic Graph.
If a cycle exists → is_dag: false

🎯 Final Result

Users can:

✔ Create visual pipelines
✔ Dynamically add/remove nodes
✔ Detect variables in text nodes
✔ Validate workflow structure
✔ Get real-time DAG verification
