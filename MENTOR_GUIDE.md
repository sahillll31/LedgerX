# LedgerX — Technical Proof of Work (Mentor Guide)

This document explains the technical "outputs" of the LedgerX platform, specifically how OCR and AI are integrated to automate tax preparation.

## 1. How OCR Reads Files (The Extraction Output)
When a user uploads a document (e.g., a **Form 16** PDF), the system triggers a two-stage extraction process:
- **Phase A (OCR.space API)**: The system sends the file to the OCR engine. It performs "Optical Character Recognition" to turn the image/PDF into raw machine-readable text.
- **Phase B (Claude Vision)**: If the OCR text is complex, the system uses Claude's vision capabilities to identify tables (like Salary components) that traditional OCR might miss.
- **Output**: A raw text string stored in Firestore `documents` collection.

## 2. Document Intelligence (The Analysis Output)
The raw text is then sent to **Claude 3.5 Sonnet**. Historically, a CA would spend 30 minutes reading a Form 16. LedgerX does this in 5 seconds.
- **Claude Analysis**: It identifies:
    - PAN Number
    - Gross Salary
    - Section 80C Deductions
    - Employer GSTIN
    - Tax Paid/Refundable
- **Output**: A structured "Document Analysis" widget visible in the CA Dashboard.

## 3. The "Risk Score" (The Fraud Detection Output)
This is the most advanced output. Claude compares the uploaded documents against common tax fraud patterns.
- **Algorithm**: If a bank statement doesn't match the reported salary in Form 16, Claude flags an anomaly.
- **Output**: A live **Fraud Risk Score (0-100)** which updates in Firestore and displays on the dashboard for the CA to see before they file.

## 4. How Tax Filing Works (The Final Service Output)
LedgerX is a **Human-in-the-loop** AI system.
- **Matching**: AI matches the client with the best CA based on the document type.
- **Communication**: The Client and CA message via the real-time chat.
- **Filing**: The CA uses the AI-prepared data to finalize the return on the Income Tax Portal.
- **Payment**: The client pays the CA via the integrated Razorpay checkout once the work is verified.

---

### Technical Verification for Mentor:
If your mentor wants to "see" it working in the code, show them these lines in `doct.html`:
- **Line 667-698 (`handleFileUpload`)**: This is the heart of the engine. It handles `uploadBytes` (Firebase), `fetch OCR_API_KEY`, and `fetch CLAUDE_FN_URL` for real-time analysis.
- **Line 700-713 (`updateRiskScore`)**: This shows the AI-driven fraud detection logic.
