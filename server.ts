import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Set up large payload limits for PDF uploads
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ limit: "15mb", extended: true }));

// Shared lazy-loaded Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not configured. Please set your Gemini API secret in AI Studio Settings.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. API - Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// 2. API - Parse Account Statement PDF using Gemini 3.5 Flash
app.post("/api/parse-pdf", async (req, res) => {
  try {
    const { fileData, fileName } = req.body;
    if (!fileData) {
      return res.status(400).json({ error: "Missing fileData (Base64 PDF string)." });
    }

    // Step 1: Ensure Gemini API Key is configured
    let ai;
    try {
      ai = getGeminiClient();
    } catch (err: any) {
      console.error("Gemini initialization failed:", err.message);
      return res.status(412).json({
        error: "credentials_missing",
        message: err.message || "Gemini API key is missing. Please add it to your environment secrets in the AI Studio panel."
      });
    }

    // Step 2: Formulate prompt and PDF Part
    const base64Clean = fileData.replace(/^data:application\/pdf;base64,/, "");
    const pdfPart = {
      inlineData: {
        mimeType: "application/pdf",
        data: base64Clean,
      },
    };

    console.log(`Sending statement PDF "${fileName || "uploaded_document"}" to Gemini for parsing...`);

    const prompt = `You are an expert student financial statement parser and senior university accountant.
Your goal is to parse this student statement of accounts from Lovely Professional University (LPU / LFTS or any other format). Analyze every element of the file with high precision and extract the verified financial metrics.

Follow these strict parsing, classification, and rephrasing guidelines:
1. STUDENT IDENTITY:
   - Name: Correctly identify the student's name (e.g. "Dhembre Prathamesh Sandeep").
   - ID: Extracted Student ID (e.g. "12317429").
   - Programme: e.g. "B.Tech. (Computer Science and Engineering)".
   - Primary numbers: Extract the overall stated balance, academic/tuition balance, and residential stay balance.
2. LEDGER ALIGNMENT (TRANSACTIONS LIST):
   - Capture every transactional row across pages 1, 2, 3, 4 without omission.
   - For each line item: date (DD-MM-YYYY format), vNo (voucher or transaction reference number), raw details, debit change, credit change, and calculated running balance.
   - Map each line item to the exact academic term number (e.g. "Term 1", "Term 2", "Term 3", "Term 4", "Term 5", "Term 6", "Term 7").
   - Categorize "feeCategory" strictly into one of: "Tuition Fee", "Residential Charges", "Exam Fee", "Scholarship", "Payment", "Refund", "Fine/Late Fee", "Adjustment", "Opening Balance", "Other".
3. STRICT MATHEMATICAL VALIDATION:
   - Ensure the total debits minus total credits equals the pending outstanding balance on the ledger.
   - Cross-check that term-specific aggregations (semesterAnalytics) match the sum of itemized debits and credits listed under those terms.
4. SIMPLIFICATION FOR PARENTS (REPHRASING RULE):
   - All AI insights MUST be written in very simple, easy-to-understand everyday terms that ordinary parents can read comfortably.
   - Do NOT use high-level, scary financial or corporate words like "gross dues", "cumulative tariffs", "ledger-stated debits", "concessions", etc.
   - Rephrase them as:
     - Scholarship & grants -> "Discounts saved" or "Scholarship help"
     - Outstanding dues -> "Pending to pay"
     - Rent/tariffs -> "Hostel room & meals cost"
     - Cumulative -> "Total bills so far"
   - Under 'insights', write 3 to 5 clear notes with practical, supportive advice (e.g., reminding them about upcoming Terms, explaining how much was saved from scholarship points, and noting that payments were successfully processed).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [pdfPart, prompt],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            student: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                studentId: { type: Type.STRING },
                programme: { type: Type.STRING },
                admissionSession: { type: Type.STRING },
                studentStatus: { type: Type.STRING },
                faculty: { type: Type.STRING },
                overallBalance: { type: Type.NUMBER },
                academicBalance: { type: Type.NUMBER },
                residentialBalance: { type: Type.NUMBER },
              },
              required: ["name", "studentId", "programme", "overallBalance"]
            },
            summary: {
              type: Type.OBJECT,
              properties: {
                totalDue: { type: Type.NUMBER },
                totalPaid: { type: Type.NUMBER },
                totalScholarship: { type: Type.NUMBER },
                totalHostel: { type: Type.NUMBER },
                totalExam: { type: Type.NUMBER },
                pendingBalance: { type: Type.NUMBER },
              },
              required: ["totalDue", "totalPaid", "totalScholarship", "pendingBalance"]
            },
            transactions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  date: { type: Type.STRING },
                  vNo: { type: Type.STRING },
                  narration: { type: Type.STRING },
                  debit: { type: Type.NUMBER },
                  credit: { type: Type.NUMBER },
                  balance: { type: Type.NUMBER },
                  balanceType: { type: Type.STRING },
                  feeCategory: { type: Type.STRING },
                  transactionType: { type: Type.STRING },
                  academicYear: { type: Type.STRING },
                  termNumber: { type: Type.STRING }
                },
                required: ["date", "vNo", "narration", "debit", "credit", "balance", "feeCategory", "transactionType", "academicYear", "termNumber"]
              }
            },
            semesterAnalytics: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  term: { type: Type.STRING },
                  academicYear: { type: Type.STRING },
                  totalDue: { type: Type.NUMBER },
                  totalPaid: { type: Type.NUMBER },
                  totalScholarship: { type: Type.NUMBER }
                },
                required: ["term", "academicYear", "totalDue", "totalPaid", "totalScholarship"]
              }
            },
            scholarships: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  amount: { type: Type.NUMBER },
                  term: { type: Type.STRING },
                  date: { type: Type.STRING }
                },
                required: ["name", "amount", "term", "date"]
              }
            },
            insights: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING },
                  category: { type: Type.STRING },
                  message: { type: Type.STRING }
                },
                required: ["type", "category", "message"]
              }
            }
          },
          required: ["student", "summary", "transactions", "semesterAnalytics", "scholarships", "insights"]
        }
      }
    });

    const parsedText = response.text;
    if (!parsedText) {
      throw new Error("No response body received from Gemini parser.");
    }

    const structuredData = JSON.parse(parsedText);
    res.json({ success: true, data: structuredData });

  } catch (error: any) {
    console.error("PDF Parsing Server Error:", error);
    res.status(500).json({
      success: false,
      error: "parsing_failed",
      message: error.message || "An error occurred while compiling the PDF financial ledger using AI."
    });
  }
});

// 3. Integrate SPA/Vite Setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development configuration
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production configuration
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is booted at http://localhost:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer();
