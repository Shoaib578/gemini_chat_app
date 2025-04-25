# 🔒 Gemini Chat - Secure AI Assistant

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

![Google Gemini](https://img.shields.io/badge/google_gemini-%234285F4.svg?style=for-the-badge&logo=google&logoColor=white)

A secure mobile chat application that interacts with Google's Gemini AI, featuring HMAC-signed API communication for enhanced security.
## ✨ Key Features

- 💬 Real-time chat with Google Gemini AI - Powered by Google's latest AI model
- 🔒 Secure API communication with  HMAC-SHA256 signed requests
- 📱 Cross-platform mobile app (iOS & Android)
- 📋 Code block detection and copy functionality
- 🎨 Clean, modern UI with responsive design

## Tech Stack

### Frontend (Mobile)
| Technology | Purpose |
|------------|---------|
| Expo (React Native) | Cross-platform app framework |
| @noble/hashes | Cryptographic HMAC implementation |
| Expo Clipboard | Copy text to clipboard |

### Backend (API)
| Technology | Purpose |
|------------|---------|
| Node.js + Express | API server |
| @google/genai | Gemini AI integration |
| crypto (Node) | HMAC signature verification |


## 🔐 Security Implementation

```mermaid
sequenceDiagram
    participant Client as Mobile App
    participant Server as API Server
    participant AI as Gemini AI
    
    Client->>Server: POST /api/gemini/answer
    Note right of Client: Signs payload with HMAC-SHA256
    Server->>Server: Verify HMAC signature
    alt Invalid Signature
        Server->>Client: 401 Unauthorized
    else Valid Signature
        Server->>AI: Forward question
        AI->>Server: Return response
        Server->>Client: Return AI answer
    end
````

# 📁 Project Structure
````gemini-chat-app/
├── backend/
│   ├── index.js            # Express server setup
│   ├── routes/
│   │   └── gemini.routes.js # AI endpoint with HMAC middleware
│   └── middlewares/
│       └── verifySignature.js # HMAC validation
└── frontend/
    ├── App.js              # Main application component
    ├── services/
    │   └── api.js         # API service with signing
    ├── utils/
    │   └── signData.js    # HMAC signing utility
    └── styles/            # Component styling
````

## Installation

### Prerequisites
- Node.js (v18+ recommended)
- Expo CLI (`npm install -g expo-cli`)
- Google Gemini API key
- Yarn or npm

### Backend Setup
1. Clone the repository
   ```bash
   git clone https://github.com/Shoaib578/gemini_chat_app.git
   cd gemini-chat-app/backend 
   ````
2.Install dependencies
 ```bash
npm install
````

3.Create a .env file with:
```
PORT=80
GEMINI_API_KEY=your_gemini_api_key
APP_SECRET=your_hmac_secret_key
````

4.Start the server
```bash
npm start
````

### Frontend Setup

1.Navigate to the frontend directory
```bash
cd ../frontend
````

2.Install dependencies
```bash
npm install
````

3.Create a .env file with:
```
EXPO_SECRET_KEY=your_hmac_secret_key
BASE_URL=http://your-backend-url:3000
````

4.Start the Expo app
```bash
expo start
````
