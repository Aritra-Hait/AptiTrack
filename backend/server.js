import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/coldStart", async (req, res) => {
    res.status(200).json({
        status: "ok",
    });
});

app.post("/api/questions", async (req, res) => {
    const { topic, count = 10 } = req.body;


    if (!topic.trim()) {
        return res.status(400).json({ error: "Invalid input" });
    }

    const payload = {
        "contents": [{
            "parts": [{
                // "text": "Act as a Senior Aptitude Test Setter; Generate a dataset of " + count + " high-quality aptitude questions on the topic " + topic + "; Difficulty Distribution: Easy (30%): Direct formula application or basic conceptual questions, Medium (40%): Requires 2–3 steps of logic or combining two concepts, Hard (30%): Complex scenarios involving multiple variables or trickier logic; Content Rules: Uniqueness: No two questions should use the same logic or numerical values, Plausible Distractors: Wrong options must be realistic and reflect common calculation errors, Clean Numbers: Use integers or simple fractions to avoid extensive decimals, No Markdown: Do not wrap the output in json code blocks and return raw text only; Output Format: Return a strictly valid JSON array of objects where each object follows this schema:" + ` [{ "question": "String(clear and concise)", "options": ["Option A","Option B","Option C","Option D"], "answer": "String(must exactly match one option)", "explanation": "String(step - by - step reasoning)" }]`
                "text": `Act as a Senior Aptitude Test Setter; Generate ${count} high-quality aptitude questions on the topic ${topic}; Difficulty split: Easy 30% (direct formulas/basic concepts), Medium 40% (2–3 logical steps or combined concepts), Hard 30% (complex multi-variable or tricky logic); Rules: All questions must be unique in logic and numbers, distractors must be realistic common errors, use clean integers or simple fractions only, no markdown or json code blocks, return raw text only; Output: Return a strictly valid JSON array using this schema: [{ "question": "Clear concise string", "options": ["Option A","Option B","Option C","Option D"], "answer": "Must exactly match one option", "explanation": "Step-by-step reasoning" }]`
            }]
        }]
    };
    try {
        let response = await fetch(process.env.GEMINI_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": process.env.GEMINI_API_KEY
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error("Gemini API error");
        }

        const data = await response.json();

        const text = data.candidates[0].content.parts[0].text;
        const parsed = JSON.parse(text);

        res.json(parsed);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to generate questions" });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});