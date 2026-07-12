# 🚀 AI-Powered CSV Importer

> An intelligent AI-powered CSV Importer built for the **GrowEasy Software Developer Assignment**.
>
> Upload any valid CSV file, preview its contents, and let AI automatically map different column names and structures into the GrowEasy CRM format.

---

## 📌 Assignment Information

**Company:** GrowEasy  
**Position Applied:** Software Developer Intern  
**Assignment:** AI-Powered CSV Importer

---

# ✨ Features

✅ Upload CSV using Drag & Drop or File Picker

✅ Parse CSV locally for preview

✅ Beautiful responsive preview table

✅ Sticky table headers

✅ Horizontal & Vertical scrolling

✅ AI-powered CRM field extraction

✅ Intelligent column mapping

✅ Batch processing for AI requests

✅ Skip invalid records automatically

✅ Loading & Progress Indicators

✅ Responsive Design

✅ Error Handling

---

# 🛠 Tech Stack

## Frontend

- Next.js
- JavaScript
- Tailwind CSS
- shadcn/ui
- Papa Parse
- TanStack Table
- Axios
- React Dropzone

## Backend

- Node.js
- Express.js
- Multer
- Papa Parse
- Google Gemini API
- Zod
- dotenv

---

# 📂 Project Structure

```
AI-CSV-Importer/
│
├── frontend/
│   │
│   ├── app/
│   ├── components/
│   ├── services/
│   ├── utils/
│   ├── public/
│   └── package.json
│
├── backend/
│   │
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── prompts/
│   ├── validators/
│   ├── utils/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/AI-CSV-Importer.git

cd AI-CSV-Importer
```

---

## 2. Install Frontend

```bash
cd frontend

npm install
```

---

## 3. Install Backend

```bash
cd ../backend

npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```
PORT=5000

GEMINI_API_KEY=YOUR_GEMINI_API_KEY
GEMINI_MODEL=MODEL_NAME
```

---

# ▶️ Run Frontend

```bash
cd frontend

npm run dev
```

Runs on

```
http://localhost:3000
```

---

# ▶️ Run Backend

```bash
cd backend

npm run dev
```

Runs on

```
http://localhost:5000
```

---

# 🧠 How It Works

```
User Uploads CSV
        │
        ▼
Frontend Parses CSV
        │
        ▼
Preview Displayed
        │
        ▼
User Confirms Import
        │
        ▼
CSV Sent to Backend
        │
        ▼
Backend Parses CSV
        │
        ▼
Records Split into Batches
        │
        ▼
Gemini AI Extraction
        │
        ▼
CRM Validation
        │
        ▼
JSON Response
        │
        ▼
Frontend Displays Results
```

---

# 🤖 AI Processing Pipeline

The application does **not rely on fixed CSV columns**.

Instead, the uploaded CSV records are sent to **Google Gemini AI**, which intelligently identifies and maps fields into the GrowEasy CRM format.

Examples supported:

- Facebook Lead Export
- Google Ads Export
- Excel Sheets
- CRM Exports
- Marketing CSVs
- Sales Reports
- Manually Created CSVs

---

# 📋 CRM Fields Extracted

| Field | Description |
|-------|-------------|
| created_at | Lead creation date |
| name | Lead name |
| email | Primary Email |
| country_code | Country Code |
| mobile_without_country_code | Mobile Number |
| company | Company Name |
| city | City |
| state | State |
| country | Country |
| lead_owner | Lead Owner |
| crm_status | Lead Status |
| crm_note | Additional Notes |
| data_source | Data Source |
| possession_time | Property Possession |
| description | Description |

---

# 🛡 Validation Rules

The application automatically:

- Skips records without Email and Mobile
- Keeps only valid CRM Status values
- Keeps only allowed Data Source values
- Moves extra emails to CRM Notes
- Moves extra phone numbers to CRM Notes
- Ensures date format is JavaScript compatible

---

# 📊 Batch Processing

Instead of sending thousands of records at once, the backend processes the CSV in smaller batches.

```
CSV

↓

20 Records

↓

Gemini AI

↓

20 Records

↓

Gemini AI

↓

Merged Response
```

This improves:

- Performance
- Reliability
- AI Accuracy
- Token Usage

---

# 🎯 Application Workflow

1. Upload CSV
2. Parse CSV
3. Preview Data
4. Confirm Import
5. Send to Backend
6. AI Extraction
7. CRM Validation
8. Display Results

---

# 🚀 Deployment

## Frontend

Vercel

## Backend

Render

---