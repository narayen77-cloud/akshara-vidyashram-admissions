import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Custom route to serve uploaded image attachments directly or fall back to beautiful Unsplash photos
app.get("/input_file_:id(\\d+).png", (req, res) => {
  const fileId = req.params.id;

  // 1. Check if the file exists inside public/images/ with various standard extensions
  const extensions = [".png", ".jpg", ".jpeg", ".webp", ".svg"];
  for (const ext of extensions) {
    const pubPath = path.join(process.cwd(), "public", "images", `input_file_${fileId}${ext}`);
    if (fs.existsSync(pubPath)) {
      return res.sendFile(pubPath);
    }
  }

  const absPath = path.join("/", `input_file_${fileId}.png`);
  const relPath = path.join(process.cwd(), `input_file_${fileId}.png`);
  
  // 2. If local file exists, serve it immediately (allowing customized user photos in future!)
  if (fs.existsSync(absPath)) {
    return res.sendFile(absPath);
  }
  if (fs.existsSync(relPath)) {
    return res.sendFile(relPath);
  }
  
  // 2. Serve a highly polished vector crest SVG logo for input_file_0.png
  if (fileId === "0") {
    res.setHeader("Content-Type", "image/svg+xml");
    return res.send(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <g transform="translate(10, 2.5)">
    <path d="M10 20 L40 5 L70 20 L70 50 Q70 80 40 95 Q10 80 10 50 Z" fill="#9c1e22" stroke="#d4af37" stroke-width="2.5"/>
    <path d="M15 22 L40 9 L65 22 L65 48 Q65 75 40 89 Q15 75 15 48 Z" fill="#801015"/>
    <polygon points="40,25 43,32 50,32 45,36 47,43 40,39 33,43 35,36 30,32 37,32" fill="#d4af37"/>
    <path d="M25 55 L55 55 M25 62 L55 62 M25 69 L48 69" stroke="#d4af37" stroke-width="2.5" stroke-linecap="round"/>
  </g>
</svg>
    `.trim());
  }
  
  // 3. Serve premium curated high-resolution school campus/activity photos
  const imageFallbackMap: Record<string, string> = {
    "1": "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1200&q=80", // Karate/martial arts
    "2": "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&w=1200&q=80", // Archery Focus
    "3": "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80", // Olympic Swimming Pool
    "4": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80", // Central Courtyard
    "5": "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80", // Two-tier Library bookshelves
    "6": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80", // Library Floor Commons
    "7": "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80", // Forest School Tree Canopies
    "8": "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=1200&q=80", // Silent Reading
    "9": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80", // Sensory Art Painting
    "10": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80", // Soil Planting & Gardening
    "11": "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80", // Paper craft / boats
    "12": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80", // Study session
    "13": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80", // Science laboratories
    "14": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80", // Bamboo corridors
    "15": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80", // Eco Paper Bag Classes
  };
  
  const redirectUrl = imageFallbackMap[fileId];
  if (redirectUrl) {
    return res.redirect(302, redirectUrl);
  }
  
  // High-contrast general fallback
  return res.redirect(302, "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80");
});

// Lazy-initialize Gemini so missing key doesn't crash server boot
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY" && key.trim() !== "") {
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
  }
  return aiClient;
}

// Full School Context to feed into Gemini System Instructions
const SCHOOL_CONTEXT = `
You are the Official AI Admissions Counselor for Akshara Vidyaashram, Cuddalore (established 1993).
Your goal is to answer queries from prospective parents warmly, elegantly, and professionally, guiding them to book a campus tour or submit an enquiry lead.

School details:
- Name: Akshara Vidyaashram, Cuddalore
- Established in: 1993 (trusted legacy of over 30 years)
- Positioning: A premium 25-acre educational sanctuary where freedom meets responsibility, and children grow into confident future-ready leaders.
- Key Philosophy: "Beyond the Syllabus", psychological safety, freedom with responsibility, space to grow academically, physically, and emotionally.
- Grade Options for 2026-27: Pre-KG, LKG, UKG, and Grades 1 to 10 (CBSE Syllabus).
- Infrastructure Highlights (We have real campus photos of all these - do not make up others):
  1. Olympic-Sized Swimming Pool (trained coaches, aquatic coaching).
  2. Archery Range (precision motor skills).
  3. Karate Outdoor Academy (martial arts, self-defense & discipline).
  4. Advanced Science Labs (compound microscopes, chemistry workstation).
  5. Centred Assembly Green Courtyard (palm trees, amphitheatre-like design for open communication).
  6. Two-tier Library and Commons (focused silent reading & collaborative floor study, thousands of books).
  7. Forest Kindergarten (tree canopies eco-discovery learning).
  8. Eco-gardening (horticulture training, organic farming).
  9. Bamboo nature corridors (canopied walking pathways).
  10. Eco-sustainability lessons (making paper bags from newspapers).
- Age requirements: Pre-KG minimum 3 years old by Mar 31 of academic year, LKG minimum 4 years, UKG minimum 5 years, Grade 1 minimum 6 years.
- Transportation: Extensive fleet of private GPS-monitored buses covering Cuddalore municipal limits and adjoining rural pathways (conductors, female helpers included).
- Host / Fee info: Please explain that tuition fees are based on the student's level and are custom and moderate-premium. Parents are highly encouraged to fill out the Admission Enquiry form in this page to receive a personalized fee quote and schedule a slot for assessment.

Rules:
1. Speak in a warm, welcoming, polite tone representing a world-class prestigious academy.
2. Be brief and highly readable (max 2-3 short paragraphs).
3. Do not make up facts or infrastructure that aren't mentioned.
4. Try to sign off by inviting them to use the interactive online form to Book their Slot for a Physical Campus Tour!
`;

// Debug route to find uploaded image files
app.get("/api/debug-files", (req, res) => {
  try {
    const fs = require('fs');
    const path = require('path');
    const results: any = { cwd: process.cwd(), files: {} };
    
    const scanDir = (dir: string, depth = 0) => {
      if (depth > 2) return;
      try {
        const items = fs.readdirSync(dir);
        results.files[dir] = items.filter((f: string) => f.includes('input_file') || f.endsWith('.png') || f.endsWith('.jpg') || f === 'public' || f === 'src');
        for (const item of items) {
          if (item === 'node_modules' || item === '.git' || item === 'dist') continue;
          const full = path.join(dir, item);
          try {
            if (fs.statSync(full).isDirectory()) {
              scanDir(full, depth + 1);
            }
          } catch (e) {}
        }
      } catch (e: any) {
        results.files[dir] = "Error: " + e.message;
      }
    };
    
    scanDir(process.cwd());
    scanDir("/");
    res.json(results);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// AI Counselor API
app.post("/api/admissions/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Fallback response for offline or unconfigured API keys
      const fallbackReplies = [
        "Welcome to Akshara Vidyaashram admissions assistant! I would be delighted to assist you. To schedule a detailed physical campus tour and view our 25-acre sanctuary, swimming pool, and CBSE facilities firsthand, please fill out the 'Schedule Campus Visit' booking form on our portal. Our admissions desk will contact you immediately!",
        "Thank you for contacting Akshara Vidyaashram, Cuddalore! Regarding our admissions for Pre-KG to Grade 10, we focus on nurturing confidence, discipline through karate/archery, and advanced science laboratory projects. We recommend filling out our Admissions Enquiry form to receive a custom callback.",
        "We are pleased to receive your inquiry! Our campus features an Olympic-sized swimming pool, extensive libraries, and values-centered educators. Please specify your child's age or grade level inside our online Enquiry Form to receive custom syllabus guides and eligibility criteria."
      ];
      const randomIndex = Math.floor(Math.random() * fallbackReplies.length);
      return res.json({ text: fallbackReplies[randomIndex] });
    }

    // Prepare contents with system instructions
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        { role: "user", parts: [{ text: `${SCHOOL_CONTEXT}\n\nClient Chat History: ${JSON.stringify(history || [])}\n\nParent asks: ${message}` }] }
      ]
    });

    res.json({ text: response.text });
  } catch (err: any) {
    console.error("Gemini API Error in backend:", err);
    res.status(500).json({ error: "Counselor is briefly offline. Please fill in our Admissions Enquiry form to connect with our admissions officer." });
  }
});

// Post API to save Enquiry leads (simulated database with server console logging)
app.post("/api/admissions/enquiry", async (req, res) => {
  const lead = req.body;
  console.log("=== NEW ADMISSIONS ENQUIRY RECEIVED ===");
  console.log(JSON.stringify(lead, null, 2));
  console.log("=======================================");
  res.status(200).json({ success: true, message: "Lead captured successfully on admissions sever" });
});

// Vite middleware for development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Akshara Vidyaashram Admissions server running on port ${PORT}`);
  });
}

startServer();
