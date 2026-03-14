# LedgerX — India's Smartest CA Platform

LedgerX is a premium, AI-powered marketplace connecting clients with Chartered Accountants (CAs) in India. It features high-speed AI tax assistance, real-time messaging, document intelligence via OCR and Groq Llama-3, and a smart CA matching system.

## 🚀 Key Features

- **TaxBot AI**: High-speed, real-time tax assistance powered by **Groq Llama-3.1-8b**, specialized in Indian tax laws.
- **Smart Marketplace**: Connect with verified CAs ranked by an AI scoring system (Specialization, Experience, Rating, Price).
- **Document Intelligence**: Instant OCR extraction and **Groq-driven** analysis for document categorization and error detection.
- **Fraud Risk Assessment**: Real-time risk scoring for uploaded documents using Llama-3 anomaly detection.
- **Unified Messaging**: Integrated communication system allowing Clients and CAs to chat instantly without database indexing delays.
- **Secure Storage**: Firebase-backed document management and real-time database sync.

## 🛠️ Tech Stack

- **Frontend**: Premium Vanilla UI (HTML5, CSS3 Glassmorphism, JavaScript ES6+).
- **Backend**: Firebase (Authentication, Firestore, Cloud Storage).
- **AI Engine**: 
  - **Groq AI (Llama-3)**: High-speed LLM for chat and analysis.
  - **OCR.space**: Advanced document text extraction.
- **State Management**: Real-time Firestore sync and session persistence.

## 📦 Setup & Deployment

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sahillll31/LedgerX.git
   cd LedgerX
   ```

2. **Firebase Configuration**:
   - Update the `firebaseConfig` object in `doct.html` with your project's credentials from the [Firebase Console](https://console.firebase.google.com/).

3. **AI Configuration**:
   - Obtain a free API key from the [Groq Console](https://console.groq.com/keys).
   - Paste your key into `doct.html`:
     ```javascript
     const GROQ_API_KEY = "YOUR_GROQ_KEY_HERE";
     ```

4. **Running Locally**:
   Simply open `doct.html` in any modern web browser or use a live server extension.

## 📜 Repository Guidelines

- **API Security**: Never commit your live `GROQ_API_KEY` to the repository. Use the provided placeholder system.
- **Deployment**: The project is optimized for direct browser access and Firebase Hosting.

---
Built for the future of Indian FinTech by Sahil.
